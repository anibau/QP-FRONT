import React from 'react';
import {View, TextInput} from 'react-native';
import {CustomImage} from '../../general/CustomImage';
import { RFValue } from 'react-native-responsive-fontsize';

export const BarcodeInput = (props) => {
    const {
        value,
        onChange,
        placeholder = '',
        onEndEditing,
        onFocus
    } = props;
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "90%",
                marginHorizontal: "5%",
                borderRadius: 10,
                borderWidth: 1.0,
                borderColor: "#A8A8A8",
                paddingHorizontal: "5%",
                alignItems: 'center',
                paddingVertical: "3%",
                marginBottom: "3%"
            }}
        >
            <CustomImage
                source={require("../../../assets/images/barcode.png")}
                width={RFValue(35)}
                resizeMode="contain"
                height={RFValue(25)}
            />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#757575"
                returnKeyType="done"
                value={value}
                keyboardType="number-pad"
                onFocus={onFocus}
                style={{textAlign: "left", color: 'black', fontSize: 16, flex: 1, marginLeft: 10}}
                onChangeText={onChange}
                onEndEditing={onEndEditing}
            />
        </View>
    )
}
