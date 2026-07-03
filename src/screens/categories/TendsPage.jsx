import React, {useEffect, useState} from 'react'
import {Text, View, Dimensions} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import { TendOption } from '../../ui/pages/categories/TendOption';
import {NearTendsSheet} from '../../ui/pages/categories/NearTendsSheet';
import { authenticatedCategoriesStack } from '../../config/navigation';
import { Info } from '../../ui/modal/Info';
import {getLocalesByShop, getTendsList} from '../../controllers/shop_controller';
import Toast from 'react-native-toast-message';
import { store } from '../../redux/store/store';
import { ActionCleanProducts } from '../../redux/actions';

const screenWidth = Dimensions.get('window').width;

export const TendsPage = ({navigation}) => {

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });
    const [shops, setShops] = useState([]);
    const [shopSelected, setShopSelected] = useState({});
    const [locales, setLocales] = useState([]);
    const [nearTendsVisible, setNearTendsVisible] = useState(false);

    const getTends = async() => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await getTendsList();
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(!resp.hasError){
            setShops(resp.data.data);
        }
    }
    useEffect(() => {
        getTends();
    }, []);

    return (
        <>
            <Container>
                <SafeAreaView>
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'flex-start',
                        }}
                        enableOnAndroid
                    >
                        <AppBar
                            title="Establecimientos autorizados"
                            onPress={()=>{
                                navigation.pop();
                            }}
                        />
                        <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%", marginTop: "5%"}}>
                            Tiendas retails
                        </Text>
                        <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "5%"}}>
                            Te mostramos la lista de tiendas con las que trabaja QuickPay
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                width: "100%",
                            }}
                        >
                            {
                                shops.map((element, index)=> <TendOption
                                    key={element.id}
                                    url={element.company_url}
                                    marginRight={index % 2 == 0 ? screenWidth * 0.05 : 0}
                                    marginLeft={index % 2 == 0 ? screenWidth * 0.05 : 0}
                                    marginBottom={index % 2 == 0 ? "5%" : 0}
                                    onPress={ async () => {
                                        setLoadingState({
                                            ...loadingState,
                                            loading: true,
                                            display: true
                                        });
                                        const generalState = store.getState().general;
                                        const response = await getLocalesByShop(element.id, generalState.latitude, generalState.longitude);
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
                                        if(!Boolean(response.data.length)){
                                            Toast.show({
                                                type: 'error',
                                                text1: 'Lo sentimos',
                                                text2: "No se encontraron locales",
                                                position: "bottom"
                                            });
                                            return;
                                        }
                                        setShopSelected(element);
                                        setLocales(response.data);
                                        setNearTendsVisible(true);
                                    }}
                                />)
                            }
                        </View>
                        <Info
                            loading={loadingState.loading}
                            info={loadingState.info}
                            display={loadingState.display}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <NearTendsSheet
                shop = {shopSelected}
                locales={locales}
                visible = {nearTendsVisible}
                onClose={()=>{
                    setNearTendsVisible(false);
                }}
                onSelect={(element)=>{
                    const shopping = store.getState().shopping;
                    if(element.id.toString() !== shopping.localeId){
                        store.dispatch(ActionCleanProducts());
                    }
                    setNearTendsVisible(false);
                    setTimeout(()=>{
                        navigation.push(authenticatedCategoriesStack.tendsBuy, {
                            shop: shopSelected,
                            locale: element
                        });
                    }, 500);
                }}
            />                
        </>
    )
}
