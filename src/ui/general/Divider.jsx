import React from 'react';
import {Dimensions, View} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const Divider = (props) => {
    const {
        width = screenWidth,
        backgroundColor = "#E2E2E2",
        height =  1,
        marginVertical = 15
    } = props;

    return (
        <View
            style={{
                width,
                height,
                marginVertical,
                backgroundColor
            }}
        ></View>
    )
}
