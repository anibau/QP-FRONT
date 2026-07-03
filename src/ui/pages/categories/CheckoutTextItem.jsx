import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const CheckoutTextItem = (props) => {
    const {
        firstText = "",
        secondText = "",
        secondTextColor = "#101010",
        marginBottom = "5%"
    } = props;
    return (
        <View
            style={{...styles.descriptionRow, marginBottom}}
        >
            <Text style={styles.descriptionRowText1}>
                {firstText}
            </Text>
            <Text style={{...styles.descriptionRowText2, color: secondTextColor}}>
                {secondText}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    descriptionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "5%"
    },
    descriptionRowText1: {
        color: '#535353',
        fontFamily: "product-sans-regular",
        fontSize: 15,
    },
    descriptionRowText2: {
        color: '#101010',
        fontFamily: "product-sans-bold",
        fontSize: 15,
    },
});

