import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const AppBar = (props) => {
  const {
    title = '',
    trailing = null,
    backgroundColor = "white",
    darkMode = false,
    onPress,
  } = props;

  return (
    <View
      style={{
        width: screenWidth,
        justifyContent: "flex-start",
        paddingLeft: screenWidth * 0.05,
        flexDirection: "row",
        alignItems: 'center',
        borderColor: "#4D4D4D",
        borderBottomWidth: 0.5,
        height: screenHeight * 0.1,
        backgroundColor
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            height: screenHeight * 0.03,
            alignItems: "center",
          }}
        >
          {/* 🔁 ICON MIGRADO */}
          <MaterialIcons
            name="arrow-back-ios"
            size={screenWidth * 0.04}
            color={darkMode ? 'white' : 'black'}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: screenWidth * 0.88,
              alignItems: "center"
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: darkMode ? "white" : "#4D4D4D",
                fontFamily: "product-sans-bold",
                fontSize: 15,
                fontWeight: '700',
                marginLeft: "3%",
                width: "80%",
              }}
            >
              {title}
            </Text>

            {trailing}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
