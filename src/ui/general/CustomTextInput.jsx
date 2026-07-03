import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {colors} from '../../utils/styles';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';

const ICON_SIZE = RFValue(22);

export const CustomTextInput = (props) => {
    const {
        value,
        placeholder = '',
        keyboardType = 'default',
        errorMessage = '',
        maxLength = 100,
        title = "",
        autoCapitalize = "sentences",
        editable = true,
        placeholderTextColor = 'black',
        onChange = () => {},
        onFocus = () => {},
        showPassword = false,
        isPasswordInput = false,
        onTrailingPressed = () => {},
        onBlur = () => {},
        autoFocus = false,
        iconColor = "#757575",
        trailingEnabled = true,
        icon = "",
        width = "90%",
        marginHorizontal = 0,
        autoCorrect = true,
        autoComplete,
        digitsOnly = false,
      } = props;
    const showTrailingIcon = () => {
        if(!trailingEnabled){
            return null;
        }else{
            if(isPasswordInput){
                if(showPassword){
                    return <TouchableOpacity onPress={onTrailingPressed}>
                        <MaterialIcons
                            name="visibility-off"
                            color={iconColor}
                            size={ICON_SIZE}
                        />
                    </TouchableOpacity>
                }else{
                    return <TouchableOpacity onPress={onTrailingPressed}>
                        <MaterialIcons
                            name="visibility"
                            color={iconColor}
                            size={ICON_SIZE}
                        />
                    </TouchableOpacity>  
                }
            }else{
                return icon.length != 0 ? 
                <TouchableOpacity
                    onPress = {onTrailingPressed}
                >
                    <View
                        style = {{
                            marginRight: "3%"
                        }}
                    >
                        <SvgXml 
                            xml = {icon} 
                            width = {RFValue(20)}
                            height = {RFValue(20)}
                        />
                    </View>
                </TouchableOpacity> : null
            }
        }
    }
    return (
        <View
            style={{ width, alignSelf: 'center', marginHorizontal }}
        >
            <View style={{
                ...styles.box,
                marginBottom: errorMessage != '' ? '1%' : '3%',
                width: '100%',
                borderColor: Boolean(errorMessage.length) ?  "red" : "#C8C8C8",
                justifyContent: "space-between",
                backgroundColor: editable ? "white" : colors.lightGrey
            }}>
                <View
                    style={{
                        height: 60,
                        flex: 1,
                        minWidth: 0,
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#101010",
                            fontFamily: "product-sans-bold",
                            fontSize: 15,
                            fontWeight: '700',
                            marginBottom: "1%",
                            paddingLeft: 10
                        }}
                    >
                        {title}
                    </Text>
                    <TextInput
                        onKeyPress={digitsOnly ? (event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        } : undefined}
                        autoComplete={autoComplete}
                        secureTextEntry={!showPassword && isPasswordInput}
                        placeholder={placeholder}
                        autoCapitalize={autoCapitalize}
                        keyboardType={keyboardType}
                        placeholderTextColor={placeholderTextColor}
                        returnKeyType="done"
                        editable={editable}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        autoCorrect={autoCorrect}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={(value) => onChange(value)}
                        onFocus={onFocus}
                        style={{
                            color: '#0F4482',
                            fontSize: 16,
                            flex: 1,
                            width: '100%',
                            minWidth: 0,
                            paddingLeft: 10
                        }}
                    />
                </View>
                <View
                >
                    {showTrailingIcon()}
                </View>
            </View> 
            {Boolean(errorMessage.length) && 
            <View
                style={{
                    marginLeft: "0%",
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
const styles = StyleSheet.create({
    box:{
        borderRadius: 10,
        borderWidth: 1.0,
        justifyContent: 'center',
        paddingRight: "2%",
        paddingLeft: "1%",
        flexDirection: "row",
        alignItems: "center"
    },
});
