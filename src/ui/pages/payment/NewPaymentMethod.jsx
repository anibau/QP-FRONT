import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {texts} from '../../../utils/styles';
import { MaterialIcons } from '@expo/vector-icons';

export const NewPaymentMethod = (props) => {
    const {onPress} = props;
    return (
        <TouchableOpacity
            style={{
                width: "90%",
                marginHorizontal: "5%",
                flexDirection: "row",
                backgroundColor: "#EAEAEA",
                borderRadius: 10,
                paddingVertical: "4%",
                paddingHorizontal: "5%",
                justifyContent: "space-between",
            }}
            onPress = {onPress}
            >
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    backgroundColor: "#EAEAEA",
                    borderRadius: 10,
                    paddingHorizontal: "5%",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style = {{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <View
                        style = {{
                            marginRight: "4%",
                            alignItems: "center"
                        }}
                    >
                        <MaterialIcons
                            name="credit-card"
                            size={24}
                        />
                    </View>
                    <Text style={texts.paymentMethodText}>Agregar método de pago</Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color="black"
                    size={24}
                /> 
            </View>
        </TouchableOpacity>
    );
};
