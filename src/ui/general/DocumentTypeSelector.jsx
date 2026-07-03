import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Platform} from 'react-native';
import axios from 'axios';
import {DOCUMENT_TYPES} from '../../utils/urls';
import i18n from '../../config/i18n';
import { texts, colors, pickerSelector} from '../../utils/styles';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';

export const DocumentTypeSelector = (props) => {
    const {
        placeholder,
        onSelected,
        onEmptySelected,
        onItemsLoaded,
        onAditionalDataChange,
        errorMessage = "",
        width = "90%",
        title = "",
        marginHorizontal = 0,
        editable = true,
    } = props;
    const [selectedValue, setSelectedValue] = useState("");
    const [boxOptions, setBoxOptions] = useState([]);

    useEffect(() => {
        loadOptions(); 
    }, []);

    const loadOptions = async () => {
        try{
            const result = await axios.get(DOCUMENT_TYPES, {
                headers: {
                    'Content-Type': "application/json",
                    "Accept": "application/json",
                }
            });
            const optionsResult = result.data.data.map((option) => ({
                label: option.description,
                value: option.id.toString(),
                aditionalData: {
                    format: "",
                    minLength: option.length,
                    maxLength: option.length,
                }
            }));
            onItemsLoaded();
            setBoxOptions(optionsResult);
        }catch(e){
            onItemsLoaded();
        }
    }

    return (
        <View>
            <View style={{
                ...styles.box,
                marginBottom: errorMessage != '' ? '1%' : '3%',
                width: width,
                borderColor: Boolean(errorMessage.length) ?  "red" : "#C8C8C8",
                marginHorizontal: marginHorizontal,
                justifyContent: "space-between",
                backgroundColor: editable ? "white" : colors.lightGrey
            }}>
                <View
                    style={{
                        height: 80,
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#101010",
                            fontFamily: "product-sans-bold",
                            fontSize: 15,
                            fontWeight: '700',
                            paddingLeft: 10,
                        }}
                    >
                        {title}
                    </Text>
                    <View
                        style = {{
                            paddingLeft: Platform.OS === "ios" ? "3%": 0
                        }}
                    >
                        <RNPickerSelect
                            placeholder={{
                                label: placeholder,
                                value: null,
                            }}
                            doneText={i18n.t('keyboard.done')}
                            items={boxOptions}
                            onValueChange={value => {
                                if (!_.isNil(value)) {
                                    setSelectedValue(value);
                                    onSelected(value);
                                    const aditionalData = boxOptions.filter(e => e.value === value );
                                    onAditionalDataChange(aditionalData[0]);
                                }else{
                                    onEmptySelected();
                                }
                            }}
                            style={pickerSelector}
                            value={errorMessage.length == 0 ? selectedValue : ""}
                            useNativeAndroidPickerStyle={true}
                        />
                    </View>
                </View>
            </View>
                {Boolean(errorMessage.length) && 
            <View
                style={{
                    marginLeft: "8.5%",
                    marginRight: "8.5%",
                    marginBottom: "3%"
                }}
            >
                <Text
                    style={{
                        color: "red"
                    }}
                >
                    {errorMessage}
                </Text>  
            </View>}
        </View>   
    )
}
const styles = StyleSheet.create({
    box:{
        borderRadius: 10,
        borderWidth: 1.0,
        justifyContent: 'center',
        paddingRight: "2%",
        paddingLeft: "1%",
        flexDirection: "row",
        alignItems: "center"
    },
});