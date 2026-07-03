import React, {useMemo, useEffect} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, Dimensions, BackHandler} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts, colors} from '../../utils/styles';
import {CheckoutListElement} from '../../ui/pages/categories/CheckoutListElement';
import {Divider} from '../../ui/general/Divider';
import {CheckoutTextItem} from '../../ui/pages/categories/CheckoutTextItem';
import {NetworkImage} from '../../ui/general/NetworkImage';
import { store } from '../../redux/store/store';
import { ActionCleanProducts } from '../../redux/actions';
import { TaxData } from '../../ui/pages/categories/TaxData';

const screenWidth = Dimensions.get('window').width;

export const TendsBuyReceiptPage = ({navigation, route}) => {
    const {
        shop = {},
        local = {},
        invoiceData = {},
        products = [],
        couponApplied,
        discountApplied,
        totalPrice
    } = route.params;


    const handleBackButtonClick = () => {
        store.dispatch(ActionCleanProducts());
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTab'}],
        });
        return true;
    }
    
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    return (
        <Container>
                <SafeAreaView>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{
                            justifyContent: 'flex-start',
                            alignContent: 'center',
                            alignItems: 'flex-start',
                        }}
                        enableOnAndroid
                    >
                        <AppBar
                            title = {"Boleta de compra"}
                            onPress = {()=>{
                                store.dispatch(ActionCleanProducts());
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'MainTab'}],
                                });
                            }}
                            /* trailing ={
                                <View
                                    style={{
                                        flexDirection: "row"
                                    }}
                                >
                                    <MaterialIcons name="share" color="red" size={20} />
                                    <MaterialIcons name="file-download" color="red" size={20} />
                                </View>
                            } */
                        />
                        <Text style={{...texts.titleSection, marginBottom: "5%", paddingHorizontal: "5%", marginTop: "5%"}}>
                            Tu compra
                        </Text>
                        {
                            products.map((element, index) => (
                                <CheckoutListElement
                                    key={element.id}
                                    product={element}
                                />
                            ))
                        }
                        <Divider/>
                        <View
                            style={{
                                marginHorizontal: "5%",
                            }}
                        >
                            <Text style={{...texts.generalHighlighTextBold, marginBottom: "7%"}}>Selección</Text>
                            {
                                products.map((element, index) => {
                                    const totalPriceTemp = (element.product_price) * element.itemsSelected;
                                    return <CheckoutTextItem
                                        key={element.id}
                                        firstText={element.product_name}
                                        secondText={`S/ ${totalPriceTemp.toFixed(2)}`}
                                        marginBottom={index == products.length - 1 ? "0%" : "5%"}
                                    />
                                })
                            }
                            <Divider/>
                            <CheckoutTextItem
                                firstText={"Total productos"}
                                secondText={`S/${((totalPrice)).toFixed(2)}`}
                            />
                            {Boolean(couponApplied.length) && <CheckoutTextItem
                                firstText = {"Descuentos"}
                                secondText = {`- S/${discountApplied.toFixed(2)}`}
                                marginBottom = {0}
                            />}
                            <Divider/>
                            <CheckoutTextItem
                                firstText={"Total a pagar"}
                                secondText={`S/${((totalPrice - discountApplied)).toFixed(2)}`}
                            />
                            <View
                                style = {{
                                    height: 30
                                }}
                            />
                            <TaxData
                                total = {totalPrice - discountApplied}
                            />
                            <View
                                style = {{
                                    height: 50
                                }}
                            />
                        </View>
                        <Divider/>
                        <Text style={{...texts.generalHighlighTextBold, marginBottom: "7%", marginLeft: "5%"}}>Código QR de venta</Text>
                        <Text style={{...texts.titleSection, marginBottom: "7%", textAlign: "center", width: "100%"}}>¡ Gracias por tu compra!</Text>
                        <View
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                flexDirection: "row"
                            }}
                        >
                            <NetworkImage
                                url={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${invoiceData.id}`}
                                width={screenWidth * 0.5}
                                resizeMode="contain"
                                height={screenWidth * 0.5}
                                borderRadius={0}
                            />
                        </View>
                        <Text style={{...texts.subtitleSection, marginBottom: "7%", textAlign: "center", width: "70%", marginTop: "5%", marginHorizontal: "15%"}}>Mostrar este código de venta antes de salir de la tienda</Text>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
        </Container>
    )
}
