import React from 'react'
import {View, Dimensions, TouchableOpacity} from 'react-native';
import {CustomImage} from './CustomImage';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const SocialButton = (props) => {
    const {
        onPress, 
        source, 
        imgHeight = 10, 
        imgWidth = 10,
        text
    } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View
                style={{
                    width: screenWidth * 0.9,
                    height: screenHeight * 0.1,
                    borderRadius: 10,
                    borderWidth: 1.0,
                    borderColor: "#E2E2E2",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "3%",
                    flexDirection: "row"
                }}
            >
                <CustomImage
                    source={source}
                    width={imgWidth}
                    resizeMode="contain"
                    height={imgHeight}
                />
                {text}
            </View>
        </TouchableOpacity>
        
    );
}