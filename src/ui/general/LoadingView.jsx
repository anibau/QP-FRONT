import React from 'react'
import { ActivityIndicator, View, Dimensions} from 'react-native'
import {colors} from '../../utils/styles';

const sh = Dimensions.get('window').height;

export const LoadingView = (props) => {
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
            <ActivityIndicator 
              size="large" 
              color={colors.accentColor}
            />
        </View>
    )
}