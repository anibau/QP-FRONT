import React from 'react'
import {Image, View} from 'react-native';

export const NetworkImage = (props) => {
    const {
        url = "",
        width = 100,
        height = 100,
        resizeMode = 'stretch',
        marginBottom = 0,
        marginTop = 0,
        marginLeft = 0,
        marginRight = 0,
        borderRadius = 0
    } = props;
    return (
        Boolean(url.length) ?
        <Image 
            source={{uri: url}}
            style={{
                width,
                height,
                resizeMode: resizeMode,
                marginTop, 
                marginBottom,
                marginRight, 
                marginLeft,
                borderRadius,
            }}
        /> :  
        <View
            style = {{
                width,
                height
            }}
        />
        
    )
}
