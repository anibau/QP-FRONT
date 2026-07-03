import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BarcodeInput } from './BarcodeInput';
import { texts } from '../../../utils/styles';

export function ScannerManualEntry({ placeholder, onSubmit, hint }) {
  const [value, setValue] = useState('');

  return (
    <View style={{ flex: 1, paddingTop: '10%', paddingHorizontal: '5%' }}>
      <Text style={{ ...texts.subtitleSection, textAlign: 'center', marginBottom: '5%', color: 'white' }}>
        {hint ?? 'Ingresa el código manualmente (cámara no disponible en web)'}
      </Text>
      <BarcodeInput
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        onEndEditing={() => {
          if (value.trim()) {
            onSubmit(value.trim());
          }
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (value.trim()) {
            onSubmit(value.trim());
          }
        }}
        style={{
          marginTop: '5%',
          backgroundColor: '#FF3128',
          paddingVertical: '4%',
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ ...texts.generalHighlighText, color: 'white' }}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}
