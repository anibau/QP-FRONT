import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, Dimensions, BackHandler, Share} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {Spacer} from '../../ui/general/Spacer';
import {Divider} from '../../ui/general/Divider';
import {NetworkImage} from '../../ui/general/NetworkImage';
import {texts, colors} from '../../utils/styles';
import {ReceiptListElement} from '../../ui/pages/categories/ReceiptListElement';
import {CheckoutTextItem} from '../../ui/pages/categories/CheckoutTextItem';
import {FixedButton} from '../../ui/general/FixedButton';
import {CustomButton} from '../../ui/general/CustomButton';
import {SuccessBottomSheet} from '../../ui/general/SuccessBottomSheet';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import {circleCheckIcon, shareIcon} from '../../utils/icons';
import {downloadIcon} from '../../utils/icons';
import {validateInvoice} from '../../controllers/shop_controller';
import Toast from 'react-native-toast-message';
import { Info } from '../../ui/modal/Info';
import { store } from '../../redux/store/store';
import { ConfirmBottomSheet } from '../../ui/pages/categories/ConfirmBottomSheet';
import {authenticatedGuardHomeStack} from '../../config/navigation';
import {downloadPdfFile} from '../../utils/utils';
import { baseUrl } from "../../config/constants";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const InvoiceGuardPage = ({navigation, route}) => {

    const {
        invoiceData = {},
    } = route.params;

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const [successVisible, setSuccessVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const getTotalPrice = (products)  => {
        let totalPrice = 0;
        for(let i = 0; i < products.length; i++){
            totalPrice += (products[i].invoice_det_product_price) * products[i].invoice_det_product_amount;
        }
        return totalPrice;
    }

    const totalPrice = useMemo(() => {
        return getTotalPrice(invoiceData.det);
    }, [invoiceData]);

    const handleBackButtonClick = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabGuard'}],
        });
        return true;
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const confirmInvoice =  async () => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const user = store.getState().auth.user;
        const resp = await validateInvoice(invoiceData.id, user.id);
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(resp.hasError){
            Toast.show({
                type: 'error',
                text1: 'Ocurrió un error',
                text2: "Inténtelo más tarde",
                position: "bottom"
            });
        }
        setSuccessVisible(true);
    }

    return (
        <>
            <Container>
                <SafeAreaView>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                        }}
                        enableOnAndroid
                    >
                        <AppBar
                            title="Boleta de compra"
                            onPress={()=>{
                                handleBackButtonClick();
                            }}
                            trailing ={
                                <View
                                    style={{
                                        flexDirection: "row"
                                    }}
                                >
                                    <SvgXml 
                                        xml = {shareIcon} 
                                        width = {RFValue(20)}
                                        height = {RFValue(20)}
                                        onPress={async ()=>{
                                            const result = await Share.share({
                                                message: `${baseUrl}/general/download/invoice/${invoiceData.id}`,
                                            });
                                        }}
                                    />
                                    <Spacer
                                        width = {20}
                                    />
                                    <SvgXml 
                                        xml = {downloadIcon} 
                                        width = {RFValue(20)}
                                        height = {RFValue(20)}
                                        onPress={async ()=>{
                                            downloadPdfFile(invoiceData);
                                        }}
                                    />
                                </View>
                            }
                        />
                        <View
                            style = {{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginBottom: "5%", 
                                paddingHorizontal: "5%", 
                                marginTop: "5%"
                            }}
                        >
                            <Text style={texts.titleSection}>
                                Datos de la boleta
                            </Text>
                        </View>
                        <View
                            style = {{
                                borderWidth: 1,
                                borderColor: colors.greyColor,
                                borderRadius: 10,
                                padding: 10,
                            }}
                        >
                            <NetworkImage
                                url = "https://firebasestorage.googleapis.com/v0/b/quickapp-develop.appspot.com/o/image%2028.png?alt=media&token=0b87254a-408d-425b-bd09-8cbe32e74f4b"
                                width = {screenWidth * 0.4}
                                height = {screenHeight * 0.12}
                                resizeMode = "contain"
                            />
                        </View>
                        <Text style={{...texts.payTextBold, color: colors.almostBlack, marginTop: "5%", marginBottom: "2%"}}>
                            Casas Ideas - Paseo la República
                        </Text>
                        <Divider/>
                        <View
                            style = {{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginBottom: "5%", 
                                paddingHorizontal: "5%", 
                            }}
                        >
                            <Text style={texts.generalHighlighTextBold}>Productos</Text>
                        </View>
                        {invoiceData.det.map((element, index) => (
                            <View
                                key={element.id}
                            >
                                <ReceiptListElement
                                    product = {element}
                                />
                                <Divider
                                />
                            </View>
                        ))}
                        <View
                            style = {{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginBottom: "5%", 
                                paddingHorizontal: "5%", 
                            }}
                        >
                            <Text style={{...texts.generalHighlighTextBold}}>
                                Resumen
                            </Text>
                        </View>
                        <View
                            style = {{
                                width: "100%",
                                paddingHorizontal: "5%",
                                marginBottom: "5%"
                            }}
                        >
                            {invoiceData.det.map((element, index) => (
                                <CheckoutTextItem
                                    key={element.id}
                                    firstText={element.invoice_det_product_name}
                                    secondText={`S/${element.invoice_det_product_price * element.invoice_det_product_amount}`}
                                />
                            ))}
                            <Divider
                                height = {0}
                            />
                            <CheckoutTextItem
                                firstText={"Total"}
                                secondText={`S/${totalPrice}`}
                                secondTextColor={colors.greenColor}
                            />
                        </View>
                        <CustomButton
                            title={"Confirmar boleta"}
                            color={colors.accentColor}
                            marginBottom = "30%"
                            trailing={
                                <View
                                    style={{
                                        marginLeft: 10
                                    }}
                                >
                                    <SvgXml 
                                        xml = {circleCheckIcon} 
                                        width = {RFValue(25)}
                                        height = {RFValue(25)}
                                    />
                                </View>
                            }
                            onPress={async () => {
                                setConfirmVisible(true);
                            }}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <Info
                loading={loadingState.loading}
                info={loadingState.info}
                display={loadingState.display}
            />
            <FixedButton
                onPress={() => {
                    navigation.push(authenticatedGuardHomeStack.report, {
                        invoiceData: invoiceData
                    });
                }}
                title = {"Reportar"}
            />
            <SuccessBottomSheet
                title = "Boleta confirmada"
                buttonText = "Cerrar"
                visible = {successVisible}
                changeVisible = {(value) => {
                    setSuccessVisible(value);//TODO: Verificar que no se pueda confirmar dos veces seguidas
                    navigation.pop();
                    navigation.pop();
                }}
            />
            <ConfirmBottomSheet
                title = "Enviar reporte"
                subtitle = "Esta por confirmar la boleta escaneada ¿Desea confirmar?"
                buttonText = "Confirmar"
                visible = {confirmVisible}
                changeVisible = {(value) => {
                    setConfirmVisible(false);
                }}
                onComplete = {() => {
                    setConfirmVisible(false);
                    setTimeout(() => {
                        confirmInvoice();
                    }, 500);
                }}
            />
        </>
    );
}
