import React, {useState, useMemo} from 'react';
import {View, Text} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {Divider} from '../../ui/general/Divider';
import {texts, colors} from '../../utils/styles';
import {CheckoutTextItem} from '../../ui/pages/categories/CheckoutTextItem';
import {FixedButton} from '../../ui/general/FixedButton';
import {CustomButton} from '../../ui/general/CustomButton';
import {CustomTextInput} from '../../ui/general/CustomTextInput';
import {BoxInput} from '../../ui/general/BoxInput';
import {FileSelector} from '../../ui/general/FileSelector';
import {SuccessBottomSheet} from '../../ui/general/SuccessBottomSheet';
import { ConfirmBottomSheet } from '../../ui/pages/categories/ConfirmBottomSheet';
import {CheckoutListElement} from '../../ui/pages/categories/CheckoutListElement';
import { userIcon, emailBlackIcon } from '../../utils/icons';
import { store } from '../../redux/store/store';
import {reportInvoice} from '../../controllers/shop_controller';
import Toast from 'react-native-toast-message';
import { Info } from '../../ui/modal/Info';

export const ReportGuardPage = ({navigation, route}) => {

    const {
        invoiceData = {},
    } = route.params;

    const [fileSelected, setFileSelected] = useState({
        uri: undefined,
        name: undefined
    });

    const [successVisible, setSuccessVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [reason, setReason] = useState("");
    const [resolution, setResolution] = useState("");

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

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

    const sendReport = async () => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const data = store.getState().auth;
        const resp = await reportInvoice(
            "1",
            data.user.id.toString(), 
            reason, 
            resolution,
            "1",
            invoiceData.id.toString(),
            fileSelected
        );
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(resp.hasError){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: resp.message,
                position: "bottom"
            });
            return;
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
                            title="Reporte de boleta"
                            onPress={()=>{
                                navigation.pop();
                            }}
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
                                Ingresar datos
                            </Text>
                        </View>
                        <CheckoutListElement
                            key={"1"}
                            product={{
                                product_path: "https://s.cornershopapp.com/product-images/2857390.jpg?versionId=tcSUe_TL2ll5cU3dB4G1ClfL9dXFvMsl",
                                product_name: "Casa Ideas - Paseo de la República",
                                product_descripcion: "",
                                itemsSelected: 5
                            }}
                        />
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
                        <Divider/>
                        <View
                            style = {{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginBottom: "3%", 
                                paddingHorizontal: "5%", 
                            }}
                        >
                            <Text style={{...texts.generalHighlighTextBold}}>
                                Motivos del reporte
                            </Text>
                        </View>
                        <BoxInput
                            title = "Indicar motivos"
                            onChange = {(value)=>{
                                setReason(value)
                            }}
                            errorMessage={""}
                            onFocus = {()=>{
                                setReason("");
                            }}
                        />
                        <FileSelector
                            onGetResult = {(tempResult) => {
                                setFileSelected({
                                    uri: tempResult.uri,
                                    name: tempResult.name,
                                    fullName: tempResult.fullName,
                                    mimeType: "image/" + tempResult.mimeType,
                                    data: tempResult.base64
                                });
                            }}
                            result = {fileSelected}
                        />
                        <Divider/>
                        <View
                            style = {{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginBottom: "3%", 
                                paddingHorizontal: "5%", 
                            }}
                        >
                            <Text style={{...texts.generalHighlighTextBold}}>
                                Resolución en tienda
                            </Text>
                        </View>
                        <BoxInput
                            title = "Indicar resolución"
                            onChange = {(value)=>{
                                setResolution(value);
                            }}
                            errorMessage={""}
                            onFocus = {()=>{
                                setResolution("");
                            }}
                            marginBottom = "2%"
                        />
                        <Divider/>
                        <View
                            style = {{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                width: "100%",
                                marginBottom: "3%", 
                                paddingHorizontal: "5%", 
                            }}
                        >
                            <Text style={{...texts.generalHighlighTextBold}}>
                                Datos del comprador
                            </Text>
                        </View>
                        <CustomTextInput
                            value={"Darien Romero"}
                            title = {"Nombres"}
                            errorMessage={""}
                            editable = {false}
                            onFocus={() => {}}
                            icon = {userIcon}
                            onChange={(newValue) => {
                                
                            }}
                        />
                        <CustomTextInput
                            value={"Romero Leiva"}
                            title = {"Apellidos"}
                            errorMessage={""}
                            editable = {false}
                            icon = {userIcon}
                            onFocus={() => {}}
                            onChange={(newValue) => {
                                
                            }}
                        />
                        <CustomTextInput
                            value={"darien.r.leiva@gmail.com"}
                            editable={false}
                            errorMessage={""}
                            title = {"Correo electrónico"}
                            onFocus={() => {}}
                            icon = {emailBlackIcon}
                            onChange={(newValue) => {
                            }}
                        />
                        <CustomTextInput
                            value={""}
                            iconName = "mail-outline"
                            errorMessage={""}
                            title = {"Correo electrónico alternativo"}
                            marginHorizontal = "5%"
                            onFocus={() => {}}
                            icon = {emailBlackIcon}
                            onChange={(newValue) => {
                            }}
                        />
                        <CustomButton
                            title={"Enviar"}
                            color={colors.accentColor}
                            marginBottom = "30%"
                            marginTop = "5%"
                            onPress={sendReport}
                        />
                        <Info
                            loading={loadingState.loading}
                            info={loadingState.info}
                            display={loadingState.display}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <FixedButton
                onPress={() => {
                    navigation.pop();
                }}
                title = {"Cancelar reporte"}
            />
            <SuccessBottomSheet
                title = "Reporte enviado"
                buttonText = "Cerrar"
                visible = {successVisible}
                changeVisible = {(value) => {
                    setSuccessVisible(value);
                    navigation.popToTop();
                }}
            />
            <ConfirmBottomSheet
                title = "Enviar reporte"
                subtitle = "Esta por enviar el reporte de la boleta ¿Desea confirmar?"
                buttonText = "Confirmar"
                visible = {confirmVisible}
                changeVisible = {(value) => {
                    setConfirmVisible(false);
                }}
                onComplete = {() => {
                    setConfirmVisible(false);
                    setTimeout(() => {
                        setSuccessVisible(true);
                    }, 500);
                }}
            />
        </>
    );
}
