import React, {useState, useEffect} from 'react';
import {Text, ScrollView, View, ActivityIndicator} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {MainAppBar} from '../../ui/general/MainAppBar';
import {texts} from '../../utils/styles';
import { authenticatedGeneralStack, authenticatedPaymentStack, authenticatedHistoryStack } from '../../config/navigation';
import {NewPaymentMethod} from '../../ui/pages/payment/NewPaymentMethod';
import {AllowedPaymentMethods} from '../../ui/pages/payment/AllowedPaymentMethods';
import {CurrentPaymentMethod} from '../../ui/pages/payment/CurrentPaymentMethod';
import { Info } from '../../ui/modal/Info';
import { useSelector } from 'react-redux';
import { colors } from '../../utils/styles';
import {useCards} from '../../hooks/useCards';
import { store } from '../../redux/store/store';
import {ErrorBottomSheet} from '../../ui/general/ErrorBottomSheet';
import { ActionSavePaymentSuccess} from "../../redux/actions";

export const PaymentMainPage = ({navigation}) => {

    const [navigating, setNavigating] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);

    const general = useSelector(state => {
        return state.general;
    });
    
    const {
        cardsRegistered,
        cardsLoading,
        cardsError,
        loadingState,
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

    return (
        <>
            <Container>
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                    enableOnAndroid
                >
                    <MainAppBar
                        title = {general.address}
                        marginBottom={"5%"}
                        goToShops={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedHistoryStack.details, {
                                    lastBuy: true
                                });
                            }
                        }}
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
                    <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%"}}>
                        Método de pago
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "5%"}}>
                        Selecciona o ingresa un método de pago
                    </Text>
                    {
                        cardsLoading && <View
                            style = {{
                                width: "100%",
                                height: "10%",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "5%"
                            }}
                        >
                            <ActivityIndicator 
                                size = "large" 
                                color = {colors.accentColor}
                            />
                        </View>
                    }
                    {
                        !cardsLoading && cardsError ? <View
                            style = {{
                                width: "100%",
                                height: "10%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text>Error al cargar tarjetas</Text>
                        </View> : null
                    }
                    {
                        !cardsLoading && !cardsError ? <ScrollView
                        >
                            {cardsRegistered.map((element, index) => {
                                return <CurrentPaymentMethod
                                    key = {element.card_number}
                                    creditCard = {element}
                                    onDelete = {async () => {
                                        deleteUserCard(element.id);
                                    }}
                                    onFav = {() => {
                                        const user = store.getState().auth.user;
                                        setUserFavoritCard({
                                            "id": element.id,
                                            "user_id": user.id
                                        });
                                    }}

                                />
                            })}
                        </ScrollView> : null
                    }
                    <NewPaymentMethod
                        onPress = {() => {
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedPaymentStack.register_form)
                            }
                        }}
                    />
                    <AllowedPaymentMethods/>
                    <Info
                        loading={loadingState.loading}
                        info={loadingState.info}
                        display={loadingState.display}
                    />
                    <ErrorBottomSheet
                        title = "Ocurrió un error"
                        subtitle = "Pruebe con una tarjeta diferente"
                        buttonText = "Aceptar"
                        visible = {errorVisible}
                        changeVisible = {()=>{
                            setErrorVisible(false);
                        }}
                    />
                </KeyboardAwareScrollView>
            </Container>
        </>
    )           
}