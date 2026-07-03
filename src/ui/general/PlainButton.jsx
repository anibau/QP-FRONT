import React from 'react'
import {StyleSheet, View, TouchableNativeFeedback, Text} from 'react-native';

export const PlainButton = (props) => {
    const {
        title = '',
        marginHorizontal = 0,
        marginVertical = 0,
        color = '#4D4D4D',
        onPress = () => {},
      } = props;
    return (
        <TouchableNativeFeedback
            onPress = {onPress}
        >
            <View style= {{...styles.button, marginHorizontal, marginVertical}}>
                <Text 
                    style= {{...styles.text, color}}
                >
                    {title}
                </Text>
            </View>
        </TouchableNativeFeedback>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: '8%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 15,
        fontFamily:"product-sans-bold",
        color: 'black',
        fontWeight: '700',
        textDecorationLine: "underline"
    }
});