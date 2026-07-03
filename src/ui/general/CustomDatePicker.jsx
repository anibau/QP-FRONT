import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Text, Dimensions } from 'react-native';
import dayjs from 'dayjs';
import i18n from '../../config/i18n';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const sw = Dimensions.get('window').width;

export const CustomDatePicker = (props) => {
  const {
    value = "",
    onSelected,
    title = "",
    onFocus = () => {},
    errorMessage = "",
    disable = false
  } = props;

  const [show, setShow] = useState(false);

  const showDatePicker = () => {
    onFocus();
    setShow(true);
  };

  return (
    <View style={{ width: '100%' }}>
      <TouchableWithoutFeedback
        onPress={showDatePicker}
        disabled={disable}
      >
        <View
          style={{
            ...styles.box,
            borderColor: errorMessage.length ? "red" : "#C8C8C8",
            marginBottom: errorMessage ? "1%" : '3%',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#101010",
                fontFamily: "product-sans-bold",
                fontSize: 15,
                fontWeight: '700',
                marginBottom: "1%"
              }}
            >
              {title}
            </Text>

            <Text style={{ color: "#757575", fontSize: 15, fontFamily: "product-sans-regular" }}>
              {value.length > 1 ? value : ""}
            </Text>
          </View>

          {/* 📅 ICON MIGRADO */}
          <MaterialIcons
            name="event"
            size={sw * 0.07}
            color="#757575"
          />
        </View>
      </TouchableWithoutFeedback>

      {errorMessage.length > 1 && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      {show && (
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          locale="es_US"
          headerTextIOS={i18n.t('sign_up.birth_date_title_modal')}
          cancelTextIOS={i18n.t('common.cancel')}
          confirmTextIOS={i18n.t('common.confirm')}
          date={
            value
              ? dayjs(value, 'DD-MM-YYYY').toDate()
              : dayjs().subtract(18, 'years').toDate()
          }
          onConfirm={(date) => {
            setShow(false);

            if (dayjs(date).isAfter(dayjs())) {
              Toast.show({
                type: 'error',
                text1: 'Atención',
                text2: 'Seleccione una fecha anterior a la actual',
                position: "bottom"
              });
            } else {
              onSelected(dayjs(date).format('DD-MM-YYYY'));
            }
          }}
          onCancel={() => setShow(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '90%',
    marginHorizontal: '5%',
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: '4%',
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: "center"
  },
  errorText: {
    color: 'red',
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: '1%',
    marginBottom: '2%',
  }
});
