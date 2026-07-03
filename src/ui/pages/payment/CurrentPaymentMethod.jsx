import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {texts} from '../../../utils/styles';
import { MaterialIcons } from '@expo/vector-icons';
import {CustomImage}  from '../../general/CustomImage';

export const CurrentPaymentMethod = (props) => {
    const {
        onPress,
        onDelete,
        onFav,
        creditCard
    } = props;

    const hideText = (text) => {
        let newText = text.substring(text.length - 4, text.length);
        return "**** **** **** " + newText;
    }

    const getTypeFromName = (name) => {
        if(name === "visa"){
            return require("../../../assets/icons/stp_card_visa.png");
        }else if (name === "mastercard"){
            return require("../../../assets/icons/stp_card_mastercard.png");
        }else if (name === "jcb"){
            return require("../../../assets/icons/stp_card_jcb.png");
        }else if (name === "discover"){
            return require("../../../assets/icons/stp_card_discover.png");
        }else if (name === "dinersclub" || name === "diners"){
            return require("../../../assets/icons/stp_card_diners.png");
        }else if (name === "amex"){
            return require("../../../assets/icons/stp_card_amex.png");
        }else{
            return require("../../../assets/icons/stp_card_unknown.png");
        }
    }
    return (
        <TouchableOpacity
            style={{
                width: "90%",
                marginHorizontal: "5%",
                flexDirection: "row",
                borderRadius: 10,
                paddingVertical: "4%",
                justifyContent: "space-between",
                marginBottom: "3%",
                borderColor: "#C8C8C8",
                borderWidth: 1.0,
                paddingRight: "5%"
            }}
            onPress = {onPress}
            >
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    borderRadius: 10,
                    paddingLeft: "5%",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style = {{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <CustomImage
                        source={getTypeFromName(creditCard.card_type)}
                        width={30}
                        resizeMode="contain"
                        height={20}
                        marginRight = "3%"
                    />
                    <Text style={{...texts.paymentMethodText, letterSpacing: 0.5}}>{hideText(creditCard.card_number)}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                    }}
                >
                        {creditCard.card_default === 1 ? 
                        <MaterialIcons name="star" color="#FFD400" size={24} /> :
                        <MaterialIcons name="star-outline" color="black" size={24} /> }
                        <View
                            style = {{
                                marginLeft: "10%"
                            }}
                        >
                            <MaterialIcons name="delete-outline" color="red" size={24} /> 
                        </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
