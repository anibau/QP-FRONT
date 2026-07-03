import React, {useEffect, useRef, useState} from 'react';
import {Text, Dimensions, View, AppState, Platform, Linking, TouchableOpacity} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CategoriesOption} from '../../ui/pages/categories/CategoriesOption';
import { authenticatedCategoriesStack, authenticatedGeneralStack, authenticatedPaymentStack, authenticatedHistoryStack } from '../../config/navigation';
import {MainAppBar} from '../../ui/general/MainAppBar';
import {texts} from '../../utils/styles';
import {CustomImage} from '../../ui/general/CustomImage';
import { store } from '../../redux/store/store';
import { 
    ActionChangeGPSSheetVisibility, 
    ActionChangeSettingsSheetVisibility,
    ActionAskForGPSPermission,
    ActionOpenSettings,
    ActionSaveAddress
} from "../../redux/actions";
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import {getAddress} from '../../controllers/location_controller';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { shoppingIcon, parkingIcon, servicesIcon } from '../../utils/icons';

const screenWidth = Dimensions.get('window').width;

export const CategoriesMainPage = ({navigation}) => {
    const appState = useRef(AppState.currentState)
    const state = useSelector(state => {
        return state.application;
    });
    const general = useSelector(state => {
        return state.general;
    });

    const [navigating, setNavigating] = useState(false);

    const listener = useRef();
    const inSettings = useRef(Boolean(false));

    const [modalVisible, setModalVisible] = useState(false);
    const bottomSheetRef = useRef(null);
    
    useEffect(() => {
        if (modalVisible) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [modalVisible]);

    const _handleAppStateChange = (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
            if(appState.current == "background" && nextAppState === "active" && inSettings.current){
                verifyPermissionStatus();
            }
        }
        appState.current = nextAppState;
    };

    const verifyPermissionStatus = async () => {
        let permissionStatus = await Location.getForegroundPermissionsAsync();
        if(!permissionStatus.granted){
            if(permissionStatus.canAskAgain){
                store.dispatch(ActionChangeGPSSheetVisibility({
                    gpsSheetVisible: true
                }));
            }else{
                store.dispatch(ActionChangeSettingsSheetVisibility({
                    settingsSheetVisible: true,
                }));
            }
        }else{
            getCurrentLocation();
        }
    }

    const requestPermissionAsync = async () => {
        try{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted'){
                getCurrentLocation();
            }else {
                let permissionStatus = await Location.getForegroundPermissionsAsync();
                store.dispatch(ActionAskForGPSPermission({
                    askGPSPermission: false
                }));
                if(permissionStatus.canAskAgain){
                    store.dispatch(ActionChangeGPSSheetVisibility({
                        gpsSheetVisible: true
                    }));                    
                }else{
                    store.dispatch(ActionChangeSettingsSheetVisibility({
                        settingsSheetVisible: true,
                    }));
                }
            }
        }catch(e){
        }
    }

    const goToSettings = () => {
        store.dispatch(ActionOpenSettings({
            openSettings: false
        }));
        inSettings.current = Boolean(true);
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
        } else {
            Linking.openSettings();
        }
    }


    const getCurrentLocation = async() => {
        try{
            let location = await Location.getCurrentPositionAsync({});
            const address = await getAddress(location.coords.latitude, location.coords.longitude);
            store.dispatch(ActionSaveAddress({
                address: address,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }));
        }catch(e){
        }
    }

    
    useEffect(() => {
        (async () => {
            if(state.openSettings){
                goToSettings();
            }
        })();
    }, [state.openSettings]);

    useEffect(() => {
        (async () => {
            if(state.askGPSPermission){
                requestPermissionAsync();
            }
        })();
    }, [state.askGPSPermission]);
    
    useEffect(() => {
        (async () => {
            let permissionStatus = await Location.getForegroundPermissionsAsync();
            if(!permissionStatus.granted){
                store.dispatch(ActionChangeGPSSheetVisibility({
                    gpsSheetVisible: true
                }));
            }else{
                getCurrentLocation();
            }
        })();

        listener.current = AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            if(listener.current !== undefined){
                listener.current.remove();
            }
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
        });
    }, [navigation]);

    return (
        <>
            <Container>
                <KeyboardAwareScrollView
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'flex-start',
                    }}
                    enableOnAndroid
                >
                    <MainAppBar
                        title = {general.address}
                        marginBottom={"5%"}
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
                        goToShops={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedHistoryStack.details, {
                                    lastBuy: true,
                                });
                            }
                        }}
                    />
                    <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%"}}>
                        Categorías
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "5%"}}>
                        Seleccione una opción
                    </Text>
                    <CategoriesOption
                        title={"Tiendas retails"}
                        source={shoppingIcon}
                        marginBottom={"3%"}
                        onPress={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedCategoriesStack.tends)
                            }
                        }}
                    />
                    <CategoriesOption
                        title={"Parking (Próximamente)"}
                        source={parkingIcon}
                        marginBottom={"3%"}
                        onPress={()=>{
                            navigation.push(authenticatedCategoriesStack.parking)
                        }}
                        // enabled = {false}
                    />
                    <CategoriesOption
                        title={"Servicios (Próximamente)"}
                        source={servicesIcon}
                        marginBottom={"3%"}
                        onPress={()=>{
                            navigation.push(authenticatedCategoriesStack.services)
                        }}
                        // enabled = {false}
                    />
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            marginTop: "20%"
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>{
                                navigation.navigate({ name: authenticatedPaymentStack.main, merge: true });
                            }}
                        >
                            <CustomImage
                                source={require("../../assets/icons/card.png")}
                                width={screenWidth * 0.1}
                                resizeMode="contain"
                                height={screenWidth * 0.1 * 0.8}
                            />
                        </TouchableOpacity>
                        <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "10%", textAlign: "center", marginTop: "3%"}}>
                            Ingresa un método de pago para iniciar tus compras
                        </Text>
                        <BottomSheetModal 
                            ref={bottomSheetRef}
                            snapPoints={['30%']}
                            onDismiss={() => setModalVisible(false)}
                            enablePanDownToClose
                            backdropComponent={(props) => (
                                <BottomSheetBackdrop
                                    {...props}
                                    onPress={() => setModalVisible(false)}
                                    pressBehavior="close"
                                />
                            )}
                        >
                            <BottomSheetView
                                style = {{
                                    width: "100%",
                                    backgroundColor: "white",
                                    paddingVertical: 20
                                }}
                            >
                                <Text>Holaa</Text>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        </>
    )           
}
