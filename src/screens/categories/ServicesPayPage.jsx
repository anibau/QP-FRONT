import React, {useRef, useEffect, useState} from 'react'
import {Text, View, StyleSheet} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import { useSelector } from 'react-redux';
import {FixedPayButton} from '../../ui/general/FixedPayButton';
import {CustomTextInput} from '../../ui/general/CustomTextInput';
import {NetworkImage} from '../../ui/general/NetworkImage';

export const ServicesPayPage = ({navigation, route}) => {

    const {
        title = "",
        url = ""
    } = route.params;

    const state = useSelector(state => {
        return state.application;
    });

    const [receiptNumber, setReceiptNumber] = useState("");

    const renderRow = (firstText, secondText) =>{
        return (<View
            style={styles.descriptionRow}
        >
            <Text style={styles.descriptionRowText1}>
                {firstText}
            </Text>
            <Text style={styles.descriptionRowText2}>
                {secondText}
            </Text>
        </View>);
    }

    return (
        <>
            <Container>
                <SafeAreaView>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            height: "100%",
                        }}
                        enableOnAndroid
                    >
                        <AppBar
                            title={title}
                            onPress={()=>{
                                navigation.pop();
                            }}
                            trailing ={
                                <NetworkImage
                                    url={url}
                                    width={50}
                                    resizeMode="contain"
                                    height={50}
                                    borderRadius={100}
                                />
                            }
                        />
                        <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%", marginTop: "5%"}}>
                            Ingreso de datos
                        </Text>
                        <Text style={{...texts.subtitleSection, marginBottom: '5%', paddingHorizontal: "5%"}}>
                            Datos generales del servicio a pagar
                        </Text>
                        <CustomTextInput
                            keyboardType="number-pad"
                            value={receiptNumber}
                            title = {"Número de recibo"}
                            iconName = "credit-card"
                            marginHorizontal = "5%"
                            onChange={(newValue) => {
                                setReceiptNumber(newValue)
                            }}
                        />
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#E2E2E2",
                                width: "100%",
                                marginBottom: "4%",
                                marginTop: "2%"
                            }}
                        />
                        <View
                            style={{
                                marginHorizontal: "5%",
                                marginBottom: "15%"
                            }}
                        >
                            <Text style={{...texts.generalHighlighTextBold, marginBottom: "7%"}}>Datos del cliente</Text>
                            {renderRow("Nombres", "Erick Arrasco Guevara")}
                            {renderRow("Dirección", "Calle Spencer 221 - Surquillo")}
                            {renderRow("Monto de recibo actual", "S/120.00")}
                            {renderRow("Monto de recibo pendiente", "S/00.00")}
                            {renderRow("Monto de mora", "S/ 00.00")}
                        </View>

                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <FixedPayButton
                onPress={() => {
                }}
                title = {"Total a pagar"}
                amount={20.95}
            />
        </>
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
