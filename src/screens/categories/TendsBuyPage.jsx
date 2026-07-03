import React, {useRef, useState, useMemo, useEffect} from 'react'
import {Text, View, ScrollView, Dimensions, Keyboard} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import { useSelector } from 'react-redux';
import {BarcodeInput} from '../../ui/pages/categories/BarcodeInput';
import {FixedPayButton} from '../../ui/general/FixedPayButton';
import {CustomButton} from '../../ui/general/CustomButton';
import { authenticatedCategoriesStack } from '../../config/navigation';
import { colors } from '../../utils/styles';
import {ProductPreviewSheet} from '../../ui/pages/categories/ProductPreviewSheet';
import {PurchaseListElement} from '../../ui/pages/categories/PurchaseListElement';
import {Divider} from '../../ui/general/Divider';
import {NetworkTrailing} from '../../ui/general/NetworkTrailing';
import Toast from 'react-native-toast-message';
import { Info } from '../../ui/modal/Info';
import {scannProductDetails} from '../../controllers/shop_controller';
import { store } from '../../redux/store/store';
import { ActionSaveProductsSelected } from '../../redux/actions';
import {saveTempPurchase} from '../../controllers/shop_controller';
import {barcodeIcon} from '../../utils/icons';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const TendsBuyPage = ({navigation, route}) => {

    const {
        shop = {},
        locale = {}
    } = route.params;

    const pageFocused = useRef(Boolean(false));
    const [keyboardState, setKeyboardState] = useState(false);
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    const [navigating, setNavigating] = useState(false);

    const {productsScanned} = useSelector(state => {
        return state.shopping;
    });

    const [barcodeText, setBarcodeText] = useState("");
    const [productPreviewVisible, setProductPreviewVisible] = useState(false);
    const [productPreview, setProductPreview] = useState({});
    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });
    
    const scannProduct = async (productCode) => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const response = await scannProductDetails(productCode, locale.id);
        setBarcodeText("");
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(response.hasError){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: response.message,
                position: "bottom"
            });
            return;
        }
        setProductPreview(response.data);
        setProductPreviewVisible(true);
    }

    const saveTemporaryPurchase = async () => {
        const user = store.getState().auth.user;
        const products = {};
        for (let i = 0; i < productsScanned.length; i++){
            products[`${i}`] = {
                "id": productsScanned[i].id,
                "amount": productsScanned[i].itemsSelected
            }
        }
        const body = {
            "id_user": user.id,
            "id_local": locale.id,
            "products":products
        }
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await saveTempPurchase(body);
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(resp.hasError){
            Toast.show({
                type: 'error',
                text1: 'Lo sentimos',
                text2: "No se pudo registrar su preorden",
                position: "bottom"
            });
            return;
        }
        navigation.push(authenticatedCategoriesStack.tendsCheckout, {
            shop: shop,
            locale: locale,
            products: productsScanned,
            preorderId: resp.data.id
        });

    }

    const getTotalPrice = (products)  => {
        let totalPrice = 0;
        for(let i = 0; i < products.length; i++){
            totalPrice += (products[i].product_price) * products[i].itemsSelected;
        }
        return totalPrice;
      }

    const totalPrice = useMemo(() => {
        return getTotalPrice(productsScanned);
    }, [productsScanned]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            pageFocused.current = Boolean(true);

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
                            title={shop.company_name + " - " + locale.branch_direction}
                            onPress={()=>{
                                navigation.pop();
                            }}
                            trailing ={
                                <NetworkTrailing
                                    url={locale.branch_file}
                                    size = {screenWidth * 0.1}
                                    borderRadius = {400}
                                />
                            }
                        />
                        <View
                            style = {{
                                height: screenHeight * 0.1,
                            }}
                        >
                            <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%", marginTop: "5%"}}>
                                Tu compra
                            </Text>
                            {!Boolean(productsScanned.length) && <Text style={{...texts.subtitleSection, marginBottom: '5%', paddingHorizontal: "5%"}}>
                                No tienes productos escaneados
                            </Text>}
                        </View>
                        <ScrollView
                            style={{
                                height: screenHeight * 0.35,
                            }}
                        >
                            {
                                productsScanned.map((element, index) => (
                                    <View
                                        key={element.id}
                                    >
                                        <PurchaseListElement
                                            product={element}
                                            onDelete={()=>{
                                                store.dispatch(ActionSaveProductsSelected({
                                                    localeId: locale.id,
                                                    products: productsScanned.filter(item => item.id !== element.id)
                                                }));
                                            }}
                                        />
                                        <Divider
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                        {
                            productsScanned.length > 2 &&

                            <View
                                style = {{
                                    width: "100%",
                                    marginBottom: screenHeight * 0.02,
                                }}
                            >
                                <MaterialIcons name="arrow-drop-down" color="black" size={RFValue(25)} /> 
                            </View>
                        }
                        {
                            productsScanned.length < 3 &&

                            <View
                                style = {{
                                    width: "100%",
                                    marginBottom: screenHeight * 0.02 + RFValue(25),
                                }}
                            >
                            </View>
                        }
                        <BarcodeInput
                            placeholder={"Escribir código"}
                            value = {barcodeText}
                            onChange={(newValue)=>{
                                setBarcodeText(newValue);
                            }}
                            onEndEditing={() => {
                                if(Boolean(barcodeText.length)){
                                    scannProduct(barcodeText)
                                }
                            }}
                        />
                        <CustomButton
                            title={"Escanear código"}
                            color={colors.accentColor}
                            leading={
                                <View
                                    style={{
                                        marginRight: 10
                                    }}
                                >
                                    <SvgXml 
                                        xml = {barcodeIcon} 
                                        width = {RFValue(22)}
                                        height = {RFValue(22)}
                                    />
                                </View>
                            }
                            onPress={() => {
                                if(!navigating){
                                    setNavigating(true);
                                    navigation.push(authenticatedCategoriesStack.productScann, {
                                        shop: shop,
                                        locale: locale
                                    });
                                }
                            }}
                        />
                        <Info
                            loading={loadingState.loading}
                            info={loadingState.info}
                            display={loadingState.display}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            {!keyboardState && <FixedPayButton
                amount={totalPrice}
                onPress={() => {
                    const user = store.getState().auth.user;
                    if(user.is_token !== 1){
                        Toast.show({
                            type: 'error',
                            text1: 'Lo sentimos',
                            text2: "Active el token en su perfil",
                            position: "bottom"
                        });
                        return;
                    }
                    if(!Boolean(productsScanned.length)){
                        Toast.show({
                            type: 'error',
                            text1: 'Atención',
                            text2: "Aún no tiene productos cargados",
                            position: "bottom"
                        });
                        return;
                    }
                    saveTemporaryPurchase();
                }}
                title = {"Total a pagar"}
            />}
            <ProductPreviewSheet
                product={productPreview}
                visible = {productPreviewVisible}
                onClose={()=>{
                    setProductPreviewVisible(false);
                }}
                onSelect={(newProduct) => {
                    setProductPreviewVisible(false);
                    const index = productsScanned.findIndex((element) => element.id === newProduct.id);
                    let newProductsSelected = [];
                    if(index !== -1){
                        const newItemCount = productsScanned[index].itemsSelected + newProduct.itemsSelected;
                        const newProductItem = {
                            ...productsScanned[index],
                            itemsSelected: newItemCount
                        };
                        productsScanned[index] = newProductItem;
                        newProductsSelected = productsScanned;
                    }else{
                        newProductsSelected = [...productsScanned, newProduct];
                    }
                    store.dispatch(ActionSaveProductsSelected({
                        localeId: locale.id,
                        products: newProductsSelected
                    }));
                }}
            />
        </>
    )
}
