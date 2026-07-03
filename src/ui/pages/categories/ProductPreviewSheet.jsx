import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../../utils/styles';
import {NetworkImage} from '../../general/NetworkImage';
import {QuantitySelector} from '../categories/QuantitySelector';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const ProductPreviewSheet = (props) => {

    const {
        product = {},
        onClose,
        onSelect,
        visible,
    } = props;

    const [itemsNumber, setItemsNumber] = useState(1);
    
    const bottomSheetRef = useRef(null);
    
    useEffect(() => {
        if (visible) {
            bottomSheetRef.current?.present();
        } else {
            setItemsNumber(1);
            bottomSheetRef.current?.dismiss();
        }
    }, [visible]);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['60%']}
            onDismiss={() => {
                setItemsNumber(1);
                onClose();
            }}
            enablePanDownToClose
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    onPress={() => {
                        setItemsNumber(1);
                        onClose();
                    }}
                    pressBehavior="close"
                />
            )}
        >
            <BottomSheetView>
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: screenHeight * 0.02,
                    height: screenHeight * 0.6,
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
                            setItemsNumber(1);
                            onClose();
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
                        flex: 1,
                        justifyContent: "space-between"
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: screenWidth * 0.05,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{...texts.titleBottomSheet, marginBottom: "5%", fontSize: 25}}>
                            {product.product_name}
                        </Text>
                        <View
                            style={{
                                width: screenWidth * 0.9,
                                flexDirection: "row"
                            }}
                        >
                            <NetworkImage
                                url={product.product_path}
                                width={screenWidth * 0.45}
                                resizeMode="contain"
                                height={screenWidth * 0.45}
                            />
                            <View
                                style={{
                                    width: screenWidth * 0.45,
                                    paddingLeft: screenWidth * 0.05
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#101010",
                                        fontFamily:"product-sans-regular",
                                        fontSize: 15,
                                        textAlign: "center",
                                        marginBottom: "5%"
                                    }}
                                >
                                    {product.product_descripcion}
                                </Text>
                                <Text
                                    style={{
                                        color: "#FF3128",
                                        fontFamily: "product-sans-bold",
                                        fontSize: 30,
                                        textAlign: "center",
                                        marginBottom: 15
                                    }}
                                >
                                    {`S/${product.product_price}`}
                                </Text>
                                <QuantitySelector
                                    onReduce={()=>{
                                        if(itemsNumber > 1){
                                            setItemsNumber(itemsNumber - 1);
                                        }
                                    }}
                                    quantity={itemsNumber}
                                    onAdd={()=>{
                                        setItemsNumber(itemsNumber + 1);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={()=>{
                            const itemsNumberCurrent = itemsNumber;
                            setItemsNumber(1);
                            onSelect({
                                ...product,
                                itemsSelected: itemsNumberCurrent
                            })
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
                                style={texts.payText}
                            >
                                Agregar al carrito
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
}