import React, {useRef, useEffect, useState} from 'react'
import {Text, View} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import { useSelector } from 'react-redux';
import {BarcodeInput} from '../../ui/pages/categories/BarcodeInput';
import {AvailableSeats} from '../../ui/pages/categories/AvailableSeats';
import {FixedButton} from '../../ui/general/FixedButton';
import { authenticatedCategoriesStack } from '../../config/navigation';
import {NetworkTrailing} from '../../ui/general/NetworkTrailing';
import {Spacer} from '../../ui/general/Spacer';

export const ParkingSelect = ({navigation, route}) => {

    const {
        title = "",
        url = ""
    } = route.params;

    const parkingControlRef = useRef(null);
    const displayParkingControlOld = useRef(Boolean(false));

    const [navigating, setNavigating] = useState(false);

    const state = useSelector(state => {
        return state.application;
    });

    const [barcodeText, setBarcodeText] = useState("");
    
    useEffect(() => {
        if (displayParkingControlOld.current != state.parkingControlVisible) {
            if(state.parkingControlVisible){
                if(parkingControlRef.current) parkingControlRef.current.snapTo(0);
            }else{
                if(parkingControlRef.current) parkingControlRef.current.snapTo(1);
            }
        }
        displayParkingControlOld.current = Boolean(state.parkingControlVisible);
    }, [state.parkingControlVisible]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
        });
    }, [navigation]);

    return (
        <>
            <Container>
                <SafeAreaView>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{
                            justifyContent: 'flex-start',
                            alignContent: 'center',
                            alignItems: 'flex-start',
                        }}
                        enableOnAndroid
                    >
                        <AppBar
                            title={title}
                            onPress={()=>{
                                navigation.pop();
                            }}
                            trailing ={
                                <NetworkTrailing
                                    url={url}
                                    width={50}
                                    resizeMode="contain"
                                    height={50}
                                    borderRadius={100}
                                />
                            }
                        />
                        <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%", marginTop: "10%"}}>
                            Selección de espacio
                        </Text>
                        <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "5%"}}>
                            Selecciona tu espacio de parqueo
                        </Text>
                        <AvailableSeats
                            seats={20}
                        />
                        <BarcodeInput
                            placeholder={"Ingresar nro de ticket"}
                            value={barcodeText}
                            onChange={(newValue)=>{
                                setBarcodeText(newValue);
                            }}
                            marginBottom="10%"
                            marginTop="10%"
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <FixedButton
                onPress={() => {
                    if(!navigating){
                        setNavigating(true);
                        navigation.push(authenticatedCategoriesStack.parkingPay, {
                            title: title,
                            url: url
                        })
                    }
                }}
                title = {"Ejecutar pago"}
            />
        </>
    )
}
