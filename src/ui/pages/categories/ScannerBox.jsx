import React from 'react';
import {View, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const ScannerBox = () => {
  return <View
    style = {{
      width: screenWidth,
      height: screenHeight,
      position: "absolute",
      top: 0,
      left: 0
    }}
  >
    <View
      style={{
        width: screenWidth,
        height: screenHeight * 0.1,
      }}
    ></View>
    <View
      style = {{
        width: screenWidth,
        height: screenHeight * 0.7 - screenWidth * 0.6,
        flexDirection: "row",
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <View
        style = {{
          width: screenWidth * 0.2,
          height: screenHeight * 0.7 - screenWidth * 0.6,
        }}
      >
      </View>
      <View
        style = {{
          width: screenWidth * 0.6,
          height: screenHeight * 0.7 - screenWidth * 0.6,
          borderBottomColor: "white",
          borderBottomWidth: 1.0
        }}
      >
      </View>
      <View
        style = {{
          width: screenWidth * 0.2,
          height: screenHeight * 0.7 - screenWidth * 0.6,
        }}
      >
      </View>
    </View>
    <View
      style = {{
        width: screenWidth,
        height: screenWidth * 0.6,
        flexDirection: "row"
      }}
    >
      <View
        style={{
          width: screenWidth * 0.2,
          height: screenWidth * 0.6,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRightColor: "white",
          borderRightWidth: 1.0
        }}
      >
      </View>
      <View
        style={{
          width: screenWidth * 0.6,
          height: screenWidth * 0.6,
        }}
      >
      </View>
      <View
        style={{
          width: screenWidth * 0.2,
          height: screenWidth * 0.6,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderLeftColor: "white",
          borderLeftWidth: 1.0
        }}
      >
      </View>
    </View>
    <View
      style = {{
        width: screenWidth,
        height: screenHeight * 0.2,
        flexDirection: "row",
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <View
        style = {{
          width: screenWidth * 0.2,
          height: screenHeight * 0.2,
        }}
      >
      </View>
      <View
        style = {{
          width: screenWidth * 0.6,
          height: screenHeight * 0.2,
          borderTopColor: "white",
          borderTopWidth: 1.0
        }}
      >
      </View>
      <View
        style = {{
          width: screenWidth * 0.2,
          height: screenHeight * 0.2,
        }}
      >
      </View>
    </View>  
  </View>;
};