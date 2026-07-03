import React from 'react'
import {Text, View, Dimensions} from 'react-native';
import { texts } from '../../../utils/styles';
import {ProductImage} from '../../general/ProductImage';

const screenWidth = Dimensions.get('window').width;

export const ReceiptListElement = (props) => {
    const {
        product,
    } = props;

    return (
        <View
            style={{
                flexDirection: "row",
                height: screenWidth * 0.1,
                marginBottom: 5,
                width: "90%",
                marginHorizontal: "5%",
                marginTop: 5
            }}
        >
            <ProductImage
                url = {product.imagen}
                size = {screenWidth * 0.1}
            />
            <View
                style={{
                    width: screenWidth * 0.7,
                    justifyContent: "space-between",
                    paddingHorizontal: screenWidth * 0.02
                }}
            >
                <Text style={{...texts.subtitleSection, marginBottom: "2%"}}>{product.invoice_det_product_name}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text style={texts.payTextBold}>{`S/${product.invoice_det_product_price * product.invoice_det_product_amount}`}</Text>
                    <Text style={texts.amountText}>{`Cant: ${product.invoice_det_product_amount}`}</Text>
                </View>
            </View>
        </View>
    )
}
