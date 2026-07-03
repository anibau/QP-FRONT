import React from 'react';
import { View, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { texts, colors } from '../../utils/styles';
import { SvgXml } from 'react-native-svg';
import { uploadIcon } from '../../utils/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

export function FileSelector({ onGetResult, result }) {
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
      <TouchableOpacity
        onPress={async () => {
          const resultTemp = await launchImageLibrary({
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
          });
          if (!resultTemp.didCancel && resultTemp.assets?.[0]) {
            const asset = resultTemp.assets[0];
            const type = asset.type?.split('/')[1] ?? 'jpg';
            const fileName = asset.fileName ?? 'archivo';
            const name =
              fileName.length < 15
                ? `${fileName}.${type}`
                : `${fileName.substring(0, 15)}...${type}`;
            onGetResult({
              name,
              fullName: fileName,
              uri: asset.uri,
              mimeType: type,
              data: asset.base64,
            });
          }
        }}
      >
        <SvgXml xml={uploadIcon} width={RFValue(20)} height={RFValue(20)} />
      </TouchableOpacity>
    </View>
  );
}
