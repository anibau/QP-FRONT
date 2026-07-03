/* import React, { useEffect, useRef } from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../../utils/styles';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const AnimatedView = Animated.View;

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const ConfirmFavCardSheet = (props) => {

    const {
        onClose,
        onActivate,
        sheetRef,
        title = "",
        subtitle = "",
        buttonText = "",
        image
    } = props;

    let fall = new Animated.Value(1);
    
    const renderShadow = () => {
        const animatedShadowOpacity = Animated.interpolateNode(fall, {
          inputRange: [0, 1],
          outputRange: [0.5, 0],
        })
        return (
          <AnimatedView
            pointerEvents="none"
            style={[
              styles.shadowContainer,
              {
                opacity: animatedShadowOpacity,
              },
            ]}
            onPress={onClose}
          />
        )
    }
    const renderContent = () => {
        return <View
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
                <BottomSheetButton
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
                </BottomSheetButton>
            </View>
            <View
                style={{
                    paddingHorizontal: screenWidth * 0.05
                }}
            >
                <Text style={{...texts.bigTitleBottomSheet, marginBottom: "5%"}}>
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
            <BottomSheetButton
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
            </BottomSheetButton>
        </View>
    }
    return (
        <>
            {renderShadow()}
            <BottomSheet
                callbackNode={fall}
                initialSnap={1}
                ref={sheetRef}
                snapPoints={[screenHeight * 0.5, 0]}
                borderRadius={20}
                isBackDrop
                renderContent={renderContent}
                backDropColor="red"
                enabledInnerScrolling={false}
            />
        </>
    )
}
const styles = StyleSheet.create({
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },
}) */