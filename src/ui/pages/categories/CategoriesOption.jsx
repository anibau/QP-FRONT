import React from 'react'
import {View, Text, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgXml } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

export const CategoriesOption = (props) => {
    const {
        title = "", 
        onPress, 
        marginBottom = 0, 
        source,
        enabled = true
    } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                ...styles.container, 
                marginBottom,
                backgroundColor: enabled ? "#FF3128" : "#ff6259",
            }}
        >
            <View style={styles.row}>
                <View style={{width: screenWidth * 0.08}}>
                    <SvgXml 
                        xml = {source} 
                        width = {RFValue(20)}
                        height = {RFValue(20)}
                    />
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
            <MaterialIcons
                name="arrow-forward-ios"
                color="white"
                size={screenWidth * 0.04}
            /> 
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginHorizontal: "5%",
        paddingVertical: "5%",
        backgroundColor: "#FF3128",
        flexDirection: "row",
        borderRadius: 10,
        paddingHorizontal: '5%',
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        color: 'white',
        fontFamily:"product-sans-bold",
        fontSize: RFValue(20),
        fontWeight: '700',
        letterSpacing: 0.3,
        textAlign: "left",
        paddingLeft: 0
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    }
});
