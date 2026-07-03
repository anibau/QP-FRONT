import React from 'react'
import {StyleSheet, View, TouchableNativeFeedback, Text} from 'react-native';

export const CustomButton = (props) => {
    const {
        title = '',
        color = '#C22525',
        marginTop = 0,
        marginBottom = 0,
        onPress = () => {},
        disabled = false,
        leading = null,
        trailing = null,
        height = 70
      } = props;
    return (
        <TouchableNativeFeedback
            style={{width: '100%'}}
            onPress = {onPress}
            disabled = {disabled}
        >
            <View style= {{...styles.button, backgroundColor: disabled ? "#A7A7A7" :color, marginTop, marginBottom, flexDirection: "row", justifyContent:  "center", height, elevation: 7}}>
                {leading}
                <Text style= {styles.text}>
                    {title}
                </Text>
                {trailing}
            </View>
        </TouchableNativeFeedback>
    )
}
const styles = StyleSheet.create({
    button: {
        width: '90%',
        height: 70,
        borderRadius: 10,
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 20,
        color: 'white',
        fontFamily: 'product-sans-bold',
        fontWeight: '700'
    }
});