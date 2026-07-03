import React from 'react';
import {View} from 'react-native';
import {CustomImage} from '../../general/CustomImage';

export const AllowedPaymentMethods = () => {
  return (
    <View
        style = {{
            flexDirection: "row",
            padding: "5%"
        }}
        >
        <CustomImage
            source={require("../../../assets/icons/stp_card_visa.png")}
            width={30}
            resizeMode="contain"
            height={20}
            marginRight = "3%"
        />
        <CustomImage
            source={require("../../../assets/icons/stp_card_mastercard.png")}
            width={30}
            resizeMode="contain"
            height={20}
            marginRight = "3%"
        />
        <CustomImage
            source={require("../../../assets/icons/stp_card_amex.png")}
            width={30}
            resizeMode="contain"
            height={20}
            marginRight = "3%"
        />
        {/* <CustomImage
            source={require("../../../assets/icons/stp_card_diners.png")}
            width={30}
            resizeMode="contain"
            height={20}
        /> */}
    </View>
    );
};
