import React, { memo } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { TouchableOpacity as RNGHTouchableOpacity } from "react-native-gesture-handler";

const BottomSheetButton = ({ children, ...otherProps }) => {
  if (Platform.OS === "android") {
    return (
      <RNGHTouchableOpacity {...otherProps}>{children}</RNGHTouchableOpacity>
    );
  }

  return <TouchableOpacity {...otherProps}>{children}</TouchableOpacity>;
};

export default memo(BottomSheetButton); 