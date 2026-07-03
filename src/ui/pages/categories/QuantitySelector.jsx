import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const QuantitySelector = (props) => {
    const {
        onReduce,
        quantity = 1,
        onAdd
    } = props;
    return (
        <View
            style={{
                width: screenWidth * 0.4,
                flexDirection: "row",
                paddingVertical: "8%",
                borderRadius: 10,
                borderWidth: 1.0,
                borderColor: "#A8A8A8",
                paddingHorizontal: "10%",
                justifyContent: "space-between"
            }}
        >
            <TouchableOpacity
                onPress={onReduce}
            >
                <Text
                    style={{
                        color: "#101010",
                        fontFamily: "product-sans-regular",
                        fontSize: 20,
                    }}
                >
                    -
                </Text>
            </TouchableOpacity>
            <Text
                style={{
                    color: "#101010",
                    fontFamily: "product-sans-regular",
                    fontSize: 20,
                }}
            >
                {quantity}                
            </Text>
            <TouchableOpacity
                onPress={onAdd}
            >
                <Text
                    style={{
                        color: "#101010",
                        fontFamily: "product-sans-regular",
                        fontSize: 20,
                    }}
                >
                    +
                </Text>
            </TouchableOpacity>
        </View>
    )
}
