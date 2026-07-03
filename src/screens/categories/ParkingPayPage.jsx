import React, {useRef, useEffect, useState} from 'react'
import {Text, View, StyleSheet} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import { useSelector } from 'react-redux';
import {FixedPayButton} from '../../ui/general/FixedPayButton';
import {BarcodeInput} from '../../ui/pages/categories/BarcodeInput';
import {CheckoutTextItem} from '../../ui/pages/categories/CheckoutTextItem';
import {NetworkTrailing} from '../../ui/general/NetworkTrailing';

export const ParkingPayPage = ({navigation, route}) => {

    const {
        title = "",
        url = ""
    } = route.params;

    const state = useSelector(state => {
        return state.application;
    });

    const [barcodeText, setBarcodeText] = useState("");

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
                                <NetworkTrailing
                                    url={url}
                                    width={50}
                                    resizeMode="contain"
                                    height={50}
                                    borderRadius={100}
                                />
                            }
                        />
                        <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%", marginTop: "5%"}}>
                            Pago de parqueo
                        </Text>
                        <Text style={{...texts.subtitleSection, marginBottom: '5%', paddingHorizontal: "5%"}}>
                            Realiza tu pago
                        </Text>
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#E2E2E2",
                                width: "100%",
                                marginBottom: "4%"
                            }}
                        />
                        <View
                            style={{
                                marginHorizontal: "5%",
                                marginBottom: "15%"
                            }}
                        >
                            <Text style={{...texts.generalHighlighText, marginBottom: "7%"}}>Selección</Text>
                            <CheckoutTextItem
                                firstText={"Piso de estacionamiento"}
                                secondText={"A"}
                            />
                            <CheckoutTextItem
                                firstText={"Piso de estacionamiento"}
                                secondText={"A"}
                            />
                            <CheckoutTextItem
                                firstText={"Fracción - hora"}
                                secondText={"S/5.00"}
                            />
                            <CheckoutTextItem
                                firstText={"Nro de estacionamiento"}
                                secondText={"A4"}
                            />
                            <CheckoutTextItem
                                firstText={"Tiempo transcurrido"}
                                secondText={"2 horas"}
                            />
                            <CheckoutTextItem
                                firstText={"Nro de ticket"}
                                secondText={"0823823982972"}
                            />
                        </View>
                        <BarcodeInput
                            placeholder={"Ingresar código de validación de recibo"}
                            value={barcodeText}
                            onChange={(newValue)=>{
                                setBarcodeText(newValue);
                            }}
                            marginBottom="10%"
                        />

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
