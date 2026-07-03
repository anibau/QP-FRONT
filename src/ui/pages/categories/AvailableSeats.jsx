import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {texts} from '../../../utils/styles';

const screenWidth = Dimensions.get('window').width;
export const AvailableSeats = (props) => {
    const {
        seats = 0
    } = props;
    return (
        <View
            style={{
                width: screenWidth * 0.6,
                height: screenWidth * 0.6,
                marginHorizontal: screenWidth * 0.2,
                borderRadius: 1000,
                borderWidth: 7.0,
                borderColor: "#FF3128",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5%"
            }}
        >
            <Text
                style={texts.bigText}
            >
                {seats}
            </Text>
            <Text
                style={texts.simpleTextObscure}
            >
                Espacios disponibles
            </Text>
        </View>
    )
}
