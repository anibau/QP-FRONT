import React, {useMemo, useState, useEffect, useRef} from 'react'
import Container from '../../ui/container/Container';
import { SafeAreaView, Text, View, Dimensions, Keyboard} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import {CheckoutListElement} from '../../ui/pages/categories/CheckoutListElement';
import {PaymentListElement} from '../../ui/pages/categories/PaymentListElement';
import {Divider} from '../../ui/general/Divider';
import {CouponInput} from '../../ui/pages/categories/CouponInput';
import {CheckoutTextItem} from '../../ui/pages/categories/CheckoutTextItem';
import {FixedPayButton} from '../../ui/general/FixedPayButton';
import { store } from '../../redux/store/store';
import { Info } from '../../ui/modal/Info';
import { InputTokenSheet } from '../../ui/pages/categories/InputTokenSheet';
import {validateCoupon, generateToken, payWithCard, savePermanentPurchase} from '../../controllers/shop_controller';
import Toast from 'react-native-toast-message';
import {NetworkTrailing} from '../../ui/general/NetworkTrailing';
import { authenticatedCategoriesStack, authenticatedHistoryStack} from '../../config/navigation';
import {SuccessBottomSheet} from '../../ui/general/SuccessBottomSheet';
import {ErrorBottomSheet} from '../../ui/general/ErrorBottomSheet';
import {CardsBottomSheet} from '../../ui/general/CardsBottomSheet';
import { ActionSavePaymentSuccess} from "../../redux/actions";
import {useCards} from '../../hooks/useCards';
import {NewPaymentMethod} from '../../ui/pages/payment/NewPaymentMethod';
import { authenticatedPaymentStack } from '../../config/navigation';
import { TaxData } from '../../ui/pages/categories/TaxData';
import { ActionCleanProducts } from '../../redux/actions';
import _ from 'lodash';

const screenWidth = Dimensions.get('window').width;

export const TendsCheckoutPage = ({navigation, route}) => {

    const {
        shop = {},
        locale = {},
        products = [],
        preorderId = 0
    } = route.params;

    const [inputTokenVisible, setInputTokenVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const [invoiceData, setInvoiceData] = useState({});
    const [navigating, setNavigating] = useState(false);
    const [keyboardState, setKeyboardState] = useState(false);
    const [cardSelectorVisible, setCardSelectorVisible] = useState(false);

    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    const [couponText, setCouponText] = useState("");
    const [couponTextToSave, setCouponTextToSave] = useState("");
    const [couponApplied, setCouponApplied] = useState([]);
    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const getTotalPrice = (products)  => {
        let totalPrice = 0;
        for(let i = 0; i < products.length; i++){
            totalPrice += (products[i].product_price) * products[i].itemsSelected;
        }
        return totalPrice;
    }

    const totalPrice = useMemo(() => {
        return getTotalPrice(products);
    }, [products]);

    const discountApplied = useMemo(() => {
        if(_.isNil(couponApplied)) return 0;
        if(!Boolean(couponApplied.length)) return 0;
        let totalDiscount = 0;
        for(let i = 0; i < products.length; i++){
            const coupon = couponApplied[i].message;
            if(coupon.discount_type == 1){
                //DESCUENTO DE MONTO
                let discount = (coupon.discount_amount * products[i].itemsSelected);
                if(discount > ((products[i].product_price) * products[i].itemsSelected)){
                    discount = (products[i].product_price) * products[i].itemsSelected;
                }
                totalDiscount += discount;
            }else if (coupon.discount_type == 2){
                //DESCUENTO DE PORCENTAJE
                let discount = ((products[i].product_price) * products[i].itemsSelected) * coupon.discount_amount / 100;
                if(discount > ((products[i].product_price) * products[i].itemsSelected)){
                    discount = (products[i].product_price) * products[i].itemsSelected;
                }
                totalDiscount += discount;
            }
        }
        return totalDiscount;
    }, [couponApplied, products]);

    const savePurchase = async () => {
        const user = store.getState().auth.user;
        const card = cardsRegistered[0];
        let body = {};
        body = {
            "invoice_branch_office_id": locale.id, // id sucursal
            "invoice_user_id": user.id, //id usuario
            "products_id": preorderId, //id de los productos temporales,
            "invoice_company_id": shop.id,
            "card_id": card.id,
            "coupon": couponTextToSave
        }
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await savePermanentPurchase(body);
        if(resp.hasError){
            setLoadingState({
                ...loadingState,
                loading: false,
                display: false,
            });
            Toast.show({
                type: 'error',
                text1: 'Lo sentimos',
                text2: "No se pudo completar su compra",
                position: "bottom"
            });
            return;
        }
        const bodyPayWithCard = {
            //TODO: Corregir
            invoiceId: resp.data.id
            // invoiceId: -1
        }
        const resp2 = await payWithCard(bodyPayWithCard);
        if(resp2.hasError){
            setLoadingState({
                ...loadingState,
                loading: false,
                display: false,
            });
            store.dispatch(ActionCleanProducts());
            Toast.show({
                type: 'error',
                text1: 'No se pudo completar su compra. ',
                text2: "Aún puede reintentar la compra",
                position: "bottom",
                visibilityTime: 10000,
                onShow: () => {
                    setTimeout(() => {
                        navigation.navigate({ name: authenticatedHistoryStack.main, merge: true })
                    }, 500);
                }
            });
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "MainTab"
                    }
                ]
            });
            return;
        }
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false,
        });
        setInvoiceData(resp.data);
        setSuccessVisible(true);
    }

    const sendToken = async () => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const user = store.getState().auth.user;
        const resp = await generateToken(user.cellphone, user.email);
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(resp.hasError){
            Toast.show({
                type: 'error',
                text1: 'Lo sentimos',
                text2: "No se pudo enviar el token",
                position: "bottom"
            });
            return;
        }
        setInputTokenVisible(true);
    }

    const {
        cardsRegistered,
        cardsLoading,
        cardsError,
        deleteUserCard,
        setUserFavoritCard
    } = useCards({navigation});

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            const paymentState = store.getState().shopping;
            if(paymentState.paymentComplete && paymentState.paymentError){
                store.dispatch(ActionSavePaymentSuccess({
                    success: false,
                    error: false,
                    complete: false
                }));
                setErrorVisible(true);
            }
        });
    }, [navigation]);

    useEffect(() => {
        keyboardDidShowListener.current = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardState(true);
            }
            );
            keyboardDidHideListener.current = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardState(false);
            }
        );
        return () => {
            if(keyboardDidShowListener.current !== undefined){
                keyboardDidShowListener.current.remove();
            }
            if(keyboardDidHideListener.current !== undefined){
                keyboardDidHideListener.current.remove();
            }
        }
    }, []);

    return (
        <>
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
                            title = {"Finalizar compra"}
                            onPress = {()=>{
                                navigation.pop();
                            }}
                            trailing ={
                                <NetworkTrailing
                                    url ={locale.branch_file}
                                    size = {screenWidth * 0.1}
                                    borderRadius = {400}
                                />
                            }
                        />
                        <Text style={{...texts.titleSection, marginBottom: "5%", paddingHorizontal: "5%", marginTop: "5%"}}>
                            Tu compra
                        </Text>
                        {
                            products.map((element, index) => (
                                <CheckoutListElement
                                    key={element.id}
                                    product={element}
                                    isLast = {index === products.length - 1}
                                />
                            ))
                        }
                        <Divider/>
                        {Boolean(cardsRegistered.length) ? <PaymentListElement
                            onChangeCard = {()=>{
                                setCardSelectorVisible(true);
                            }}
                        /> : 
                        <NewPaymentMethod
                            onPress = {() => {
                                if(!navigating){
                                    setNavigating(true);
                                    navigation.push(authenticatedPaymentStack.register_form)
                                }
                            }}
                        />}
                        <Divider/>
                        <Text style={{...texts.generalHighlighTextBold, marginLeft: "5%", marginBottom: "3%"}}>
                            Cupones de descuento
                        </Text>
                        <CouponInput
                            value={couponText}
                            placeholder = "Ingresar cupón"
                            onChange={(newValue)=>{
                                setCouponText(newValue)
                            }}
                            onApply = {async () => {
                                setLoadingState({
                                    ...loadingState,
                                    loading: true,
                                    display: true
                                });
                                const productsIds = products.map((e) => e.id);
                                const resp = await validateCoupon(couponText, shop.id, productsIds);
                                setLoadingState({
                                    ...loadingState,
                                    loading: false,
                                    display: false
                                });
                                setCouponTextToSave(couponText);
                                setCouponText("");
                                if(resp.hasError){
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: resp.message,
                                        position: "bottom"
                                    });
                                    return;
                                }
                                Toast.show({
                                    type: 'success',
                                    text1: 'Correcto',
                                    text2: 'Cupón aplicado',
                                    position: "bottom"
                                });
                                setCouponApplied(resp.data);
                            }}
                        />
                        <Divider
                            marginVertical={20}
                        />
                        <View
                            style={{
                                marginHorizontal: "5%",
                                marginBottom: "15%"
                            }}
                        >
                            <Text style={{...texts.generalHighlighText, marginBottom: "7%"}}>Selección</Text>
                            {
                                products.map((element, index) => {
                                    const totalPrice = (element.product_price) * element.itemsSelected;
                                    return <CheckoutTextItem
                                        key={element.id}
                                        firstText={element.product_name}
                                        secondText={`S/ ${totalPrice.toFixed(2)}`}
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
                        <Info
                            loading={loadingState.loading}
                            info={loadingState.info}
                            display={loadingState.display}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            {!keyboardState && <FixedPayButton
                onPress={()=>{
                    if(!Boolean(cardsRegistered.length)){
                        Toast.show({
                            type: 'error',
                            text1: 'Lo sentimos',
                            text2: "Primero registre una tarjeta",
                            position: "bottom"
                        });
                        return
                    }
                    savePurchase();
                    //TODO: Regresar
                    // sendToken();
                }}
                title = {"Realizar Pago"}
                amount={totalPrice - discountApplied}
            />}
            <InputTokenSheet
                visible = {inputTokenVisible}
                changeVisible={(value)=>{
                    setInputTokenVisible(value);
                }}
                onSelect={(value)=>{
                    setInputTokenVisible(false);
                    savePurchase();
                }}
            />
            <CardsBottomSheet
                visible = {cardSelectorVisible}
                changeVisible={(value)=>{
                    setCardSelectorVisible(value);
                }}
                cardsRegistered = {cardsRegistered}
                cardsLoading = {cardsLoading}
                cardsError = {cardsError}
                deleteUserCard = {deleteUserCard}
                setUserFavoritCard = {(body)=>{
                    setCardSelectorVisible(false);
                    setUserFavoritCard(body);
                }}
            />
            <SuccessBottomSheet
                title = "Pago realizado"
                buttonText = "Ver boleta"
                visible = {successVisible}
                changeVisible = {(value) => {
                    setSuccessVisible(value);
                    const products = store.getState().shopping.productsScanned;
                    if(!navigating){
                        setNavigating(true);
                        navigation.push(authenticatedCategoriesStack.tendsReceipt, {
                            shop: shop,
                            locale: locale,
                            products: products,
                            invoiceData: invoiceData,
                            couponApplied: couponApplied,
                            totalPrice: totalPrice,
                            discountApplied: discountApplied
                        });
                    }
                }}
            />
            <ErrorBottomSheet
                visible = {errorVisible}
                title = "Lo sentimos"
                subtitle = "Ocurrió un error con el pago"
                buttonText = "Aceptar"
                changeVisible = {()=>{
                    store.dispatch(ActionSavePaymentSuccess({
                        success: false,
                        complete: false
                    }))
                    setErrorVisible(false);
                }}
            />
        </>
    );
}
