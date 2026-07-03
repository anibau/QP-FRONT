import React from 'react'
import {View, Dimensions, Text} from 'react-native'

const sh = Dimensions.get('window').height;

export const ErrorView = (props) => {
    const {
        heightPercentage = 30
    } = props;
    return (
        <View
            style = {{
                width: "100%",
                height: sh * heightPercentage / 100,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text>Ocurrió un error</Text>
        </View>
    )
}