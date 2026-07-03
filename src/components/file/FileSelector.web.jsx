import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { texts, colors } from '../../utils/styles';
import { SvgXml } from 'react-native-svg';
import { uploadIcon } from '../../utils/icons';
import { RFValue } from 'react-native-responsive-fontsize';

export function FileSelector({ onGetResult, result }) {
  const inputRef = useRef(null);

  const openFilePicker = () => {
    if (typeof document === 'undefined') return;

    if (!inputRef.current) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.addEventListener('change', (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          const base64 =
            typeof reader.result === 'string'
              ? reader.result.split(',')[1]
              : undefined;
          const type = file.type?.split('/')[1] ?? 'jpg';
          const name =
            file.name.length < 15
              ? file.name
              : `${file.name.substring(0, 15)}...${type}`;
          onGetResult({
            name,
            fullName: file.name,
            uri: URL.createObjectURL(file),
            mimeType: type,
            data: base64,
          });
        };
        reader.readAsDataURL(file);
        input.value = '';
      });
      document.body.appendChild(input);
      inputRef.current = input;
    }

    inputRef.current.click();
  };

  return (
    <View
      style={{
        width: '90%',
        marginHorizontal: '5%',
        borderWidth: 1,
        borderColor: colors.placeholder,
        paddingLeft: '3%',
        paddingRight: '5%',
        paddingVertical: '3%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text style={texts.generalHighlighText}>
        {result.uri == undefined ? 'Cargar archivo' : result.name}
      </Text>
      <TouchableOpacity onPress={openFilePicker}>
        <SvgXml xml={uploadIcon} width={RFValue(20)} height={RFValue(20)} />
      </TouchableOpacity>
    </View>
  );
}
