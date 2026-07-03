import React from 'react'
import {Image} from 'react-native';

export const CustomImage = (props) => {
    const {
        source,
        width = 100,
        height = 100,
        marginBottom = 0,
        marginTop = 0,
        marginLeft = 0,
        marginRight = 0
    } = props;
    return (
        <Image 
            source={source} 
            style={{
                width,
                height,
                resizeMode: 'stretch',
                marginTop, 
                marginBottom,
                marginRight, 
                marginLeft,
            }}
        /> 
        
    )
}
