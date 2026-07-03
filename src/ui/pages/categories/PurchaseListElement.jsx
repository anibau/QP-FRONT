import React from 'react'
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { texts } from '../../../utils/styles';
import {ProductImage} from '../../general/ProductImage';
import { SvgXml } from 'react-native-svg';
import {deleteIcon} from '../../../utils/icons';

const screenWidth = Dimensions.get('window').width;

export const PurchaseListElement = (props) => {
    const {
        product,
        onDelete,
        enableDelete = true
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
                url = {product.product_path}
                size = {screenWidth * 0.1}
            />
            <View
                style={{
                    width: screenWidth * 0.7,
                    justifyContent: "space-between",
                    paddingHorizontal: screenWidth * 0.02
                }}
            >
                <Text style={{...texts.subtitleSection, marginBottom: "2%"}}>{product.product_name}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text style={texts.payTextBold}>{`S/${(product.product_price) * product.itemsSelected}`}</Text>
                    <Text style={texts.amountText}>{`Cant: ${product.itemsSelected}`}</Text>
                </View>
            </View>
            {enableDelete && <View
                style={{
                    width: screenWidth * 0.1,
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}
            >
                <TouchableOpacity
                    onPress = {onDelete}
                >
                    <SvgXml 
                        xml = {deleteIcon} 
                        width = {screenWidth * 0.06}
                        height = {screenWidth * 0.06}
                    />
                </TouchableOpacity>
            </View>}
        </View>
    )
}
