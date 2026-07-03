import React, { useEffect, useRef } from 'react'
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../utils/styles';
import {CustomImage} from './CustomImage';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const SuccessBottomSheet = (props) => {
    const {
        title = "",
        buttonText = "",
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
    
    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['45%']}
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
            <BottomSheetView>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: screenHeight * 0.02,
                    height: screenHeight * 0.45,
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
                    <Text style={{...texts.bigTitleBottomSheet, marginBottom: "5%"}}>
                        {title}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <CustomImage
                        source={require("../../assets/images/circle-checked.png")}
                        width={screenWidth * 0.2}
                        resizeMode="contain"
                        height={screenWidth * 0.2}
                        marginTop={screenHeight * 0.03}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            changeVisible(false);
                        }}
                    >
                        <View
                            style = {{
                                backgroundColor: "#F3F3F3",
                                width: screenWidth,
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
            </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}
