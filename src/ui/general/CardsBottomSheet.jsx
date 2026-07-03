import React, { useRef, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { CurrentPaymentMethod } from '../pages/payment/CurrentPaymentMethod';
import { store } from '../../redux/store/store';
import { texts, colors } from '../../utils/styles';

const screenHeight = Dimensions.get('window').height;

export const CardsBottomSheet = (props) => {
  const {
    cardsRegistered,
    cardsLoading,
    cardsError,
    deleteUserCard,
    setUserFavoritCard,
    visible,
    changeVisible
  } = props;

  const sheetRef = useRef(null);

  const snapPoints = useMemo(() => ['45%'], []);

  useEffect(() => {
    if (visible) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={() => changeVisible(false)}
      index={-1}
    >
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: screenHeight * 0.02,
        }}
      >
        {cardsLoading && (
          <View
            style={{
              width: "100%",
              height: "10%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5%"
            }}
          >
            <ActivityIndicator size="large" color={colors.accentColor} />
          </View>
        )}

        {!cardsLoading && cardsError && (
          <View
            style={{
              width: "100%",
              height: "10%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Error al cargar tarjetas</Text>
          </View>
        )}

        {!cardsLoading && !cardsError && (
          <ScrollView>
            {cardsRegistered.map((element) => (
              <CurrentPaymentMethod
                key={element.card_number}
                creditCard={element}
                onDelete={() => deleteUserCard(element.id)}
                onFav={() => {
                  const user = store.getState().auth.user;
                  setUserFavoritCard({
                    id: element.id,
                    user_id: user.id
                  });
                }}
              />
            ))}
          </ScrollView>
        )}

        <TouchableOpacity onPress={() => changeVisible(false)}>
          <View
            style={{
              backgroundColor: "#F3F3F3",
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: '6%',
            }}
          >
            <Text style={texts.generalHighlighText}>
              Cerrar
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

