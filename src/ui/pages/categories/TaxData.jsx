import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const TaxData = (props) => {
    const {
        total = 0,
        secondTextColor = "#101010",
    } = props;
    return (
        <View
            style = {{
                width: "100%"
            }}
        >
            <View
                style={{...styles.descriptionRow, marginBottom: "3%"}}
            >
                <Text style = {styles.titleText}>Datos tributarios</Text>
            </View>
            <View
                style={styles.descriptionRow}
            >
                <Text style={styles.titleText}>
                    {"Subtotal"}
                </Text>
                <Text style={{...styles.descriptionRowText2, color: secondTextColor}}>
                {`S/${((total * 0.82)).toFixed(2)}`}
                </Text>
            </View>
            <View
                style={styles.descriptionRow}
            >
                <Text style={styles.titleText}>
                    {"IGV"}
                </Text>
                <Text style={{...styles.descriptionRowText2, color: secondTextColor}}>
                {`S/${((total * 0.18)).toFixed(2)}`}
                </Text>
            </View>
            <View
                style={styles.descriptionRow}
            >
                <Text style={{...styles.titleText, fontWeight: "bold"}}>
                    {"Total a pagar"}
                </Text>
                <Text style={{...styles.descriptionRowText2, color: secondTextColor}}>
                    {`S/${((total)).toFixed(2)}`}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    titleText: {
        color: '#535353',
        fontFamily: "product-sans-regular",
        fontSize: 15,
        fontStyle: "italic"
    },
    descriptionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "0.5%"
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

