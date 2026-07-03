import React from 'react'
import {Text, View, Dimensions, TouchableOpacity} from 'react-native';
import { texts, alignments } from '../../../utils/styles';
import {dateFormatToSpanishV2} from '../../../utils/dateFormates';

const screenWidth = Dimensions.get('window').width;

export const GuardHistoryItem = (props) => {

    const {
        item,
        onPressed
    } = props;

    return (
        <TouchableOpacity
            style={{
                paddingHorizontal: "5%",
                flexDirection: "row",
                height: screenWidth * 0.1,
                alignItems: "center",
            }}
            onPress={onPressed}
        >
            <View
                style={{
                    width: screenWidth * 0.9,
                    justifyContent: "space-between",
                    paddingHorizontal: screenWidth * 0.02
                }}
            >
                <Text style={{...texts.subtitle, marginBottom: "2%"}}>{item.nombre + " " + item.apellido}</Text>
                <View
                    style={alignments.row_space}
                >
                    <Text style={texts.subtitleSection}>{item.estado}</Text>
                    <Text style={texts.generalHighlighText}>
                        {dateFormatToSpanishV2(item.updated_at)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
