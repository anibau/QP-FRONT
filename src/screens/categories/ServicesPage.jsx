import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import { TendOption } from '../../ui/pages/categories/TendOption';
import { authenticatedCategoriesStack } from '../../config/navigation';
import { useSelector } from 'react-redux';
import { Info } from '../../ui/modal/Info';
import {getServicesList} from '../../controllers/shop_controller';

export const ServicesPage = ({navigation}) => {

    const [navigating, setNavigating] = useState(false);

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const [servicesList, setServicesList] = useState([]);

    const getServices = async() => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await getServicesList();
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(!resp.hasError){
            setServicesList(resp.data);
        }
    }

    useEffect(() => {
        getServices();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
        });
    }, [navigation]);

    return (
        <Container>
            <SafeAreaView>
                <KeyboardAwareScrollView
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
                        Servicios
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "5%"}}>
                        Te mostramos la lista de servicios con las que trabaja QuickPay
                    </Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}
                    >
                        {
                            servicesList.map((element, index)=> <TendOption
                                key={element.id}
                                url={element.service_url}
                                marginRight={index % 2 == 0 ? "5%" : 0}
                                marginLeft={index % 2 == 0 ? "5%" : 0}
                                marginBottom={index % 2 == 0 ? "5%" : 0}
                                onPress={()=>{
                                    if(!navigating){
                                        setNavigating(true);
                                        navigation.push(authenticatedCategoriesStack.servicesPay,{
                                            title: element.service_name,
                                            url: element.service_url
                                        })
                                    }
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
    )
}
