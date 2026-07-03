import React from 'react'
import {View, Text, Dimensions, TouchableOpacity, Platform} from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgXml } from 'react-native-svg';
import {alertIcon, bagIcon, emailIcon, locationIcon} from '../../utils/icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const MainAppBar = (props) =>{
    const {
        title = '', 
        marginBottom = 0, 
        goToSuggestions, 
        goToIncidents,
        goToShops,
        isGuard = false
    } = props;

    return <View
        style={{
            width: screenWidth,
            paddingVertical: Platform.OS === 'ios' ? screenHeight * 0.03 : screenHeight * 0.03,
            marginTop: Platform.OS === 'ios' ? screenHeight * 0.01 : 0,
            borderColor: "#4D4D4D",
            borderBottomWidth: 0.5,
            marginBottom: marginBottom
        }}
    >
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: screenWidth * 0.05
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginLeft: "5%"
                }}
            >
                {!isGuard && 
                    <View
                        style= {{
                            marginRight: "3%",
                        }}
                    >
                        <SvgXml 
                            xml = {locationIcon} 
                            width = {RFValue(20)}
                            height = {RFValue(20)}
                        />
                    </View>
                }
                <Text
                    style={{
                        color: "#4D4D4D",
                        fontFamily:"product-sans-bold",
                        fontSize: 15,
                        fontWeight: '700',
                    }}
                >
                    {title}
                </Text> 
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}
            >
                {!isGuard && <TouchableOpacity
                    onPress={goToShops}
                >
                    <SvgXml 
                        xml = {bagIcon} 
                        width = {RFValue(20)}
                        height = {RFValue(20)}
                    />
                </TouchableOpacity>}
                <TouchableOpacity
                    onPress = {goToIncidents}
                >
                    <View
                        style={{
                            marginLeft: screenWidth * 0.05
                        }}
                    >
                        <SvgXml 
                            xml = {alertIcon} 
                            width = {RFValue(25)}
                            height = {RFValue(25)}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = {goToSuggestions}
                >
                    <View
                        style={{
                            marginLeft: screenWidth * 0.05
                        }}
                    >
                        <SvgXml 
                            xml = {emailIcon} 
                            width = {RFValue(22)}
                            height = {RFValue(22)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
 }