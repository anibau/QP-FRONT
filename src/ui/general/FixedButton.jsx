import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

export const FixedButton = (props) => {
    const {
        title = "",
        onPress,
        active = true,
        activeBgColor = "#F3F3F3",
        inactiveBgColor = "#F3F3F3",
        activeTextColor = "#FF3128",
        inactiveTextColor = "#FF3128"
    } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
            }}
        >
            <View
                style={{
                    height: 80,
                    backgroundColor: active ? activeBgColor : inactiveBgColor,
                    justifyContent: "center",
                    alignContent: "center"
                }}
            >
                <Text
                    style={{
                        color: active ? activeTextColor : inactiveTextColor,
                        fontFamily: "product-sans-bold",
                        fontSize: 15,
                        textAlign: "center"
                    }}
                >{title}</Text>
            </View>

        </TouchableOpacity>
    )
}
