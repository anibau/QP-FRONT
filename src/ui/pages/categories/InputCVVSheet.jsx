import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../../utils/styles';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {PaymentListElement} from '../categories/PaymentListElement';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CELL_COUNT = 3;

export const InputCVVSheet = (props) => {

    const {
        onClose,
        visible,
        changeVisible
    } = props;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [propsPinPut, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const {cardsRegistered} = useSelector(state => {
        return state.payment;
    });
    
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
                        paddingHorizontal: screenWidth * 0.05,
                    }}
                >
                    <Text style={{...texts.bigTitleBottomSheet, marginBottom: "5%"}}>
                        Ingresar CVV dinámico
                    </Text>
                    {Boolean(cardsRegistered.length) && <PaymentListElement
                        showTrailing={false}
                        justifyContent={"center"}
                    />}
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        flex: 1
                    }}
                >   
                    <CodeField
                        ref={ref}
                        {...propsPinPut}
                        value={value}
                        caretHidden={false}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        onPress={()=>{
                        }}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                        )}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            changeVisible(false);
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
                                Validar y continuar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20, marginHorizontal: "25%"},
    cell: {
        width: 40,
        height: 50,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1.0,
        borderRadius: 10,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
})