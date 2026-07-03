import React, {useState, useEffect} from 'react';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Info } from '../../ui/modal/Info';
import {Text, View,} from 'react-native';
import {MainAppBar} from '../../ui/general/MainAppBar';
import {texts} from '../../utils/styles';
import {authenticatedGeneralStack} from '../../config/navigation';
import { store } from '../../redux/store/store';
import Toast from 'react-native-toast-message';
import {getValidateInvoicesList} from '../../controllers/shop_controller';
import {GuardHistoryItem} from '../../ui/pages/history/GuardHistoryItem';
import {Divider} from '../../ui/general/Divider';

export const HistoryGuardPage = ({navigation}) => {

    const [items, setItems] = useState([]);

    const [navigating, setNavigating] = useState(false);

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });
    const getHistory = async () => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const data = store.getState().auth;
        const resp = await getValidateInvoicesList(data.user.id);
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(!resp.hasError){
            setItems(resp.data);
        }else{
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: resp.message,
                position: "bottom"
            });
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            getHistory();
        });
    }, [navigation]);
    return (
        <>
            <Container>
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                    enableOnAndroid
                >
                    <MainAppBar
                        title = {"Casas & Ideas - Paseo la República"}
                        marginBottom={"5%"}
                        isGuard
                        goToSuggestions={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedGeneralStack.suggestions);
                            }
                        }}
                        goToIncidents={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedGeneralStack.incidentsList);
                            }
                        }}
                    />
                    <Text style={{...texts.titleSection, marginBottom: "5%", paddingHorizontal: "5%"}}>
                        Historial de validaciones
                    </Text>
                    {
                        items.map((element, index) => (
                            <View
                                key={element.id.toString()}
                            >
                                <GuardHistoryItem
                                    item={element}
                                    onPressed={()=>{
                                        /* if(!navigating){
                                            setNavigating(true);
                                            navigation.push(authenticatedHistoryStack.details, {
                                                invoice: element,
                                                shopName: element.Titulo
                                            });
                                        } */
                                    }}
                                />
                                <Divider
                                    key = {`${element.id}_divider`}
                                    marginVertical = {15}
                                />
                            </View>
                        ))
                    }
                    <Info
                        loading={loadingState.loading}
                        info={loadingState.info}
                        display={loadingState.display}
                    />
                </KeyboardAwareScrollView>
            </Container>
        </>
    )              
}
