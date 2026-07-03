import React, { useEffect, useRef } from 'react'
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../../utils/styles';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {bagIcon} from '../../../utils/icons';
import { SvgXml } from 'react-native-svg';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const ConfirmBottomSheet = (props) => {
    const {
        title = "",
        subtitle = "",
        buttonText = "",
        visible,
        changeVisible,
        onComplete
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
                    <Text style={{...texts.bigTitleBottomSheet, marginBottom: "5%"}}>
                        {title}
                    </Text>
                    <Text>
                        {subtitle}
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
                    <View
                        style = {{
                            marginTop: "10%"
                        }}
                    >
                        <SvgXml 
                            xml = {bagIcon} 
                            width = {screenWidth * 0.2}
                            height = {screenWidth * 0.2}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={onComplete}
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
                                style={texts.generalHighlighTextBold}
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
