import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {texts} from '../../../utils/styles';

export const CouponInput = (props) => {
    const {
        value,
        onChange,
        placeholder = '',
        onApply
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
                height: 60,
                borderColor: "#A8A8A8",
                alignItems: 'center',
                paddingHorizontal: "5%",
            }}
        >
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#757575"
                returnKeyType="done"
                value={value}
                style={{textAlign: "left", color: 'black', fontSize: 16, flex: 1, width: "80%"}}
                onChangeText={onChange}
            />
            <View style={{marginRight: 20, position: "absolute", right: "0%"}}>
                {!Boolean(value.length) ? <View
                    style={{
                        borderWidth: 2.0,
                        borderColor: "#4D4D4D",
                        borderRadius: 100,
                        width: 30,
                        height: 30,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={{
                            color: "#4D4D4D",
                            fontWeight: "bold",
                            fontSize: 20
                        }}
                    >
                        %
                    </Text>
                </View>: 
                <TouchableOpacity
                    onPress={onApply}
                >
                    <Text
                        style={texts.generalHighlighTextBold}
                    >
                        APLICAR
                    </Text>
                </TouchableOpacity>} 
            </View>
        </View>
    )
}
