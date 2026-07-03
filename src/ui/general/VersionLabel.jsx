import React from 'react';
import { Text, View } from 'react-native';
import { getVersionSync } from '../../services/device/buildNumber';

export const VersionLabel = () => {
  const versionNumber = getVersionSync();

  return (
    <View
      style={{
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
      }}
    >
      <Text style={{ fontFamily: 'product-sans-bold' }}>
        {`Versión: ${versionNumber}`}
      </Text>
    </View>
  );
};
