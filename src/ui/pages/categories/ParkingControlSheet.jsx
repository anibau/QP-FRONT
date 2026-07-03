import React, { useEffect, useRef } from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../../utils/styles';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {ParkingOption} from '../categories/ParkingOption';
import {ScrollView as AndScrollView} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const ParkingControlSheet = (props) => {

    const {
        onClose,
        onSelect,
        sheetRef,
        item,
        visible = false
    } = props;

    const bottomSheetRef = useRef(sheetRef || null);
    
    useEffect(() => {
        if (visible) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [visible]);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['50%']}
            onDismiss={onClose}
            enablePanDownToClose
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    onPress={onClose}
                    pressBehavior="close"
                />
            )}
        >
            <BottomSheetView>
                <View
                    style={{
                        backgroundColor: 'white',
                        paddingTop: screenHeight * 0.02,
                        height: screenHeight * 0.5,
                        flexDirection: 'column'
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
                            onPress={onClose}
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
                                <MaterialIcons
                                    name="close"
                                    color="white"
                                    size={screenWidth * 0.04}
                                /> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: screenWidth * 0.05
                        }}
                    >
                        <Text style={{...texts.titleBottomSheet, marginBottom: "5%"}}>
                            {item?.parking_name}
                        </Text>
                        <Text style={{...texts.subtitleSection, marginBottom: "10%"}}>
                            ¿En qué estacionamiento te encuentras?
                        </Text>
                    </View>
                    <AndScrollView
                        style={{
                            height: "30%"
                        }}
                    >
                        <ParkingOption
                            onPress={onSelect}
                            title= "Av. Prolongación Paseo de la República S/N - Local LI203 - 2do Nivel "
                            distance="Distancia: 0.5 kilometros"
                        />
                    </AndScrollView>
                    <TouchableOpacity
                        onPress={onClose}
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
                                Cerrar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}
const styles = StyleSheet.create({
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
})