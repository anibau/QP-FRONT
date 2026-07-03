import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {colors, texts} from '../../utils/styles';

export const FixedFilledButton = (props) => {
    const {
        title = "",
        onPress,
        bottom = 0
    } = props;
    return (
        <TouchableOpacity
            style={{
                width: "90%",
                marginHorizontal:  "5%",
                height: 60,
                position: "absolute",
                bottom: bottom,
                backgroundColor: colors.accentColor,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 10
            }}
            onPress={onPress}
        >
            <View
            >
                <Text
                    style={{...texts.generalHighlighTextBold, color: "white"}}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
