import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, Dimensions, View, Switch, StyleSheet, Image} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {CustomButton} from '../../ui/general/CustomButton';
import { store } from '../../redux/store/store';
import { AUTH_ASYNCSTORAGE_KEY} from '../../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, texts} from '../../utils/styles';
import { CustomTextInput } from '../../ui/general/CustomTextInput';
import { useSelector } from 'react-redux';
import { CustomDatePicker } from '../../ui/general/CustomDatePicker';
import {dateFormatToSpanish} from '../../utils/dateFormates';
import {MainAppBar} from '../../ui/general/MainAppBar';
import { ActionUserClearData, ActionCleanProducts, ActionShowModalsLoading, ActionUpdateUserData, ActionUserSaveTokenStatus} from "../../redux/actions";
import {signOutGoogle} from '../../controllers/auth_controller';
import { Info } from '../../ui/modal/Info';
import Toast from 'react-native-toast-message';
import _ from 'lodash';
import { ProfileValidator} from '../../utils/constraints/ProfileValidator';
import { validate } from 'validate.js';
import {updateProfile} from '../../controllers/auth_controller';
import {dateFormatToEnglish} from '../../utils/dateFormates';
import { editIcon } from '../../utils/icons';
import {SuccessBottomSheet} from '../../ui/general/SuccessBottomSheet';
import { ChangePasswordSheet } from '../../ui/pages/profile/ChangePasswordSheet';
import {changeTokenStatus, changePassword} from '../../controllers/profile_controller';
import {ChangeTokenStatusSheet} from '../../ui/pages/profile/ChangeTokenStatusSheet';
import { authenticatedGeneralStack, authenticatedHistoryStack } from '../../config/navigation';

const screenHeight = Dimensions.get('window').height;

export const ProfileMainPage = ({navigation}) => {
    const auth = useSelector(state => {
        return state.auth;
    });

    let isGuard = auth.user.role_id === 4;

    const [navigating, setNavigating] = useState(false);
    
    const general = useSelector(state => {
        return state.general;
    });

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const [successMessage, setSuccessMessage] = useState("");

    const [successVisible, setSuccessVisible] = useState(false);

    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    const [changeTokenData, setChangeTokenData] = useState({
        title: "",
        subtitle: "",
        visible: false
    });

    const [userData, setUserData] = useState({
        firstName: auth.user.user_name,
        lastName: auth.user.user_lastname,
        docNumber: auth.user.user_doc_number,
        birthday: dateFormatToSpanish(auth.user.birthday_date),
        email: auth.user.email,
        phone: auth.user.cellphone
    });
    const [dataError, setDataError] = useState({
        firstName: "",
        lastName: "",
        docNumber: "",
        birthday: "",
        email: "",
        phone: "",
    });
    const state = useSelector(state => {
        return state.application;
    });
    const displayChangePassOld = useRef(Boolean(false));

    useEffect(() => {
        if (displayChangePassOld.current && !state.displayChangePass && state.successChangePass) {
            Toast.show({
                type: 'success',
                text1: 'Correcto',
                text2: "Las contraseñas fueron cambiadas correctamente",
                position: "bottom"
            });
        }
        if (displayChangePassOld.current && !state.displayChangePass && !state.successChangePass) {
            Toast.show({
                type: 'error',
                text1: 'Atención',
                text2: "Ha ocurrido un error",
                position: "bottom"
            });
        }
        displayChangePassOld.current = Boolean(state.displayChangePass);
    }, [state.displayChangePass]);

    const validateData = () => {
        const validateProfileStep = validate({
            firstName: userData.firstName,
            lastName: userData.lastName,
            birthday: userData.birthday,
            email: userData.email,
            phone: userData.phone,
        }, ProfileValidator);
        if (_.isNil(validateProfileStep)) {
            return true;
        } else {
            let firstNameError = "";
            let lastNameError = "";
            let birthdayError = "";
            let emailError = "";
            let phoneError = "";
            if (!_.isNil(validateProfileStep['firstName'])) {
                firstNameError = validateProfileStep['firstName'][0];
            }
            if (!_.isNil(validateProfileStep['lastName'])) {
                lastNameError = validateProfileStep['lastName'][0];
            }
            if (!_.isNil(validateProfileStep['birthday'])) {
                birthdayError = validateProfileStep['birthday'][0];
            }
            if (!_.isNil(validateProfileStep['email'])) {
                emailError = validateProfileStep['email'][0];
            }
            if (!_.isNil(validateProfileStep['phone'])) {
                phoneError = validateProfileStep['phone'][0];
            }
            setDataError({
                firstName: firstNameError,
                lastName: lastNameError,
                birthday: birthdayError,
                email: emailError,
                phone: phoneError,
            });
            return false;
        }
    }
    const saveUserDataLocally = async (userData) => {
        let userRaw = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
        if (_.isNil(userRaw)) {
            await AsyncStorage.setItem(
                AUTH_ASYNCSTORAGE_KEY,
                JSON.stringify({
                    access_token: '',
                    user: userData
                })
            );
        }else{
            const data = JSON.parse(userRaw);
            const access_token = data.access_token ?? "";
            const user = data.user
            await AsyncStorage.setItem(
                AUTH_ASYNCSTORAGE_KEY,
                JSON.stringify({
                    access_token: access_token,
                    user: {
                        ...user,
                        ...userData
                    }
                })
            );
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            const user = store.getState().auth.user;
            setDataError({
                firstName: "",
                lastName: "",
                docNumber: "",
                birthday: "",
                email: "",
                phone: "",
            });
            setUserData({
                firstName: user.user_name,
                lastName: user.user_lastname,
                docNumber: user.user_doc_number,
                birthday: dateFormatToSpanish(auth.user.birthday_date),
                email: user.email,
                phone: user.cellphone
            });
        });
    }, [navigation]);

    return (
        <>
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
                        <MainAppBar
                            title = {general.address}
                            marginBottom = {"5%"}
                            isGuard = {auth.user.role_id === 4}
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
                                        lastBuy: true
                                    });
                                }
                            }}
                        />
                        <Text style={{...texts.titleSection, marginBottom: "5%", marginLeft: "5%"}}>
                            Mi cuenta
                        </Text>
                        <CustomTextInput
                            value={userData.firstName}
                            title = {"Nombres"}
                            errorMessage={dataError.firstName}
                            marginHorizontal = "5%"
                            iconName = "person-outline"
                            onFocus={() => setDataError({
                                ...dataError,
                                firstName: ''
                            })}
                            onChange={(newValue) => {
                                setUserData({
                                    ...userData,
                                    firstName: newValue
                                })
                            }}
                        />
                        <CustomTextInput
                            value={userData.lastName}
                            iconName = "person-outline"
                            errorMessage={dataError.lastName}
                            title = {"Apellidos"}
                            marginHorizontal = "5%"
                            onFocus={() => setDataError({
                                ...dataError,
                                lastName: ''
                            })}
                            onChange={(newValue) => {
                                setUserData({
                                    ...userData,
                                    lastName: newValue
                                })
                            }}
                        />
                        <CustomTextInput
                            editable = {false}
                            value={userData.docNumber}
                            iconName = "badge"
                            errorMessage={dataError.docNumber}
                            title = {"Nro. de documento"}
                            marginHorizontal = "5%"
                            onFocus={() => setDataError({
                                ...dataError,
                                docNumber: ''
                            })}
                            onChange={(newValue) => {
                                setUserData({
                                    ...userData,
                                    docNumber: newValue
                                })
                            }}
                        />
                        <CustomDatePicker
                            value={userData.birthday}
                            title={"Fecha de nacimiento"}
                            errorMessage={dataError.birthday}
                            onSelected={(date) => {
                                setUserData({
                                    ...userData,
                                    birthday: date
                                })
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                birthday: ''
                            })}
                        />
                        <CustomTextInput
                            value={userData.email}
                            editable = {false}
                            iconName = "mail-outline"
                            errorMessage={dataError.email}
                            title = {"Correo electrónico"}
                            marginHorizontal = "5%"
                            onFocus={() => setDataError({
                                ...dataError,
                                email: ''
                            })}
                            onChange={(newValue) => {
                                setUserData({
                                    ...userData,
                                    email: newValue
                                })
                            }}
                        />
                        <CustomTextInput
                            value={userData.phone}
                            title = {"Celular"}
                            editable = {false}
                            errorMessage={dataError.phone}
                            iconName = "phone-android"
                            marginHorizontal = "5%"
                            onFocus={() => setDataError({
                                ...dataError,
                                phone: ''
                            })}
                            onChange={(newValue) => {
                                setUserData({
                                    ...userData,
                                    phone: newValue
                                })
                            }}
                        />
                        {_.isNil(auth.user.provider_id) && <>
                            <Text
                                style={{...texts.generalHighlighText, marginLeft: "5%", marginBottom: "3%"}}
                            >
                                Cambiar contraseña
                            </Text>
                            <CustomTextInput
                                value={"**********"}
                                title = {"Contraseña"}
                                editable={false}
                                trailingEnabled
                                icon = {editIcon}
                                iconColor={colors.greenColor}
                                onTrailingPressed={()=>{
                                    setChangePasswordVisible(true);
                                }}
                                marginHorizontal = "5%"
                            />
                        </>}
                        {!isGuard && <View
                            style={{
                                paddingVertical: "3%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                                paddingHorizontal: "5%",
                                marginBottom: "5%"
                            }}
                        >
                            <Text style={texts.generalHighlighText}>
                                Token
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Text style={{...texts.simpleText, marginRight: "5%"}}>Activado</Text>
                                <Switch
                                    onValueChange={(newValue)=>{
                                        if(newValue){
                                            setChangeTokenData({
                                                title: "Activación token",
                                                subtitle: "El token lo usarás para confirmar las compras que hagas. Estos llegarán como SMS a tu celular. Solo serán validos por 1 minuto. Luego de ello tendrás que volver a pedirlo.",
                                                visible: true
                                            });
                                        }else{
                                            setChangeTokenData({
                                                title: "Desactivación token",
                                                subtitle: "Estas por desactivar el token, no podrás realizar ninguna compra hasta que vuelvas a activarlo.",
                                                visible: true
                                            });
                                        }
                                    }}
                                    value={auth.user.is_token === 1 ? true : false}
                                />
                            </View>
                        </View>}
                        <CustomButton
                            title={"Guardar"}
                            color={colors.accentColor}
                            onPress={ async () => {
                                if(loadingState.loading) return;
                                if(!validateData()) return;
                                setLoadingState({
                                    ...loadingState,
                                    loading: true,
                                    display: true
                                });
                                const response = await updateProfile(auth.user.id, {
                                    ...userData,
                                    birthday: dateFormatToEnglish(userData.birthday)
                                });
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
                                const formated = {
                                    user_name: userData.firstName,
                                    user_lastname: userData.lastName,
                                    user_doc_number: userData.docNumber,
                                    birthday_date: dateFormatToEnglish(userData.birthday),
                                    email: userData.email,
                                    cellphone: userData.phone,
                                }
                                store.dispatch(ActionUpdateUserData(formated));
                                await saveUserDataLocally(formated);
                                setSuccessMessage("Perfil actualizado");
                                setSuccessVisible(true);
                            }}
                        />
                        <CustomButton
                            title={"Cerrar sesión"}
                            marginHorizontal='10%'
                            marginTop = {screenHeight * 0.02}
                            marginBottom = {screenHeight * 0.05}
                            color='#262626'
                            onPress={async() => {
                                store.dispatch(ActionCleanProducts());
                                await AsyncStorage.setItem(AUTH_ASYNCSTORAGE_KEY,"");
                                await signOutGoogle();
                                store.dispatch(ActionUserClearData());
                            }}
                        />
                        <Info
                            onClose={() => {
                                store.dispatch(ActionShowModalsLoading({
                                    displayError: false,
                                    displayChangeToken: false,
                                    displayChangeTokenInfo: false,
                                    messageInfo: ""
                                }));
                            }}
                            messageInfo={state.messageInfo}
                            imageTitle={state.displayError ?
                                <Image style={{ width: 50, height: 42, marginBottom: 20 }} resizeMode="contain" source={require('../../assets/images/modal/ico_warning.png')} />
                                : <Image style={{ width: 50, height: 50, marginBottom: 20 }} resizeMode="contain" source={require('../../assets/images/modal/ico_checked.png')} />}
                            containerImageTitleStyle={styles.containerImageTitleError}
                            titleInfoStyle={styles.titleInfo}
                            messageInfoStyle={styles.messageInfo}
                            loading={state.displayChangeTokenLoading}
                            info={state.displayChangeTokenInfo}
                            display={state.displayChangeToken}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <Info
                loading={loadingState.loading}
                info={loadingState.info}
                display={loadingState.display}
            />
            <ChangePasswordSheet
                title = "Reporte enviado"
                buttonText = "Cerrar"
                visible = {changePasswordVisible}
                changeVisible = {(value) => {
                    setChangePasswordVisible(value);
                }}
                onActivate = {async (oldPassword, repeatPassword) => {
                    setChangePasswordVisible(false);
                    const dataStore = store.getState().auth;
                    setLoadingState({
                        ...loadingState,
                        loading: true,
                        display: true
                    });
                    let response = await changePassword(dataStore.user.email, oldPassword, repeatPassword);
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
                    await saveUserDataLocally({
                        password: repeatPassword
                    });
                    setLoadingState({
                        ...loadingState,
                        loading: false,
                        display: false
                    });

                    setSuccessMessage("Contraseña actualizada");
                    setSuccessVisible(true);
                }}
            />
            <SuccessBottomSheet
                title = {successMessage}
                buttonText = "Cerrar"
                visible = {successVisible}
                changeVisible = {(value) => {
                    setSuccessVisible(value);
                }}
            />
            <ChangeTokenStatusSheet
                visible = {changeTokenData.visible}
                title = {changeTokenData.title}
                subtitle = {changeTokenData.subtitle} 
                changeVisible = {(value) => {
                    setChangeTokenData({
                        ...changeTokenData,
                        visible : value
                    });
                }}
                onActivate={async()=>{
                    setChangeTokenData({
                        ...changeTokenData,
                        visible : false
                    });
                    setLoadingState({
                        ...loadingState,
                        loading: true,
                        display: true
                    });
                    const response = await changeTokenStatus(auth.user.email, auth.user.is_token === 1 ? "0" : "1");
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
                    const newStatus = auth.user.is_token === 1 ? 0 : 1;
                    store.dispatch(ActionUserSaveTokenStatus({
                        token_status: newStatus
                    }));
                    saveUserDataLocally({
                        is_token: newStatus
                    })
                }}
            />
        </>
    )           
}
const styles = StyleSheet.create({
    titleInfo: {
        color: '#313638',
        fontSize: 18,
        textAlign: "center",
        lineHeight: 22,
        marginTop: 20,
    },
    messageInfo: {
        color: '#101E28',
        fontSize: 16,
        lineHeight: 20,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        textAlign: "center"
    },
    containerImageTitleError: {
        backgroundColor: "transparent",
        width: 50,
        height: 50,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
})