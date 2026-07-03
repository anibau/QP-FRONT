import React, { useEffect, useRef } from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../../utils/styles';
import {NearTendOption} from '../categories/NearTendOption';
import {ScrollView as AndScrollView} from 'react-native-gesture-handler';
import {getDistanceStrFromDouble} from '../../../utils/utils';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const NearTendsSheet = (props) => {

    const {
        onClose,
        onSelect,
        shop,
        locales = [],
        visible,
    } = props;
    
    const bottomSheetRef = useRef(null);
    
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
            <BottomSheetView
                style={{
                    backgroundColor: 'white',
                    paddingTop: screenHeight * 0.02,
                    height: screenHeight * 0.5,
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
                        {shop.company_name}
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: "10%"}}>
                        ¿En qué tienda te encuentras?
                    </Text>
                </View>
                <AndScrollView
                    style={{
                        height: "30%"
                    }}
                >
                    {
                        locales.map((element, index)=> <NearTendOption
                            key={element.id}
                            title = {`${element.branch_direction} - ${element.branch_name} - ${element.branch_reference}`}
                            distance = {getDistanceStrFromDouble(element.distancia)}
                            onPress={ () => {
                                onSelect(element);
                            }}
                        />)
                    }
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
            </BottomSheetView>
        </BottomSheetModal>
    )
}