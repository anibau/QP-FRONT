import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {texts, colors} from '../../../utils/styles';
import {dateFormatToSpanishV2} from '../../../utils/dateFormates';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const IncidentItem = (props) => {
    const {
        onPressed,
        incident
    } = props; 

    return (
    <TouchableOpacity
        onPress={onPressed}
    >
        <View
            style={{
                width: screenWidth * 0.9,
                marginHorizontal: screenWidth * 0.05,
                borderColor: colors.greyColor,
                borderWidth: 1.0,
                height: screenHeight * 0.15,
                flexDirection: "row",
                borderRadius: 10,
                marginBottom: 20
            }}
            >
            <View
                style={{
                    width: screenWidth * 0.7,
                    paddingHorizontal: screenWidth * 0.05,
                    paddingVertical: screenHeight * 0.015,
                    justifyContent: "space-between"
                }}
            >
                <View>
                    <Text style={{...texts.amountText, marginBottom: 5}}>
                        Detalle de incidencia
                    </Text>
                    <Text style={texts.simpleTextObscure}>
                        {incident.incidence_comment}
                    </Text>
                </View>
                <View
                    style = {{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Text>
                        <Text style={{...texts.amountText, marginRight: 5}}>
                            {"Fecha: "}  
                        </Text>
                        <Text>
                            {dateFormatToSpanishV2(incident.created_at)}
                        </Text>
                    </Text>
                    <View
                        style = {{
                            width: 10
                        }}
                    />
                    <View
                        style = {{
                            width: screenWidth * 0.5
                        }}
                    >
                        <Text>
                            <Text style={texts.amountText}>
                                {"Estado: "}  
                            </Text>
                            <Text>
                                {incident.incidence_status_label}
                            </Text>
                        </Text>
                    </View>
                    
                </View>
            </View>
            <View
                style={{
                    width: screenWidth * 0.2,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <MaterialIcons
                    name="arrow-forward-ios"
                    color="black"
                    size={20}
                /> 
            </View>
        </View>
    </TouchableOpacity>
    );
};
