import React from 'react'
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {CustomImage} from '../../general/CustomImage';
import { texts } from '../../../utils/styles';
import { useSelector } from 'react-redux';

const screenWidth = Dimensions.get('window').width;

export const PaymentListElement = (props) => {
    const {
        showTrailing = true,
        justifyContent = "flex-start",
        onChangeCard
    } = props;
    const {cardsRegistered} = useSelector(state => {
        return state.payment;
    });
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
        <View
            style={{
                paddingHorizontal: "5%",
                flexDirection: "row",
                height: screenWidth * 0.1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    width: screenWidth * 0.1,
                }}
            >
                <CustomImage
                    source={getTypeFromName(cardsRegistered[0].card_type)}
                    width={screenWidth * 0.08}
                    resizeMode="contain"
                    height={20}
                    borderRadius={100}
                />
            </View>
            <View
                style={{
                    width: screenWidth * 0.6,
                    paddingHorizontal: screenWidth * 0.04
                }}
            >
                <Text style={texts.paymentNumber}>{hideText(cardsRegistered[0].card_number)}</Text>
            </View>
            {showTrailing && <View
                style={{
                    width: screenWidth * 0.2
                }}
            >
                <TouchableOpacity
                    onPress={onChangeCard}
                >
                    <Text style={texts.payTextBold}>Cambiar</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}
