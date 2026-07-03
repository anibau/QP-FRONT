import React, { useEffect, useRef } from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { texts } from '../../utils/styles'
import { CustomImage } from './CustomImage'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export const ErrorBottomSheet = ({
  title = '',
  subtitle = '',
  buttonText = '',
  visible,
  changeVisible,
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
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* Close button */}
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              paddingHorizontal: screenWidth * 0.05,
              paddingTop: 10,
            }}
          >
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
                <MaterialIcons
                  name="close"
                  color="white"
                  size={screenWidth * 0.04}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* Text content */}
          <View style={{ paddingHorizontal: screenWidth * 0.05 }}>
            <Text style={{ ...texts.bigTitleBottomSheet, marginBottom: '5%' }}>
              {title}
            </Text>
            <Text>{subtitle}</Text>
          </View>

          {/* Image + button */}
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CustomImage
              source={require('../../assets/images/alert-circle.png')}
              width={screenWidth * 0.2}
              height={screenWidth * 0.2}
              resizeMode="contain"
              marginTop={screenHeight * 0.05}
            />

            <TouchableOpacity onPress={() => changeVisible(false)}>
              <View
                style={{
                  backgroundColor: '#F3F3F3',
                  width: screenWidth,
                  justifyContent: 'center',
                  paddingVertical: '6%',
                }}
              >
                <Text style={texts.generalHighlighTextBold}>
                  {buttonText}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
