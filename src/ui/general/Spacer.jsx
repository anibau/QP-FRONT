import React from 'react';
import {View} from 'react-native';

export const Spacer = (props) => {
    const {
        width = 1,
        heigth = 1
    } = props;
    return (
        <View
            style = {{
                width,
                heigth,
            }}
        />
  )
}
