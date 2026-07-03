import React, { useEffect, useRef } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

const screenHeight = Dimensions.get('window').height

export const InvalidSessionSheet = ({
  visible = false,
  message = '',
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
      snapPoints={['45%']}
      enableDismissOnClose={false}
      enablePanDownToClose={false}
    >
      <BottomSheetView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {message}
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}
