import React, {useEffect, useState} from 'react';
import {Text, View,} from 'react-native';
import Container from '../../ui/container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {MainAppBar} from '../../ui/general/MainAppBar';
import {texts, colors} from '../../utils/styles';
import {CustomButton} from '../../ui/general/CustomButton';
import {authenticatedGuardHomeStack, authenticatedGeneralStack} from '../../config/navigation';
import {scannIcon} from '../../utils/icons';
import { SvgXml } from 'react-native-svg';
import { RFValue } from 'react-native-responsive-fontsize';

export const CategoriesGuardPage = ({navigation}) => {

    const [navigating, setNavigating] = useState(false);

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
                        justifyContent: 'flex-start',
                        alignContent: 'center',
                        alignItems: 'flex-start',
                        flex: 1
                    }}
                    enableOnAndroid
                >
                    <MainAppBar
                        title = {"Casas & Ideas - Paseo la República"}
                        marginBottom={"5%"}
                        isGuard
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
                        Código de venta
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "5%", lineHeight: 23}}>
                        Escanea el código de venta que se muestra dentro del aplicativo del comprador, verifica si la compra coincide con los productos
                    </Text>
                    {/* <View
                        style = {{
                            width: 100,
                            height: 100,
                            ...generateBoxShadowStyle(-2, 4, '#171717', 0.2, 3, 4, '#171717')
                        }}
                    >

                    </View> */}
                    <View
                        style = {{
                            position: "absolute",
                            bottom: "5%",
                            width: "100%"
                        }}
                    >
                        <CustomButton
                            title={"Escanear código"}
                            color={colors.accentColor}
                            leading={
                                <View
                                    style={{
                                        marginRight: '3%'
                                    }}
                                >
                                    <SvgXml 
                                        xml = {scannIcon} 
                                        width = {RFValue(20)}
                                        height = {RFValue(20)}
                                    />
                                </View>
                            }
                            onPress={() => {
                                if(!navigating){
                                    setNavigating(true);
                                    navigation.push(authenticatedGuardHomeStack.scann, {
                                        shop: {},
                                        locale: {}
                                    });
                                }
                            }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        </>
    )           
}
