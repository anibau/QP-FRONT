import React, { useState, useRef, useEffect} from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../ui/general/CustomButton';
import { CustomTextInput } from '../../ui/general/CustomTextInput';
import {texts} from '../../utils/styles';
import { useSelector } from 'react-redux';
import i18n from '../../config/i18n';
import { validate } from 'validate.js';
import { RecoverPasswordValidator } from '../../utils/constraints/RecoverPasswordValidator';
import Toast from 'react-native-toast-message';
import { store } from '../../redux/store/store';
import { ActionUserRecoverPassword, ActionShowModalsLoading} from "../../redux/actions";
import { Info } from '../../ui/modal/Info';
import {AppBar} from '../../ui/general/AppBar';
import { CustomDatePicker } from '../../ui/general/CustomDatePicker';
import { colors } from '../../utils/styles';
import _ from 'lodash';
import {dateFormatToEnglish} from '../../utils/dateFormates';

export const RecoverPasswordStep1 = ({navigation}) => {

    const displayRecoveringOld = useRef(Boolean(false));
    
    const state = useSelector(state => {
        return state.application;
    });
    
    const [data, setData] = useState({
        documentNumber: '',
        birthDay: ''
    });
    
    const [recovering, setRecovering] = useState(false);
    const [navigating, setNavigating] = useState(false);

    const validateData = () => {
        const validateRecoveringStep = validate({
            documentNumber: data.documentNumber.trim(),
            birthDay: data.birthDay.trim(),
        }, RecoverPasswordValidator);
        if (_.isNil(validateRecoveringStep)) {
            store.dispatch(ActionUserRecoverPassword({
                "user_doc_number": data.documentNumber,
                "birthday_date": dateFormatToEnglish(data.birthDay)
            }));
        } else {
            let documentNumberError = "", birthDayError = "";
            if (!_.isNil(validateRecoveringStep['documentNumber'])) {
                documentNumberError = validateRecoveringStep['documentNumber'][0];
            }
            if (!_.isNil(validateRecoveringStep['birthDay'])) {
                birthDayError = validateRecoveringStep['birthDay'][0];
            }
            setRecovering(false);
            if(documentNumberError.length !== 0){
                setData({
                    ...data,
                    documentNumber: ""
                });
                Toast.show({
                    type: 'error',
                    text1: 'Atención',
                    text2: documentNumberError,
                    position: "bottom"
                });
                return;
            }
            if(birthDayError.length !== 0){
                setData({
                    ...data,
                    birthDay: ""
                });
                Toast.show({
                    type: 'error',
                    text1: 'Atención',
                    text2: birthDayError,
                    position: "bottom"
                });
                return;
            }
        }
    }

    useEffect(() => {
        if (displayRecoveringOld.current && !state.displayRecovering && state.successRecovering) {
        }
        displayRecoveringOld.current = Boolean(state.displayRecovering);
        return () => {

        }
    }, [state.displayRecovering]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            setRecovering(false);
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
                        <AppBar
                            title={i18n.t("pages.recover_password.header")}
                            onPress={()=>{
                                if(!navigating){
                                    setNavigating(true);
                                    navigation.pop();
                                }
                            }}
                        />
                        <Text style={{...texts.titleSection, marginBottom: "2%", marginLeft: "5%", marginTop: "5%"}}>
                            {i18n.t("pages.recover_password.title")}
                        </Text>
                        <Text style={{...texts.subtitleSection, marginBottom: '8%', marginHorizontal: "5%", lineHeight: 20}}>
                            {i18n.t("pages.recover_password.subtitle")}
                        </Text>
                        <CustomTextInput
                            placeholderTextColor={colors.placeholder}
                            autoCapitalize = "none"
                            value={data.documentNumber}
                            iconName = "badge"
                            title = {i18n.t("inputs.document_input")}
                            onFocus={() => {}}
                            marginHorizontal = "5%"
                            onChange={(newValue) => {
                                setData({
                                    ...data,
                                    documentNumber: newValue
                                })
                            }}
                        />
                        <CustomDatePicker
                            value={data.birthDay}
                            title = {i18n.t("inputs.birthday_input")}
                            onSelected={(date) => {
                                setData({
                                    ...data,
                                    birthDay: date
                                })
                            }}
                        />
                        <Text style={{...texts.subtitleSection, marginBottom: '8%', marginHorizontal: "5%"}}>
                            {i18n.t("pages.recover_password.message")}
                        </Text>
                        <Info
                            onClose={() => {
                                const storeData = store.getState();
                                if(storeData.application.successRecovering){
                                    store.dispatch(ActionShowModalsLoading({
                                        displayError: false,
                                        displayRecovering: false,
                                        displayRecoveringInfo: false,
                                        messageInfo: ""
                                    }));
                                    setRecovering(false);
                                    navigation.pop();
                                }else{
                                    store.dispatch(ActionShowModalsLoading({
                                        displayError: false,
                                        displayRecovering: false,
                                        displayRecoveringInfo: false,
                                        messageInfo: ""
                                    }));
                                    setRecovering(false);
                                    setData({
                                        birthDay: "",
                                        documentNumber: ""
                                    })
                                }
                            }}
                            messageInfo={state.messageInfo}
                            imageTitle={state.displayError ?
                                <Image style={{ width: 50, height: 42, marginBottom: 20 }} resizeMode="contain" source={require('../../assets/images/modal/ico_warning.png')} />
                                : <Image style={{ width: 50, height: 50, marginBottom: 20 }} resizeMode="contain" source={require('../../assets/images/modal/ico_checked.png')} />}
                            containerImageTitleStyle={styles.containerImageTitleError}
                            titleInfoStyle={styles.titleInfo}
                            messageInfoStyle={styles.messageInfo}
                            loading={state.displayRecoveringLoading}
                            info={state.displayRecoveringInfo}
                            display={state.displayRecovering}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <CustomButton
                marginBottom={"8%"}
                title={i18n.t("pages.recover_password.button")}
                color={colors.accentColor}
                onPress={() => {
                    if(!recovering){
                        setRecovering(true);
                        validateData();
                    }
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