import React, { useEffect, useRef } from 'react'
import { View, Text, Dimensions, Platform, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { texts } from '../../utils/styles'
import { SocialButton } from './SocialButton'
import {
  getGoogleData,
  getFacebookData,
  getAppleData, // ✅ Ahora este import funciona correctamente (usa auth_native)
} from '../../controllers/auth_controller'
import _ from 'lodash'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export const LoginSocialSheet = ({
  onSignIn,
  onError,
  visible,
  changeVisible,
  onCancelled,
}) => {
  const bottomSheetRef = useRef(null)

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [visible])

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={['50%']}
      onDismiss={() => changeVisible(false)}
      enablePanDownToClose
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: screenWidth * 0.05,
            paddingVertical: screenHeight * 0.02,
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* CLOSE BUTTON */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => changeVisible(false)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 4,
                  backgroundColor: 'red',
                  borderRadius: 100,
                }}
              >
                <MaterialIcons name="close" color="white" size={screenWidth * 0.04} />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ ...texts.titleBottomSheet, marginBottom: '5%' }}>
            Ingresar con:
          </Text>

          {/* APPLE - Only on iOS */}
          {Platform.OS === 'ios' && (
            <SocialButton
              imgWidth={screenWidth * 0.07}
              imgHeight={screenWidth * 0.08}
              source={require('../../assets/images/apple.png')}
              text={
                <View style={{ marginLeft: 10 }}>
                  <Text style={texts.apple}>Apple ID</Text>
                </View>
              }
              onPress={async () => {
                const response = await getAppleData();

                if (response.error || response.cancelled || !response.userData?.providerData?.length) {
                  return onError();
                }

                const user = response.userData.providerData[0];

                onSignIn({
                  provider: 'apple',
                  provider_id: '3',
                  id: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                });
              }}
            />
          )}


          {/* FACEBOOK */}
          <SocialButton
            imgWidth={screenWidth * 0.25}
            imgHeight={screenWidth * 0.25 * 0.2}
            source={require('../../assets/images/facebook.png')}
            onPress={async () => {
              const response = await getFacebookData()
              if (response.error) return onError()
              if (response.cancelled) return onCancelled()

              onSignIn({
                provider: 'facebook',
                provider_id: '2',
                id: response.userData.uid,
                email: response.userData.email,
                displayName: response.userData.displayName,
              })
            }}
          />

          {/* APPLE */}
          {Platform.OS === 'ios' && (
            <SocialButton
              imgWidth={screenWidth * 0.07}
              imgHeight={screenWidth * 0.08}
              source={require('../../assets/images/apple.png')}
              text={
                <View style={{ marginLeft: 10 }}>
                  <Text style={texts.apple}>Apple ID</Text>
                </View>
              }
              onPress={async () => {
                const response = await getAppleData()

                if (
                  response.error ||
                  response.cancelled ||
                  _.isNil(response.userData.providerData) ||
                  response.userData.providerData.length === 0
                ) {
                  return onError()
                }

                const user = response.userData.providerData[0]

                onSignIn({
                  provider: 'apple',
                  provider_id: '3',
                  id: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                })
              }}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
