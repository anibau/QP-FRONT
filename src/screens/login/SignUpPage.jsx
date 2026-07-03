import React, {useEffect, useState, useRef} from 'react'
import { StyleSheet, Text, Dimensions, SafeAreaView, Image, View, TouchableNativeFeedback, Platform} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../ui/general/CustomButton';
import { CustomTextInput } from '../../ui/general/CustomTextInput';
import _ from 'lodash';
import {texts} from '../../utils/styles';
import {AppBar} from '../../ui/general/AppBar';
import {colors} from '../../utils/styles';
import { CustomDatePicker } from '../../ui/general/CustomDatePicker';
import { DocumentTypeSelector } from '../../ui/general/DocumentTypeSelector';
import { SignUpValidator} from '../../utils/constraints/SignUpValidator';
import { SignUpValidatorSocial} from '../../utils/constraints/SignUpValidatorSocial';
import { Info } from '../../ui/modal/Info';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store/store';
import { ActionUserSignUp, ActionUserSaveData, ActionShowModalsLoading, ActionUserSignUpSocial} from "../../redux/actions";
import i18n from '../../config/i18n';
import { validate } from 'validate.js';
import {dateFormatToEnglish} from '../../utils/dateFormates';
import {LoginSocialSheet} from '../../ui/general/LoginSocialSheet';
import {signInSocialUser} from '../../controllers/auth_controller';
import { getNames } from '../../utils/stringFormaters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    AUTH_ASYNCSTORAGE_KEY,
} from '../../config/constants';
import Toast from 'react-native-toast-message';
import {lengthFromDocumentId, keyboardTypeFromDocumentId, validateDocumentNumber} from '../../utils/utils';
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from '../../ui/general/CheckBox';
import { initialStack } from '../../config/navigation';
import { getBuildNumberSync } from '../../services/device/buildNumber';

const screenHeight = Dimensions.get('window').height;

export const SignUpPage = ({route, navigation}) => {
    const {
        email = '',
        firstName = '',
        lastName = ''
    } = route.params;

    const [fromSocialMedia, setFromSocialMedia] = useState(route.params.fromSocialMedia ?? false);
    const [provider_id, setProvider_id] = useState(route.params.provider_id ?? "0");
    const [id, setId] = useState(route.params.provider_id ?? "");

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    const state = useSelector(state => {
        return state.application;
    });
    const displaySignUpOld = useRef(Boolean(false));
    const [socialSheetVisible, setSocialSheetVisible] = useState(false);
    const [navigating, setNavigating] = useState(false);
    const [signingUp, setSigningUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        firstName: firstName,
        lastName: lastName,
        documentNumber: "",
        birthDay: "",
        email: email,
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        documentType: 0
    });
    const [dataError, setDataError] = useState({
        firstName: "",
        lastName: "",
        documentType: "",
        documentNumber: "",
        birthDay: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [loadingState, setLoadingState] = useState({
        loading: true,
        display: true,
        info: false
    });

    const validateData = () => {
        const validateSignUpStep = validate({
            firstName: data.firstName,
            lastName: data.lastName,
            documentNumber: data.documentNumber,
            birthDay: data.birthDay,
            phoneNumber: data.phoneNumber,
            email: data.email,
            documentType: data.documentType,
            password: data.password,
            confirmPassword: data.confirmPassword
        }, SignUpValidator);
        if (_.isNil(validateSignUpStep) && data.password == data.confirmPassword) {
            store.dispatch(ActionUserSignUp({
                "user_doc_type_id": data.documentType,
                "user_doc_number": data.documentNumber,
                "user_name": data.firstName,
                "user_lastname": data.lastName,
                "email": data.email,
                "password": data.password,
                "password_confirmation": data.confirmPassword,
                "birthday_date": dateFormatToEnglish(data.birthDay),
                "cellphone_code": "+51",
                "cellphone": data.phoneNumber,
                "so": Platform.OS,
                "version": getBuildNumberSync().toString()
            }));
        } else {
            let nameError = "";
            let lastNameError = "";
            let docTypeError = "";
            let docNumberError = "";
            let birthDayError = "";
            let emailError = "";
            let phoneError = "";
            let passwordError = "";
            let confirmPasswordError = "";
            if(_.isNil(validateSignUpStep)){
                confirmPasswordError = i18n.t('pages.sign_up.error_passwords_mismatch');
            }else{
                if (!_.isNil(validateSignUpStep['firstName'])) {
                    nameError = validateSignUpStep['firstName'][0];
                }
                if (!_.isNil(validateSignUpStep['lastName'])) {
                    lastNameError = validateSignUpStep['lastName'][0];
                }
                if (!_.isNil(validateSignUpStep['documentType'])) {
                    docTypeError = validateSignUpStep['documentType'][0];
                }
                const docMessageError = validateDocumentNumber(data.documentType, data.documentNumber);
                if(Boolean(docMessageError.length)){
                    docNumberError = docMessageError;
                }
                if (!_.isNil(validateSignUpStep['birthDay'])) {
                    birthDayError = validateSignUpStep['birthDay'][0];
                }
                if (!_.isNil(validateSignUpStep['email'])) {
                    emailError = validateSignUpStep['email'][0];
                }
                if (!_.isNil(validateSignUpStep['phoneNumber'])) {
                    phoneError = validateSignUpStep['phoneNumber'][0];
                }
                if (!_.isNil(validateSignUpStep['password'])) {
                    passwordError = validateSignUpStep['password'][0];
                }
                if (!_.isNil(validateSignUpStep['confirmPassword'])) {
                    confirmPasswordError = validateSignUpStep['confirmPassword'][0];
                }
                if (_.isNil(validateSignUpStep['password']) && _.isNil(validateSignUpStep['confirmPassword']) && data.password != data.confirmPassword) {
                    confirmPasswordError = i18n.t('pages.sign_up.error_passwords_mismatch');
                }
            }
            setSigningUp(false);
            setDataError({
                firstName: nameError,
                lastName: lastNameError,
                documentNumber: docNumberError,
                birthDay: birthDayError,
                email: emailError,
                phoneNumber: phoneError,
                password: passwordError,
                confirmPassword: confirmPasswordError,
                documentType: docTypeError
            });
        }
    }
    const validateDataSocial = () => {
        const validateSignUpStep = validate({
            firstName: data.firstName,
            lastName: data.lastName,
            documentType: data.documentType,
            birthDay: data.birthDay,
            email: data.email,
            phoneNumber: data.phoneNumber,
        }, SignUpValidatorSocial);
        if (_.isNil(validateSignUpStep)) {
            store.dispatch(ActionUserSignUpSocial({
                "user_doc_number": data.documentNumber,
                "user_name": data.firstName,
                "birthday_date": dateFormatToEnglish(data.birthDay),
                "user_lastname": data.lastName,
                "email": data.email,
                "usuario_id": id,
                "provider_id": provider_id,
                "user_status": "1",
                "role_id": "1",
                "cellphone_code": "+51",
                "cellphone": data.phoneNumber,
                "user_doc_type_id": data.documentType,
                "so": Platform.OS,
                "version": getBuildNumberSync().toString()
            }));
        } else {
            let nameError = "";
            let lastNameError = "";
            let docTypeError = "";
            let docNumberError = "";
            let birthDayError = "";
            let emailError = "";
            let phoneError = "";
            if (!_.isNil(validateSignUpStep['firstName'])) {
                nameError = validateSignUpStep['firstName'][0];
            }
            if (!_.isNil(validateSignUpStep['lastName'])) {
                lastNameError = validateSignUpStep['lastName'][0];
            }
            if (!_.isNil(validateSignUpStep['documentType'])) {
                docTypeError = validateSignUpStep['documentType'][0];
            }
            const docMessageError = validateDocumentNumber(data.documentType, data.documentNumber);
            if(Boolean(docMessageError.length)){
                docNumberError = docMessageError;
            }
            if (!_.isNil(validateSignUpStep['birthDay'])) {
                birthDayError = validateSignUpStep['birthDay'][0];
            }
            if (!_.isNil(validateSignUpStep['email'])) {
                emailError = validateSignUpStep['email'][0];
            }
            if (!_.isNil(validateSignUpStep['phoneNumber'])) {
                phoneError = validateSignUpStep['phoneNumber'][0];
            }
            setSigningUp(false);
            setDataError({
                firstName: nameError,
                lastName: lastNameError,
                documentNumber: docNumberError,
                birthDay: birthDayError,
                email: emailError,
                phoneNumber: phoneError,
                documentType: docTypeError
            });

        }
    }
    useEffect(() => {
        if (displaySignUpOld.current && !state.displaySignUp && state.successSignUp) {
            store.dispatch(ActionUserSaveData(state.tempUserData));
        }
        displaySignUpOld.current = Boolean(state.displaySignUp);
        return () => {

        }
    }, [state.displaySignUp]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            setSigningUp(false);
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
                    >
                        <AppBar
                            title={fromSocialMedia ? "Completar datos": "Crear cuenta"}
                            onPress={()=>{
                                if(!navigating){
                                    setNavigating(true);
                                    navigation.pop();
                                }
                            }}
                        >
                        </AppBar>
                        <Text style={{...texts.titleSection, paddingLeft: '5%', marginBottom: "5%", marginTop: "5%"}}>
                            {fromSocialMedia ? "Completa tus datos": "Ingresa tus datos"}
                        </Text>
                        <CustomTextInput
                            marginHorizontal = "5%"
                            placeholderTextColor={"#C8C8C8"}
                            autoCapitalize = "none"
                            value={data.firstName}
                            title = {"Nombres"}
                            width = "90%"
                            iconName = "person-outline"
                            errorMessage={dataError.firstName}
                            onChange={(newValue) => {
                                setData({
                                    ...data,
                                    firstName: newValue
                                })
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                firstName: ''
                            })}
                        />
                        <CustomTextInput
                            marginHorizontal = "5%"
                            keyboardType="default"
                            placeholderTextColor={"#C8C8C8"}
                            autoCapitalize = "none"
                            value={data.lastName}
                            errorMessage={dataError.lastName}
                            iconName = "person-outline"
                            title = {"Apellidos"}
                            onChange={(newValue) => {
                                setData({
                                    ...data,
                                    lastName: newValue
                                })
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                lastName: ''
                            })}
                        />
                        <DocumentTypeSelector
                            placeholder={"Seleccione un tipo"}
                            title={"Tipo de documento"}
                            marginHorizontal = "5%"
                            onSelected={(documentTypeSelected) => {
                                if(dataError.documentType.length == 0){
                                    setData({
                                        ...data,
                                        documentType: documentTypeSelected,
                                        documentNumber: ""
                                    });
                                }
                                setDataError({
                                    ...dataError,
                                    documentType: ''
                                });
                            }}
                            onItemsLoaded={()=>{
                                setLoadingState({
                                    ...loadingState,
                                    loading: false,
                                    display: false
                                });
                            }}
                            onEmptySelected={()=>{
                                setData({
                                    ...data,
                                    documentType: ''
                                });
                            }}
                            onAditionalDataChange = {(newValue) => {
                            }}
                            errorMessage={dataError.documentType}
                        />
                        <CustomTextInput
                            marginHorizontal = "5%"
                            keyboardType = {keyboardTypeFromDocumentId(data.documentType)}
                            placeholderTextColor={"#C8C8C8"}
                            autoCapitalize = "none"
                            value={data.documentNumber}
                            errorMessage={dataError.documentNumber}
                            iconName = "badge"
                            maxLength = {lengthFromDocumentId(data.documentType)}
                            editable = {Boolean(data.documentType.length)}

                            title = {"Nro. de documento"}
                            onFocus={() => setDataError({
                                ...dataError,
                                documentNumber: ''
                            })}
                            onChange={(newValue) => {
                                if (!(/[^0-9a-zA-Z]/.test(newValue))) {
                                    setData({
                                        ...data,
                                        documentNumber: newValue.toUpperCase()
                                    })
                                }
                            }}
                        />
                        <CustomDatePicker
                            value={data.birthDay}
                            errorMessage={dataError.birthDay}
                            title={"Fecha de nacimiento"}
                            onSelected={(date) => {
                                setData({
                                    ...data,
                                    birthDay: date
                                })
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                birthDay: ''
                            })}
                        />
                        <CustomTextInput
                            marginHorizontal = "5%"
                            keyboardType = "email-address"
                            placeholderTextColor = {"#C8C8C8"}
                            autoCapitalize = "none"
                            value = {data.email}
                            errorMessage={dataError.email}
                            editable = {!fromSocialMedia}
                            iconName = "mail-outline"
                            title = {"Correo electrónico"}
                            onChange = {(newValue) => {
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
                            marginHorizontal = "5%"
                            keyboardType = "number-pad"
                            value={data.phoneNumber}
                            errorMessage={dataError.phoneNumber}
                            title = {"Celular"}
                            maxLength = {9}
                            onChange={(newValue) => {
                                setData({
                                    ...data,
                                    phoneNumber: newValue
                                })
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                phoneNumber: ''
                            })}
                        />
                        {!fromSocialMedia && <CustomTextInput
                            keyboardType="default"
                            placeholderTextColor={"#C8C8C8"}
                            autoCapitalize = "none"
                            isPasswordInput
                            value={data.password}
                            errorMessage={dataError.password}
                            marginHorizontal = "5%"
                            showPassword={showPassword}
                            title = {"Nueva contraseña"}
                            iconName = "check-circle-outline"
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
                        />}
                        {!fromSocialMedia && <CustomTextInput
                            keyboardType="default"
                            placeholderTextColor={"#C8C8C8"}
                            autoCapitalize = "none"
                            isPasswordInput
                            marginHorizontal = "5%"
                            value={data.confirmPassword}
                            errorMessage={dataError.confirmPassword}
                            showPassword={showConfirmPassword}
                            title = {"Repetir contraseña"}
                            iconName = "check-circle-outline"
                            onChange={(newValue) => {
                                setData({
                                    ...data,
                                    confirmPassword: newValue
                                })
                            }}
                            onTrailingPressed={()=>{
                                setShowConfirmPassword(!showConfirmPassword);
                            }}
                            onFocus={() => setDataError({
                                ...dataError,
                                confirmPassword: ''
                            })}
                        />}
                        <View
                            style = {{
                                flexDirection: "row",
                                paddingHorizontal: "5%",
                                alignItems: "center"
                            }}
                        >
                            <CheckBox
                                containerStyle={styles.checkProfile}
                                checkedColor={colors.mainColor}
                                uncheckedColor={"#2F73C4"}
                                iconType={"ionicon"}
                                checkedIcon='ios-checkbox'
                                uncheckedIcon='ios-square-outline'
                                checked={termsAccepted}
                                onPress={(newValue) => {
                                    setTermsAccepted(!termsAccepted);
                                }}
                            />
                            <Text>
                                <Text>Términos y condiciones  </Text> 
                                <TouchableNativeFeedback
                                    onPress = {()=>{
                                        navigation.push(initialStack.terms)
                                    }}
                                >
                                <Text style={{
                                    fontWeight: "700",
                                    color: colors.mainColor
                                }}> Ver</Text>
                                </TouchableNativeFeedback>   
                            </Text>
                        </View>

                        <View
                            style = {{
                                flexDirection: "row",
                                paddingHorizontal: "5%",
                                alignItems: "center",
                                marginTop: "3%"
                            }}
                        >
                            <CheckBox
                                containerStyle={styles.checkProfile}
                                checkedColor={colors.mainColor}
                                uncheckedColor={"#2F73C4"}
                                iconType={"ionicon"}
                                checkedIcon='ios-checkbox'
                                uncheckedIcon='ios-square-outline'
                                checked={privacyAccepted}
                                onPress={(newValue) => {
                                    setPrivacyAccepted(!privacyAccepted);
                                }}
                            />
                            <Text>
                                <Text>Política de privacidad  </Text> 
                                <TouchableNativeFeedback
                                    onPress = {()=>{
                                        navigation.push(initialStack.privacy)
                                    }}
                                >
                                <Text style={{
                                    fontWeight: "700",
                                    color: colors.mainColor
                                }}> Ver</Text>
                                </TouchableNativeFeedback>   
                            </Text>
                        </View>
                        <CustomButton
                            title={"Registrarse con una cuenta"}
                            marginHorizontal='10%'
                            marginTop = {screenHeight * 0.02}
                            color='#262626'
                            onPress={() => {
                                setSocialSheetVisible(true);
                            }}
                        />
                        <CustomButton
                            title={"Finalizar"}
                            marginHorizontal='10%'
                            marginBottom = {50}
                            marginTop = {screenHeight * 0.02}
                            color= {colors.accentColor}
                            onPress={() => {
                                if(!signingUp){
                                    if(!termsAccepted){
                                        store.dispatch(ActionShowModalsLoading({
                                            displayError: true,
                                            displaySignUp: true,
                                            displaySignUpInfo: true,
                                            messageInfo: "Por favor, acepte los términos y condiciones"
                                        }));
                                        return;
                                    }
                                    if(!privacyAccepted){
                                        store.dispatch(ActionShowModalsLoading({
                                            displayError: true,
                                            displaySignUp: true,
                                            displaySignUpInfo: true,
                                            messageInfo: "Por favor, acepte la política de privacidad"
                                        }));
                                        return;
                                    }
                                    setSigningUp(true);
                                    if(fromSocialMedia){
                                        validateDataSocial();
                                    }else{
                                        validateData();
                                    }
                                }
                            }}
                        />
                        <Info
                            onClose={() => {
                                store.dispatch(ActionShowModalsLoading({
                                    displayError: false,
                                    displaySignUp: false,
                                    displaySignUpInfo: false,
                                    messageInfo: ""
                                }));
                                setSigningUp(false);
                            }}
                            messageInfo={state.messageInfo}
                            imageTitle={state.displayError ?
                                <Image style={{ width: 50, height: 42, marginBottom: 20 }} resizeMode="contain" source={require('../../assets/images/modal/ico_warning.png')} />
                                : <Image style={{ width: 50, height: 50, marginBottom: 20 }} resizeMode="contain" source={require('../../assets/images/modal/ico_checked.png')} />}
                            containerImageTitleStyle={styles.containerImageTitleError}
                            titleInfoStyle={styles.titleInfo}
                            messageInfoStyle={styles.messageInfo}
                            loading={state.displaySignUpLoading}
                            info={state.displaySignUpInfo}
                            display={state.displaySignUp}
                        />
                        <Info
                            loading={loadingState.loading}
                            info={loadingState.info}
                            display={loadingState.display}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <LoginSocialSheet
                visible={socialSheetVisible}
                onSignIn={ async (newData) => {
                    setSocialSheetVisible(false);
                    setLoadingState({
                        ...loadingState,
                        loading: true,
                        display: true
                    });
                    const resp = await signInSocialUser(newData.email, newData.provider_id,  getBuildNumberSync().toString());
                    setLoadingState({
                        ...loadingState,
                        loading: false,
                        display: false
                    });
                    if(!resp.hasError){
                        AsyncStorage.setItem(
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
                            isLogged: true
                        }))
                    }else{
                        let names = {};
                        if(_.isNil(newData.displayName)){
                            names = {
                                firstName: "",
                                lastName: ""
                            };
                        }else{
                            names = getNames(newData.displayName);
                        }
                        setFromSocialMedia(true);
                        setProvider_id(newData.provider_id);
                        setId(newData.id);
                        setData({
                            ...data,
                            email: _.isNil(newData.email) ? "" : newData.email,
                            firstName: names.firstName,
                            lastName: names.lastName
                        });
                    }
                }}
                changeVisible={(value)=>{
                    setSocialSheetVisible(value);
                }}
                onError={()=>{
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
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
    },container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'green'
    },
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
    checkProfile: {
        width: 35,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingHorizontal: 0,
        borderWidth: 0,
    },
})