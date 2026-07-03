import React, { useEffect, useRef } from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../utils/styles';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const RequestSheet = (props) => {

    const {
        onClose,
        onActivate,
        title = "",
        subtitle = "",
        buttonText = "",
        image,
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
            onDismiss={() => onClose(false)}
            enablePanDownToClose
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    onPress={() => onClose(false)}
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
                        {title}
                    </Text>
                    <Text style={{...texts.subtitleSection, marginBottom: "10%"}}>
                        {subtitle}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1
                    }}
                >
                    {image}
                </View>
                <TouchableOpacity
                    onPress={onActivate}
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
                            {buttonText}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}