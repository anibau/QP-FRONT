import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Container from '../../ui/container/Container';
import {AppBar} from '../../ui/general/AppBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {texts, colors} from '../../utils/styles';
import {CustomButton} from '../../ui/general/CustomButton';
import {FileSelector} from '../../ui/general/FileSelector';
import {BoxInput} from '../../ui/general/BoxInput';
import { createSuggestion } from '../../controllers/suggestions_controller';
import { Info } from '../../ui/modal/Info';
import { store } from '../../redux/store/store';
import Toast from 'react-native-toast-message';
import {SuccessBottomSheet} from '../../ui/general/SuccessBottomSheet';

export const SuggestionsPage = ({navigation}) => {

    const [fileSelected, setFileSelected] = useState({
        uri: undefined,
        name: undefined
    });
    const [successVisible, setSuccessVisible] = useState(false);
    
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    
    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const sendSuggestion = async () => {
        if(!Boolean(comment.length)){
            setCommentError("Escriba una sugerencia")
            return;
        }
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const data = store.getState().auth;
        const resp = await createSuggestion(data.user.id, comment, fileSelected);
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(resp.hasError){
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: resp.message,
                position: "bottom"
            });
            return;
        }
        setSuccessVisible(true);
    }

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
                        title="Buzón de sugerencias"
                        onPress={()=>{
                            navigation.pop();
                        }}
                    />
                    <Text style={{...texts.titleSection, paddingHorizontal: "5%", marginTop: "5%"}}>
                        Ayúdanos a mejorar
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: "7%", paddingHorizontal: "5%", marginTop: "5%", lineHeight: 25}}>
                        Queremos saber si tu experiencia en la plataforma fue de tu agrado, coméntanos en qué podemos mejorar
                    </Text>
                    <BoxInput
                        onChange = {(value)=>{
                            setComment(value);
                        }}
                        errorMessage = {commentError}
                        value = {comment}
                    />
                    <Text style={{...texts.subtitleSection, marginBottom: "5%", paddingHorizontal: "5%", marginTop: "5%", lineHeight: 20}}>
                        Tus comentarios nos ayudan a crecer y seguir brindándote la mejor experiencia en tus compras
                    </Text>
                    <FileSelector
                        onGetResult = {(tempResult) => {
                            setFileSelected({
                                uri: tempResult.uri,
                                name: tempResult.name,
                                fullName: tempResult.fullName,
                                mimeType: "image/" + tempResult.mimeType,
                                data: tempResult.base64
                            });
                        }}
                        result = {fileSelected}
                    />
                    <CustomButton
                        title={"Enviar sugerencia"}
                        marginTop = {"10%"}
                        marginBottom = {"10%"}
                        color = {colors.accentColor}
                        onPress={sendSuggestion}
                    />
                    <Info
                        loading={loadingState.loading}
                        info={loadingState.info}
                        display={loadingState.display}
                    />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </Container>
        <SuccessBottomSheet
            title = "Sugerencia enviada"
            buttonText = "Cerrar"
            visible = {successVisible}
            changeVisible = {(value) => {
                setSuccessVisible(value);
                navigation.pop();
            }}
        />
    </>
  );
};
