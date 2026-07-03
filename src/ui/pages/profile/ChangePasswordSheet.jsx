import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {texts} from '../../../utils/styles';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomTextInput } from '../../general/CustomTextInput';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const ChangePasswordSheet = (props) => {

    const {
        onActivate,
        visible,
        changeVisible
    } = props;
    const bottomSheetRef = useRef(null);
    
    useEffect(() => {
        if (visible) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [visible]);
    
    const [data, setData] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: '',
    });
    const [dataError, setDataError] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: '',
    });
    const [passwordVisibility, setPasswordVisibility] = useState({
        first: false,
        second: false,
        third: false,
    })

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['65%']}
            onDismiss={() => changeVisible(false)}
            enablePanDownToClose
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    onPress={() => changeVisible(false)}
                    pressBehavior="close"
                />
            )}
        >
            <BottomSheetView
            visible={visible}
            >
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: screenHeight * 0.02,
                    height: Boolean(dataError.newPassword) ?  screenHeight * 0.6 : screenHeight * 0.55,
                    flexDirection: 'column',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}
                >
                <View
                    style={{
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        paddingHorizontal: screenWidth * 0.05
                    }}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            changeVisible(false);
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 2,
                                backgroundColor: "red",
                                borderRadius: 100
                            }}
                        >   
                            <MaterialIcons name="close" color="white" size={screenWidth * 0.04} /> 
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        paddingHorizontal: screenWidth * 0.05
                    }}
                >
                    <Text style={{...texts.titleBottomSheet, marginBottom: "5%"}}>
                        Nueva contraseña
                    </Text>
                </View>
                <CustomTextInput
                    autoCapitalize = "none"
                    isPasswordInput
                    marginHorizontal = "5%"
                    value={data.currentPassword}
                    errorMessage={dataError.currentPassword}
                    showPassword={passwordVisibility.first}
                    title = {"Contraseña actual"}
                    onChange={(newValue) => {
                        setData({
                            ...data,
                            currentPassword: newValue
                        })
                    }}
                    onFocus={() => setDataError({
                        ...dataError,
                        currentPassword: ''
                    })}
                    onTrailingPressed={()=>{
                        setPasswordVisibility({
                            ...data,
                            first: !passwordVisibility.first
                        });
                    }}
                />
                <CustomTextInput
                    autoCapitalize = "none"
                    isPasswordInput
                    marginHorizontal = "5%"
                    value={data.newPassword}
                    showPassword={passwordVisibility.second}
                    errorMessage={dataError.newPassword}
                    title = {"Nueva contraseña"}
                    onChange={(newValue) => {
                        setData({
                            ...data,
                            newPassword: newValue
                        })
                    }}
                    onFocus={() => setDataError({
                        ...dataError,
                        newPassword: ''
                    })}
                    onTrailingPressed={()=>{
                        setPasswordVisibility({
                            ...data,
                            second: !passwordVisibility.second
                        });
                    }}
                />
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        flex: 1,
                    }}
                >
                    <CustomTextInput
                        autoCapitalize = "none"
                        isPasswordInput
                        marginHorizontal = "5%"
                        errorMessage={dataError.repeatPassword}
                        value={data.repeatPassword}
                        showPassword={passwordVisibility.third}
                        title = {"Repetir contraseña"}
                        onFocus={() => setDataError({
                            ...dataError,
                            repeatPassword: ''
                        })}
                        onChange={(newValue) => {
                            setData({
                                ...data,
                                repeatPassword: newValue
                            });
                        }}
                        onTrailingPressed={()=>{
                            setPasswordVisibility({
                                ...data,
                                third: !passwordVisibility.third
                            });
                        }}
                    />
                    <TouchableOpacity
                        onPress={async () =>  {
                            if(data.newPassword !== data.repeatPassword){
                                setDataError({
                                    ...dataError,
                                    newPassword : "Las contraseñas deben coincidir",
                                    repeatPassword: "Las contraseñas deben coincidir"
                                });
                                return;
                            }
                            onActivate(data.currentPassword, data.repeatPassword);
                        }}
                    >
                        <View
                            style = {{
                                backgroundColor: "#F3F3F3",
                                flexDirection: "row",
                                justifyContent: "center",
                                paddingVertical: '6%',
                            }}
                        >
                            <Text
                                style={texts.generalHighlighText}
                            >
                                Confirmar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}