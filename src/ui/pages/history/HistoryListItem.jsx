import React from 'react'
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import {NetworkImage} from '../../general/NetworkImage';
import { texts, alignments } from '../../../utils/styles';
import { MaterialIcons } from '@expo/vector-icons';
import {formatDateComplete} from '../../../utils/dateFormates';

const screenWidth = Dimensions.get('window').width;

export const HistoryListItem = (props) => {

    const {
        item,
        onPressed
    } = props;

    return (
        <TouchableOpacity
            style={{
                paddingHorizontal: "5%",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: item.payed == 0 ? "#d9d9d9" : "white",
                paddingVertical: 10
            }}
            onPress={onPressed}
        >
            <View
                style={{
                    width: screenWidth * 0.1,
                    height: screenWidth * 0.1,
                    backgroundColor: "white",
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 5},
                    shadowOpacity: 0.35,
                    shadowRadius: 5,
                    elevation: 2,
                    overflow: 'visible',
                    borderRadius: 100
                }}
            >
                <NetworkImage
                    url = {item.imagen_sucursal}
                    width = {screenWidth * 0.1}
                    resizeMode = "cover"
                    height = {screenWidth * 0.1}
                    borderRadius = {1000}
                />
            </View>
            <View
                style={{
                    width: screenWidth * 0.7,
                    justifyContent: "space-between",
                    paddingHorizontal: screenWidth * 0.02
                }}
            >
                <View
                    style = {{
                        ...alignments.row_basic
                    }}
                >
                    <Text style={{
                        ...texts.subtitle, 
                        marginBottom: "2%",
                        width: screenWidth * 0.6
                    }}>
                        {item.Titulo}
                    </Text>
                    {item.payed == 0 && <MaterialIcons
                        name="info"
                        color="red"
                        size={screenWidth * 0.05}
                    />}
                </View>
                <View
                    style={alignments.row_space}
                >
                    <Text style={texts.subtitleSection}>{
                        item.invoice_amount === 1 ? "1 Producto" :
                        `${item.invoice_amount} Productos`}
                    </Text>
                    <Text style={texts.generalHighlighText}>
                        {formatDateComplete(item.created_at)}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    width: screenWidth * 0.1,
                    ...alignments.row_end
                }}
            >
                <MaterialIcons
                    name="arrow-forward-ios"
                    color="black"
                    size={screenWidth * 0.04}
                /> 
            </View>
        </TouchableOpacity>
    )
}
