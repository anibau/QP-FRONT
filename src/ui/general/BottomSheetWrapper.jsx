import React, { useEffect, useRef } from 'react'
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet'

/**
 * BottomSheetWrapper - Componente envolvedor para simplificar el uso de gorhom/bottom-sheet
 * Remplazo para react-native-btr BottomSheet
 * 
 * Props:
 * - visible: boolean - Controla la visibilidad del bottom sheet
 * - onBackdropPress: function - Callback cuando se toca el fondo
 * - onBackButtonPress: function - Callback cuando se presiona el botón atrás
 * - snapPoints: array - Puntos de snap del sheet (default: ['50%'])
 * - children: ReactNode - Contenido del sheet
 * - onDismiss: function - Callback cuando el sheet se cierra
 */
export const BottomSheetWrapper = ({
  visible,
  onBackdropPress,
  onBackButtonPress,
  snapPoints = ['50%'],
  children,
  onDismiss,
  enablePanDownToClose = true,
}) => {
  const bottomSheetRef = useRef(null)

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [visible])

  const handleBackdropPress = () => {
    if (onBackdropPress) {
      onBackdropPress()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }

  const handleBackButtonPress = () => {
    if (onBackButtonPress) {
      onBackButtonPress()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onDismiss={() => {
        onDismiss?.()
      }}
      enablePanDownToClose={enablePanDownToClose}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          onPress={handleBackdropPress}
          pressBehavior="close"
        />
      )}
    >
      <BottomSheetView>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  )
}
