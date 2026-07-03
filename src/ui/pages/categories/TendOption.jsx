import React from 'react'
import {View, Dimensions, TouchableOpacity} from 'react-native';
import {NetworkImage} from '../../general/NetworkImage';

const screenWidth = Dimensions.get('window').width;

export const TendOption = (props) => {
    const {
        url, 
        marginRight = 0, 
        marginLeft = 0, 
        marginBottom = 0,
        onPress
    } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View
                style={{
                    width: screenWidth * 0.425,
                    height: screenWidth * 0.425 * 0.6,
                    borderRadius: 10,
                    borderWidth: 1.0,
                    borderColor: "#DBDBDB",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: marginRight,
                    marginLeft: marginLeft,
                    marginBottom: marginBottom
                }}
            >
                <NetworkImage
                    url={url}
                    width={screenWidth * 0.4 * 0.8}
                    resizeMode="contain"
                    height={screenWidth * 0.4 * 0.6 * 0.8}
                />
            </View>
        </TouchableOpacity>
    )
}
