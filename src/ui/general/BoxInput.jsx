import React from 'react'
import {View, TextInput, Text, Dimensions} from 'react-native';
import {texts, colors} from '../../utils/styles';

const screenHeight = Dimensions.get('window').height;

export const BoxInput = (props) => {
  const {
      onChange, 
      value,
      errorMessage = "",
      title = "Déjanos tus comentarios",
      onFocus = () => {},
      marginBottom = "5%"
    } = props; 
  return (
    <View
        style = {{
            width: "100%"
        }}
    >
        <View
            style={{
                width: "90%",
                marginHorizontal: "5%",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Boolean(errorMessage.length) ? "red" : colors.placeholder,
                marginBottom: Boolean(errorMessage.length) ? '1%' : marginBottom,
            }}
        >
            <TextInput
                style ={{
                    width: "95%",
                    marginHorizontal: "2%",
                    height: screenHeight * 0.3,
                    padding: 10,
                    paddingTop: "9%",
                    paddingLeft: "1%"
                }}
                numberOfLines = {10}
                multiline
                value = {value}
                placeholder = "Escribir ..."
                placeholderTextColor = {colors.greyStrong}
                textAlignVertical = "top"
                onChangeText ={onChange}
                onFocus = {onFocus}
                blurOnSubmit={true}
                keyboardType="default"
                returnKeyType="done"
            />
            <View
                style={{
                    position: "absolute",
                    top: "4%",
                    left: "3%"
                }}
            >
                <Text
                    style={texts.subtitle}
                >
                    {title}
                </Text>
            </View>
        </View>
        {Boolean(errorMessage.length) && 
        <View
            style={{
                marginLeft: "8.5%",
                marginRight: "8.5%",
                marginBottom: "3%"
            }}
        >
            <Text
                style={{
                    color: "red"
                }}
            >
                {errorMessage}
            </Text>  
        </View>}
    </View>
  )
}
