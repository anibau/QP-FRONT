import React, {useRef, useEffect, useState} from 'react'
import {Text, View, Dimensions} from 'react-native';
import Container from '../../ui/container/Container';
import { SafeAreaView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import { useSelector } from 'react-redux';
import { TendOption } from '../../ui/pages/categories/TendOption';
import { ParkingControlSheet } from '../../ui/pages/categories/ParkingControlSheet';
import { store } from '../../redux/store/store';
import { ActionChangeParkingCtrlVisibility} from "../../redux/actions";
import { authenticatedCategoriesStack } from '../../config/navigation';
import { Info } from '../../ui/modal/Info';
import {getParkingList} from '../../controllers/shop_controller';

const screenWidth = Dimensions.get('window').width;

export const ParkingPage = ({navigation}) => {
    const parkingControlRef = useRef(null);
    const displayParkingControlOld = useRef(Boolean(false));

    const state = useSelector(state => {
        return state.application;
    });
    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const general = useSelector(state => {
        return state.general;
    });

    const [parkingList, setParkingList] = useState([]);

    const [parkingItem, setParkingItem] = useState(null);
    
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

    const getParking = async() => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await getParkingList();
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(!resp.hasError){
            setParkingList(resp.data);
        }
    }

    useEffect(() => {
        getParking();
    }, []);

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
                            title="Establecimientos autorizados"
                            onPress={()=>{
                                navigation.pop();
                            }}
                        />
                        <Text style={{...texts.titleSection, marginBottom: "2%", paddingHorizontal: "5%", marginTop: "5%"}}>
                            Parking
                        </Text>
                        <Text style={{...texts.subtitleSection, marginBottom: '8%', paddingHorizontal: "5%"}}>
                            Te mostramos la lista de tiendas con las que trabaja QuickPay
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                width: "100%",
                            }}
                        >
                            {
                                parkingList.map((element, index)=> <TendOption
                                    key={element.id}
                                    url={element.parking_url}
                                    marginRight={index % 2 == 0 ? screenWidth * 0.05 : 0}
                                    marginLeft={index % 2 == 0 ? screenWidth * 0.05 : 0}
                                    marginBottom={index % 2 == 0 ? "5%" : 0}
                                    onPress={()=>{
                                        setParkingItem(element)
                                        store.dispatch(ActionChangeParkingCtrlVisibility({
                                            parkingControlVisible: true
                                        }));
                                    }}
                                />)
                            }
                        </View>
                        <Info
                            loading={loadingState.loading}
                            info={loadingState.info}
                            display={loadingState.display}
                        />
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </Container>
            <ParkingControlSheet
                item={parkingItem}
                sheetRef={parkingControlRef}
                onClose={()=>{
                    store.dispatch(ActionChangeParkingCtrlVisibility({
                        parkingControlVisible: false
                    }));
                }}
                onSelect={()=>{
                    store.dispatch(ActionChangeParkingCtrlVisibility({
                        parkingControlVisible: false
                    }));
                    setTimeout(()=>{
                        navigation.push(authenticatedCategoriesStack.parkingSelect, {
                            title: parkingItem.parking_name,
                            url: parkingItem.parking_url
                        });
                    }, 500);
                }}
            />
        </>
    )
}
