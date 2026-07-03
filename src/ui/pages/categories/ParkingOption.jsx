import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {texts} from '../../../utils/styles'
import { SvgXml } from 'react-native-svg';
import {gpsIcon} from '../../../utils/icons';
import BottomSheetButton from '../../general/BottomSheetButton';

export const ParkingOption = (props) => {
    
    const {
        onPress,
        title = "",
        distance = ""
    } = props;

    return (
        <BottomSheetButton
            onPress={onPress}
        >
            <View
                style={{
                    width: "90%",
                    marginHorizontal: "5%",
                    borderRadius: 10,
                    borderColor: "#DBDBDB",
                    borderWidth: 1,
                    paddingHorizontal: "3%",
                    paddingVertical: "2%",
                    marginBottom: "5%"
                }}
            >
                <Text
                    style = {{
                        marginBottom: "5%"
                    }}
                >
                    {title}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Text>
                        <Text
                            style = {texts.subtitleSectionHiglight}
                        >
                            {`Distancia: `} 
                        </Text>
                        <Text
                            style = {texts.subtitleSectionHiglight}
                        >
                            {distance}
                        </Text>
                    </Text>
                    <SvgXml 
                        xml = {gpsIcon} 
                        width = {RFValue(15)}
                        height = {RFValue(15)}
                    />
                </View>
            </View>
        </BottomSheetButton>
    )
}
