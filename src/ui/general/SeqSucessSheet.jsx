/* import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts} from '../../utils/styles';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import {CustomImage} from './CustomImage';

const AnimatedView = Animated.View;

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const SeqSuccessSheet = (props) => {

    const {
        title = '',
        onClose,
        onAccept,
        sheetRef,
        buttonText = ''
    } = props;

    const state = useSelector(state => {
        return state.application;
    });

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
                flexDirection: 'column',
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
                    marginTop={screenHeight * 0.05}
                />
                <BottomSheetButton
                    onPress={onAccept}
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
                </BottomSheetButton>
            </View>
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