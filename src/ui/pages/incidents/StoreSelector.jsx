import React, { useState, useEffect, useRef } from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { RFValue } from 'react-native-responsive-fontsize';
import { sh, sw } from '../../../utils/utils';
import { arrowForwardIcon, dropdownIcon } from '../../../utils/icons';
import { SvgXml } from 'react-native-svg';
import { texts, colors } from '../../../utils/styles';

export const StoreSelector = (props) => {
    const {
        onSelection,
        items = [],
        itemSelected
    } = props;

    const [visible, setVisible] = useState(false);
    const bottomSheetRef = useRef(null);
    
    useEffect(() => {
        if (visible) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.dismiss();
        }
    }, [visible]);
    
    return (
        <>
        <TouchableOpacity
            style = {{
                width: '90%',
                marginHorizontal: '5%',
                borderWidth: 1.0,
                height: sh * 0.09,
                borderColor: "#C8C8C8",
                borderRadius: 10,
                paddingHorizontal: "2%",
                marginBottom: "5%",
                flexDirection: "column",
                paddingVertical: sh * 0.012,
                justifyContent: "space-between"
            }}
            onPress={()=>{
                setVisible(true);
            }}
        >
            <Text
                style={texts.subtitle}
            >
                Seleccione la tienda
            </Text>
            <View
                style = {{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%"
                }}
            >
                <Text
                    style = {{
                        fontSize: RFValue(14),
                        color: itemSelected ? "black" : colors.greyStrong
                    }}
                >
                    {itemSelected ? itemSelected.company_name : "Seleccione"}
                </Text>
                <SvgXml 
                    xml = {dropdownIcon} 
                    width = {RFValue(16)}
                    height = {RFValue(16)}
                />
            </View>
        </TouchableOpacity>
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['45%']}
            onDismiss={() => setVisible(false)}
            enablePanDownToClose
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    onPress={() => setVisible(false)}
                    pressBehavior="close"
                />
            )}
        >
            <BottomSheetView
                style={{
                    paddingTop: sh * 0.02,
                    height: sh * 0.45,
                    width: sw,
                    flexDirection: 'column',
                    backgroundColor: "white"
                }}
            >
                <ScrollView>
                    {
                        items.map((e)=>(
                            <TouchableOpacity
                                key={e.id.toString()}
                                onPress  = {()=>{
                                    onSelection(e);
                                    setVisible(false);
                                }}
                                style = {{
                                    width: "100%",
                                    height: sh * 0.08,
                                    paddingHorizontal: "5%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Text
                                    style = {{
                                        color: "black",
                                        fontSize: RFValue(16)
                                    }}
                                >
                                    {e.company_name}
                                </Text>
                                <SvgXml 
                                    xml = {arrowForwardIcon} 
                                    width = {RFValue(16)}
                                    height = {RFValue(16)}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    </>
  )
}
