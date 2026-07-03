import React, { useState, useRef, useEffect} from 'react'
import { Text, View, Dimensions, SafeAreaView, Platform, Keyboard} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../ui/general/CustomButton';
import { CustomImage } from '../../ui/general/CustomImage';
import { CustomTextInput } from '../../ui/general/CustomTextInput';
import { CheckBanner } from '../../ui/general/CheckBanner';
import { PlainButton } from '../../ui/general/PlainButton';
import { Divider } from '../../ui/general/Divider';
import _ from 'lodash';
import {texts} from '../../utils/styles';
import { initialStack } from '../../config/navigation';
import i18n from '../../config/i18n';
import { validate } from 'validate.js';
import { SignInValidator } from '../../utils/constraints/SignInValidator';
import Toast from 'react-native-toast-message';
import { store } from '../../redux/store/store';
import { ActionUserSaveData } from "../../redux/actions";
import { Info } from '../../ui/modal/Info';
import {FixedButton} from '../../ui/general/FixedButton';
import {LoginSocialSheet} from '../../ui/general/LoginSocialSheet';
import {getNames} from '../../utils/stringFormaters';
import {signInUser, signInSocialUser} from '../../controllers/auth_controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    AUTH_ASYNCSTORAGE_KEY,
    REMEMBER_ACCOUNT
} from '../../config/constants';
import { getBuildNumberSync } from '../../services/device/buildNumber';
import { VersionLabel } from '../../ui/general/VersionLabel';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const formMaxWidth = Platform.OS === 'web' ? 420 : screenWidth;
const logoWidth = Platform.OS === 'web'
    ? Math.min(screenWidth * 0.6, 256)
    : screenWidth * 0.6;

export const SignInPage = ({navigation}) => {
    
    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const [keyboardState, setKeyboardState] = useState(false);
    const [socialSheetVisible, setSocialSheetVisible] = useState(false);

    const keyboardDidShowListener = useRef();
    const keyboardDidHideListener = useRef();

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const [dataError, setDataError] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberAccount, setRememberAccount] = useState(false);
    const [navigating, setNavigating] = useState(false);


    const validateData = () => {
        const validateSignInStep = validate({
            email: data.email.trim(),
            password: data.password.trim(),
        }, SignInValidator);
        if (_.isNil(validateSignInStep)) {
            return true;
        } else {
            let emailError = "", passwordError = "";
            if (!_.isNil(validateSignInStep['email'])) {
                emailError = validateSignInStep['email'][0];
            }
            if (!_.isNil(validateSignInStep['password'])) {
                passwordError = validateSignInStep['password'][0];
            }
            setDataError({
                email: emailError,
                password: passwordError,
            });
            return false;
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
        });
    }, [navigation]);

    const loadRememberAccount = async () => {
        let email = await AsyncStorage.getItem(REMEMBER_ACCOUNT);
        if(_.isNil(email)) return;
        if(!Boolean(email)) return;
        setData({
            ...data,
            email: email
        });
    }

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
        loadRememberAccount();
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
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 100,
                        }}
                        enableOnAndroid
                    >
                        <View
                            style={{
                                width: '100%',
                                maxWidth: formMaxWidth,
                                alignItems: 'center',
                                alignSelf: 'center',
                            }}
                        >
                        <CustomImage
                            source={require('../../assets/images/logo.png')}
                            width={logoWidth}
                            resizeMode="contain"
                            height={(logoWidth * 140) / 256}
                            marginTop={screenHeight * 0.01}
                        />
                        <Text style={{...texts.title, marginBottom: "2%"}}>
                            {i18n.t("pages.sign_in.title")}
                        </Text>
                        <Text style={{...texts.subtitle, marginBottom: Platform.OS === 'ios' ? '7%':'5%'}}>
                        {i18n.t("pages.sign_in.subtitle")}
                        </Text>
                        <CustomTextInput
                            keyboardType="email-address"
                            placeholderTextColor={"#C8C8C8"}
                            autoCapitalize = "none"
                            autoComplete="email"
                            value={data.email}
                            errorMessage={dataError.email}
                            title = {i18n.t("inputs.email_input")}
                            iconName = "email"
                            onChange={(newValue) => {
                                setData({
                                    ...data,
                                    email: newValue
                                })
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                email: ''
                            })}
                        />
                        <CustomTextInput
                            keyboardType="default"
                            placeholderTextColor={"#C8C8C8"}
                            autoCapitalize = "none"
                            autoComplete="password"
                            value={data.password}
                            errorMessage={dataError.password}
                            title = {i18n.t("inputs.password_input")}
                            isPasswordInput
                            showPassword={showPassword}
                            onChange={(newValue) => {
                                setData({
                                    ...data,
                                    password: newValue
                                })
                            }}
                            onTrailingPressed={()=>{
                                setShowPassword(!showPassword);
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                password: ''
                            })}
                        />
                        <CheckBanner
                            errorMessage={""}
                            state={rememberAccount}
                            marginBottom={"3%"}
                            label={i18n.t("pages.sign_in.remember")}
                            onPress={(newValue) => {
                                setRememberAccount(newValue)
                            }}
                        />
                        <CustomButton
                            title={i18n.t("pages.sign_in.enter_button")}
                            color='#C22525'
                            disabled={data.email.length === 0 || data.password.length === 0 || loadingState.loading}
                            onPress={ async () => {
                                if(!validateData()) return;
                                setLoadingState({
                                    ...loadingState,
                                    loading: true,
                                    display: true
                                });
                                const response = await signInUser(data.email, data.password, Platform.OS,  getBuildNumberSync().toString());
                                if(response.hasError){
                                    setLoadingState({
                                        ...loadingState,
                                        loading: false,
                                        display: false
                                    });
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Error',
                                        text2: response.message,
                                        position: "bottom"
                                    });
                                    return;
                                }
                                if(rememberAccount){
                                    await AsyncStorage.setItem(
                                        AUTH_ASYNCSTORAGE_KEY,
                                        JSON.stringify({
                                            user: {
                                                ...response.data.user,
                                                password: data.password
                                            },
                                            access_token: response.data.access_token,
                                            support_contact: response.data.support_contact,
                                        })
                                    );
                                    await AsyncStorage.setItem(REMEMBER_ACCOUNT, data.email);
                                }else{
                                    await AsyncStorage.setItem(
                                        AUTH_ASYNCSTORAGE_KEY,
                                        JSON.stringify({
                                            access_token: response.data.access_token
                                        })
                                    );
                                    await AsyncStorage.setItem(REMEMBER_ACCOUNT, "");
                                }
                                store.dispatch(ActionUserSaveData(response.data));
                            }}
                        />
                        <CustomButton
                            title={i18n.t("pages.sign_in.social_sign_up")}
                            marginHorizontal='10%'
                            marginTop = {screenHeight * 0.02}
                            color='#262626'
                            disabled = {loadingState.loading}
                            onPress={() => {
                                setSocialSheetVisible(true);
                            }}
                        />
                        <PlainButton
                            title={i18n.t("pages.sign_in.recover_password")}
                            marginHorizontal='10%'
                            marginVertical={Platform.OS === 'ios' ? '3%':'1%'}
                            onPress={() => {
                                if(!navigating){
                                    setNavigating(true);
                                    navigation.push(initialStack.recover_pass_1)
                                }
                            }}
                        />
                        <VersionLabel/>
                        <Divider
                            marginVertical = "5%"
                        />
                        <Info
                            loading={loadingState.loading}
                            info={loadingState.info}
                            display={loadingState.display}
                        />
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            {!keyboardState && <FixedButton
                onPress={() => {
                    if(!navigating){
                        setNavigating(true);
                        navigation.push(initialStack.sign_up, {
                            title: "Crear cuenta"
                        });
                    }
                }}
                title = {i18n.t("pages.sign_in.sign_up_button")}
            />}
            <LoginSocialSheet
                visible={socialSheetVisible}
                onSignIn={ async (data) => {
                    setSocialSheetVisible(false);
                    setLoadingState({
                        ...loadingState,
                        loading: true,
                        display: true
                    });
                    const resp = await signInSocialUser(data.email, data.provider_id, Platform.OS,  getBuildNumberSync().toString());
                    if(!resp.hasError){
                        await AsyncStorage.setItem(
                            AUTH_ASYNCSTORAGE_KEY,
                            JSON.stringify({
                                user: resp.data.user,
                                access_token: resp.data.access_token,
                                support_contact: resp.data.support_contact,
                            })
                        );
                        store.dispatch(ActionUserSaveData({
                            user: resp.data.user,
                            access_token: resp.data.access_token,
                            support_contact : resp.data.support_contact ?? "",
                            isLogged: true
                        }));
                        return;
                    }
                    setLoadingState({
                        ...loadingState,
                        loading: false,
                        display: false
                    });
                    if(resp.status === 405){
                        Toast.show({
                            type: 'error',
                            text1: 'Lo sentimos',
                            text2: resp.message,
                            position: "bottom"
                        });
                        return;
                    }
                    let names = {};
                    if(_.isNil(data.displayName)){
                        names = {
                            firstName: "",
                            lastName: ""
                        };
                    }else{
                        names = getNames(data.displayName);
                    }
                    navigation.push(initialStack.sign_up, {
                        fromSocialMedia: true,
                        title: "Crear cuenta",
                        id: data.id,
                        provider_id: data.provider_id,
                        email: data.email,
                        firstName: names.firstName,
                        lastName: names.lastName
                    });
                }}
                changeVisible={(value)=>{
                    setSocialSheetVisible(value);
                }}
                onError={()=>{
                    Toast.show({
                        type: 'error',
                        text1: 'Ocurrió un error',
                        text2: "Inténtelo más tarde",
                        position: "bottom"
                    });
                    setSocialSheetVisible(false);
                }}
                onCancelled={()=>{
                    setSocialSheetVisible(false);
                }}
            />
        </>
    )
}