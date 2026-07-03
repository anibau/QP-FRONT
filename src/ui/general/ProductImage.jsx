import React from 'react';
import {View, Image} from 'react-native';

export const ProductImage = (props) => {
    const {
        url = "",
        size,
        borderRadius = 0
    } = props;
    return (
        <View
            style = {{
                elevation: 10.0,
                backgroundColor: "white",
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.35,
                shadowRadius: 5,
                borderRadius
            }}
        >
            {
                Boolean(url.length) && 
                    <Image 
                    source={{uri: url}}
                    style={{
                        width: size,
                        height: size,
                        resizeMode: "contain",
                        borderRadius
                    }}
                />
            }
        </View>
    )
}
