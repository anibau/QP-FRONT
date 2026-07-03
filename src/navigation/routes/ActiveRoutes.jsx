import 'react-native-gesture-handler';
import React, { useRef, useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { NotAuthenticatedRoutes } from './NotAuthenticatedRoutes';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { GuardRoutes } from './GuardRoutes';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import {toastConfig} from '../../utils/toastConfig';
import Toast from 'react-native-toast-message';
import { RequestSheet } from '../../ui/general/RequestSheet';
import { CustomImage } from '../../ui/general/CustomImage';
import { GoToSettingsSheet } from '../../ui/pages/categories/GoToSettingsSheet';
import { store } from '../../redux/store/store';
import { 
    ActionAskForGPSPermission, 
    ActionChangeGPSSheetVisibility, 
    ActionChangeSettingsSheetVisibility,
    ActionOpenSettings,
    ActionUserSaveData,
    ActionInitApp
} from '../../redux/actions';
import { Info } from '../../ui/modal/Info';
import { RFValue } from 'react-native-responsive-fontsize';
import { AUTH_ASYNCSTORAGE_KEY} from '../../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signInUser, signInSocialUser} from '../../controllers/auth_controller';
import { getBuildNumberSync } from '../../services/device/buildNumber';
import { InvalidSessionSheet } from '../../ui/general/InvalidSessionSheet';

const getNativeBuildNumber = () => getBuildNumberSync();

export const ActiveRoutes = () => {

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const [invalidSession, setInvalidSession] = useState({
        invalid: false,
        message: ""
    });

    const [requestSheetVisible, setRequestSheetVisible] = useState(false);
    const [settingVisible, setSettingsVisible] = useState(false);

    const settingsRef = useRef(null);
    const changeTokenStatusRef = useRef(null);
    const confirmCardRef = useRef(null);

    const displayGpsOld = useRef(Boolean(false));
    const displaySettingsOld = useRef(Boolean(false));
    const displayTokenStatusOld = useRef(Boolean(false));
    const displayConfirmCardOld = useRef(Boolean(false));
    
    const state = useSelector(state => {
        return state.application;
    });
    const auth = useSelector(state => {
        return state.auth;
    });
    
    const configureGoogleSignIn = () => {
        if (Platform.OS === 'web') {
            return;
        }
        const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
        if (!webClientId) {
            console.warn('EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is not configured');
            return;
        }
        const { GoogleSignin } = require('@react-native-google-signin/google-signin');
        GoogleSignin.configure({
          webClientId,
          offlineAccess: false,
          forceCodeForRefreshToken: true,
        });
    }

    useEffect(() => {
        if (displayGpsOld.current !== state.gpsSheetVisible) {
            if(state.gpsSheetVisible){
                setRequestSheetVisible(true);
            }
        }
        displayGpsOld.current = Boolean(state.gpsSheetVisible);
    }, [state.gpsSheetVisible]);

    useEffect(() => {
        if (displaySettingsOld.current !== state.settingsSheetVisible) {
            if(state.settingsSheetVisible){
                setSettingsVisible(true);
            }
        }
        displaySettingsOld.current = Boolean(state.settingsSheetVisible);
    }, [state.settingsSheetVisible]);

    useEffect(() => {
        if (displayTokenStatusOld.current !== state.changeTokenVisible) {
            if(state.changeTokenVisible){
                if(changeTokenStatusRef.current) changeTokenStatusRef.current.snapTo(0);
            }else{
                if(changeTokenStatusRef.current) changeTokenStatusRef.current.snapTo(1);
            }
        }
        displayTokenStatusOld.current = Boolean(state.changeTokenVisible);
    }, [state.changeTokenVisible]);

    useEffect(() => {
        if (displayTokenStatusOld.current !== state.changeTokenVisible) {
            if(state.changeTokenVisible){
                if(changeTokenStatusRef.current) changeTokenStatusRef.current.snapTo(0);
            }else{
                if(changeTokenStatusRef.current) changeTokenStatusRef.current.snapTo(1);
            }
        }
        displayTokenStatusOld.current = Boolean(state.changeTokenVisible);
    }, [state.changeTokenVisible]);

    useEffect(() => {
        if (displayConfirmCardOld.current !== state.changeConfirmCardVisible) {
            if(state.changeConfirmCardVisible){
                if(confirmCardRef.current) confirmCardRef.current.snapTo(0);
            }else{
                if(confirmCardRef.current) confirmCardRef.current.snapTo(1);
            }
        }
        displayConfirmCardOld.current = Boolean(state.changeConfirmCardVisible);
    }, [state.changeConfirmCardVisible]);

    const _loadSession = async () => {
        if (Platform.OS !== 'web') {
            const Jailbreak = require('react-native-jailbreak').default;
            const result = await Jailbreak.check();
            if(result){
                setInvalidSession({
                    invalid: true,
                    message: "No disponible en dispositivos root"
                });
            }
        }
        //TODO: Regresar en producción
        /* if(DeviceInfo.isEmulator()){
            setInvalidSession({
                invalid: true,
                message: "No disponible en simuladores"
            });
        } */
        let userRaw = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
        if (!_.isNil(userRaw)) {
            const userData = JSON.parse(userRaw);
          if(!_.isNil(userData.user)){
            let response;
            const buildNumber = getNativeBuildNumber();
            if(!_.isNil(userData.user.email) && !_.isNil(userData.user.password)){
                response = await signInUser(userData.user.email, userData.user.password, Platform.OS, buildNumber);
            }else if (!_.isNil(userData.user.provider_id)){
                response = await signInSocialUser(userData.user.email, userData.user.provider_id, Platform.OS, buildNumber);
            }else{
                response = {
                    hasError: true,
                    message: "",
                }
            }
            if(response.hasError){
                store.dispatch(ActionInitApp());
            }else{
                await AsyncStorage.setItem(
                    AUTH_ASYNCSTORAGE_KEY,
                    JSON.stringify({
                        user: {
                            ...response.data.user,
                            password: userData.user.password
                        },
                        access_token: response.data.access_token,
                        support_contact: response.data.support_contact,
                    })
                );
                store.dispatch(ActionUserSaveData(userData));
            }
          }else{
            store.dispatch(ActionInitApp());
          }
        }else{
            store.dispatch(ActionInitApp());
        }
    }

    useEffect(()=>{
        _loadSession();
    }, []);

    return (
        <>
            <NavigationIndependentTree>
            <NavigationContainer
                onReady={configureGoogleSignIn}
            >
                    { (auth.ready ? 
                            (auth.isLogged ?
                                (
                                    auth.user.role_id === 4 ? 
                                    <GuardRoutes /> : 
                                    <AuthenticatedRoutes />
                                ) :
                                <NotAuthenticatedRoutes />
                            ) : 
                            <View/>
                        )
                    }
                <Toast config={toastConfig}/>
            </NavigationContainer>
            </NavigationIndependentTree>
            <RequestSheet
                visible = {requestSheetVisible}
                title = "GPS"
                subtitle = "Para usar la aplicación necesita activar su GPS"
                buttonText = "Activar GPS"
                image = {
                    <CustomImage
                        source={require("../../assets/images/gps.png")}
                        width={RFValue(100)}
                        resizeMode="contain"
                        height={RFValue(100)}
                    />
                }
                onClose={()=>{
                    store.dispatch(ActionChangeGPSSheetVisibility({
                        gpsSheetVisible: false
                    }));
                    setRequestSheetVisible(false);
                    store.dispatch(ActionAskForGPSPermission({
                        askGPSPermission: true
                    }));
                }}
                onActivate={()=>{
                    store.dispatch(ActionChangeGPSSheetVisibility({
                        gpsSheetVisible: false
                    }));
                    setRequestSheetVisible(false);
                    store.dispatch(ActionAskForGPSPermission({
                        askGPSPermission: true
                    }));
                }}
            />
            <GoToSettingsSheet
                visible = {settingVisible}
                title = "GPS"
                subtitle = "Para usar la aplicación necesita activar el GPS manualmente"
                onClose={()=>{
                    store.dispatch(ActionChangeSettingsSheetVisibility({
                        settingsSheetVisible: false
                    }));
                    setSettingsVisible(false);
                    store.dispatch(ActionOpenSettings({
                        openSettings: true
                    }));
                }}
                onOpenSettings={()=>{
                    store.dispatch(ActionChangeSettingsSheetVisibility({
                        settingsSheetVisible: false
                    }));
                    setSettingsVisible(false);
                    store.dispatch(ActionOpenSettings({
                        openSettings: true
                    }));
                }}
            />
            <InvalidSessionSheet
                visible = {invalidSession.invalid}
                message = {invalidSession.message}
            />
            {/* <ConfirmFavCardSheet
                sheetRef={confirmCardRef}
                title = "Tarjeta favorita"
                subtitle = "¿Seguro que deseas seleccionar esta tarjeta para tus compras?"
                buttonText = "Cerrar"
                onClose = {() => {
                    store.dispatch(ActionChangeConfirmCardVisibility({
                        changeConfirmCardVisible: false
                    }));
                }}
                onActivate = {() => {
                    store.dispatch(ActionChangeConfirmCardVisibility({
                        changeConfirmCardVisible: false
                    }));
                }}
                image = {
                    <CustomImage
                        source={require("../../assets/images/favorite.png")}
                        width={RFValue(100)}
                        resizeMode="contain"
                        height={RFValue(100)}
                    />
                }
            /> */}
            <Info
                loading={loadingState.loading}
                info={loadingState.info}
                display={loadingState.display}
            />
        </>
    );
}