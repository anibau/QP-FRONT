import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, Linking, Platform} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts, colors} from '../../utils/styles';
import {IncidentTypeSelector} from '../../ui/pages/incidents/IncidentTypeSelector';
import {CustomButton} from '../../ui/general/CustomButton';
import Toast from 'react-native-toast-message';
import { Info } from '../../ui/modal/Info';
import {getIncidentTypes, createIncident} from '../../controllers/incidents_controller';
import { store } from '../../redux/store/store';
import {BoxInput} from '../../ui/general/BoxInput';
import {Divider} from '../../ui/general/Divider';
import _ from 'lodash';
import { FileSelector } from '../../ui/general/FileSelector';
import { StoreSelector } from '../../ui/pages/incidents/StoreSelector';
import {SuccessBottomSheet} from '../../ui/general/SuccessBottomSheet';
import { SvgXml } from 'react-native-svg';
import {phoneIcon} from '../../utils/icons';
import {useStores} from '../../hooks/useStores';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';

export const IncidentRegisterPage = ({navigation}) => {

    const supportPhone = useSelector(state => {
        return state.auth.support_contact;
    });

    const [fileSelected, setFileSelected] = useState({
        uri: undefined,
        name: undefined
    });

    const [dataError, setDataError] = useState({
        incidentType: "",
        comment: "",
    });

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const [incidentTypes, setIncidentTypes] = useState([]);
    const [successVisible, setSuccessVisible] = useState(false);
    const [incidentTypeSelected, setIncidentTypeSelected] = useState(undefined);
    const [storeSelected, setStoreSelected] = useState(undefined);
    const [comment, setComment] = useState("");

    const sendIncident = async() => {
        if(!Boolean(comment.length)){
            setDataError({
                ...dataError,
                comment: "Escriba un comentario"
            });
            return;
        }
        if(_.isNil(incidentTypeSelected)){
            Toast.show({
                type: 'error',
                text1: 'Atención',
                text2: 'Seleccione un tipo de incidencia',
                position: "bottom"
            });
            return;
        }
        if(_.isNil(storeSelected)){
            Toast.show({
                type: 'error',
                text1: 'Atención',
                text2: 'Seleccione una tienda',
                position: "bottom"
            });
            return;
        }
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const data = store.getState().auth;
        const resp = await createIncident(incidentTypeSelected.id, data.user.id, comment, fileSelected, storeSelected.id);
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
        if(Platform.OS == "ios"){
            setTimeout(()=>{
                setSuccessVisible(true);
            }, 500)
        }else{
            setSuccessVisible(true);
        }
    }
    
    const getIncidentTypesList = async() => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await getIncidentTypes();
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(!resp.hasError){
            const temp = resp.data;
            const types = temp.map((e) => {
                return {
                    id: e.id,
                    incidence_description: e.incidence_description,
                    created_at: e.created_at,
                    updated_at: e.updated_at,
                    key: e.id.toString(),
                    label: e.incidence_description,
                    value: e.incidence_description,
                } 
            });
            setIncidentTypes(types);
        }
    }
    
    useEffect(() => {
        getIncidentTypesList();
    }, []);

    const {
        storesList, 
        storesListLoading, 
        storesListError,
    } = useStores();

    return (
        <>
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
                        title="Buzón de incidencias"
                        onPress={()=>{
                            navigation.pop();
                        }}
                    />
                    <Text style={{...texts.titleSection, paddingHorizontal: "5%", marginTop: "5%"}}>
                        ¿Tuviste un problema?
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: "7%", paddingHorizontal: "5%", marginTop: "5%"}}>
                        Indícanos tu inconformidad para darle una pronta solución
                    </Text>
                    <IncidentTypeSelector
                        onSelection ={(value)=>{
                            setIncidentTypeSelected(value);
                            /* const incidentSelected = incidentTypes.filter((e)=>{ return e.label === value});
                            if(Boolean(incidentSelected.length)){
                                setIncidentTypeSelected(incidentSelected[0]);
                            } */
                        }}
                        items = {incidentTypes}
                        itemSelected = {incidentTypeSelected}
                    />
                    <StoreSelector
                        onSelection ={(value)=>{
                            setStoreSelected(value);
                        }}
                        items = {storesList}
                        itemSelected = {storeSelected}
                    />
                    <BoxInput
                        onChange = {(value)=>{
                            setComment(value);
                        }}
                        errorMessage={dataError.comment}
                        onFocus = {()=>{
                            setDataError({
                                ...dataError,
                                comment: ""
                            })
                        }}
                    />
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
                    <Divider
                        height = {0}
                        marginVertical = "4%"
                    />
                    <Text style={{...texts.subtitleSection, marginBottom: "2%", paddingHorizontal: "5%", width: "80%"}}>
                        Si tuviste un problema con la aplicación, contáctanos al siguiente número:
                    </Text>
                    <Divider
                        height = {0}
                        marginVertical = "1%"
                    />
                    <CustomButton
                        title={supportPhone}
                        color= "black"
                        height = {50}
                        marginBottom = "5%"
                        leading={
                            <View
                                style = {{
                                    marginRight: "2%"
                                }}
                            >
                                <SvgXml 
                                    xml = {phoneIcon} 
                                    width = {RFValue(25)}
                                    height = {RFValue(25)}
                                />
                            </View>
                        }
                        onPress={() => {
                            Linking.canOpenURL(`tel:${supportPhone}`)
                            .then((supported) => {
                                if (!supported) {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Lo sentimos',
                                        text2: 'No se pudo abrir el teléfono',
                                        position: "bottom"
                                    });
                                } else {
                                    try{
                                        Linking.openURL(`tel:${supportPhone}`);
                                    }catch(_){
                                        Toast.show({
                                            type: 'error',
                                            text1: 'Lo sentimos',
                                            text2: 'No se pudo abrir el teléfono',
                                            position: "bottom"
                                        });
                                    }
                                }
                            })
                            .catch((err) => {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Lo sentimos',
                                    text2: 'No se pudo abrir el teléfono',
                                    position: "bottom"
                                });
                            });

                        }}
                    />
                    <CustomButton
                        title={"Enviar incidencia"}
                        color= {colors.accentColor}
                        marginBottom = "10%"
                        onPress={sendIncident}
                    />
                    <Info
                        loading={loadingState.loading || storesListLoading}
                        info={loadingState.info}
                        display={loadingState.display}
                    />
                </KeyboardAwareScrollView>
            </SafeAreaView>
            <SuccessBottomSheet
                title = "Incidencia enviada"
                buttonText = "Cerrar"
                visible = {successVisible}
                changeVisible = {(value) => {
                    setSuccessVisible(value);
                    navigation.pop();
                }}
            />
        </>
    )           
}