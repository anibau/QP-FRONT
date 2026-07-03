import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {colors} from '../../utils/styles';

export const FixedPayButton = (props) => {
    const {
        title = "",
        amount = 0,
        onPress,
    } = props;
    return (
        <TouchableOpacity
            onPress={amount === 0 ? null : onPress}
            style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 80,
                    paddingHorizontal: "5%",
                    backgroundColor: amount === 0 ? colors.lightGrey : colors.greenColor,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Text
                    style={{
                        color: amount === 0 ? colors.lightBlack : "white",
                        fontFamily: "product-sans-bold",
                        fontSize: 15,
                        textAlign: "center" 
                    }}
                >{title}</Text>
                <Text
                    style={{
                        color: amount === 0 ? colors.lightBlack : "white",
                        fontFamily: "product-sans-bold",
                        fontSize: 20,
                        textAlign: "center"
                    }}
                >{`S/${amount.toFixed(2)}`}</Text>
            </View>
        </TouchableOpacity>
    )
}
