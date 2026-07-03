import React from 'react'
import {Text, View, Dimensions} from 'react-native';
import {Divider} from '../../general/Divider';
import {ProductImage} from '../../general/ProductImage';
import { texts } from '../../../utils/styles';
import { MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export const CheckoutListElement = (props) => {
    const {
        product,
        isLast = false
    } = props;
    return (
        <View
            style={{
                paddingHorizontal: "5%",
                flexDirection: "row",
                height: screenWidth * 0.1,
                alignItems: "center",
                marginBottom: isLast ? 0 : "5%"
            }}
        >
            <ProductImage
                url = {product.product_path}
                size = {screenWidth * 0.1}
                borderRadius = {400}
            />
            <View
                style={{
                    width: screenWidth * 0.7,
                    justifyContent: "space-between",
                    paddingHorizontal: screenWidth * 0.02
                }}
            >
                <Text style={texts.subtitle}>{product.product_name + " " + product.product_descripcion}</Text>
                <Divider
                    height = {0}
                    marginVertical = {"1%"}
                />
                <Text style={texts.subtitleSection}>{`${product.itemsSelected} ${product.itemsSelected == 1 ? "Producto" : "Productos"}`}</Text>
            </View>
            <View
                style={{
                    width: screenWidth * 0.1
                }}
            >
                <MaterialIcons name="arrow-forward-ios" color="black" size={screenWidth * 0.05} /> 
            </View>
        </View>
    )
}
