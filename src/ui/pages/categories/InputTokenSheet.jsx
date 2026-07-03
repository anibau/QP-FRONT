import React, { useState, useEffect, useRef, useMemo } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { texts, colors } from '../../../utils/styles'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import OtpAutoFill from '../../../components/otp/OtpAutoFill'
import { validateToken, generateToken } from '../../../controllers/shop_controller'
import { store } from '../../../redux/store/store'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
const CELL_COUNT = 4

export const InputTokenSheet = ({ visible, changeVisible, onSelect }) => {
  const bottomSheetRef = useRef(null)
  const snapPoints = useMemo(() => ['50%'], [])

  const [value, setValue] = useState('')
  const [count, setCount] = useState(60)
  const [validating, setValidating] = useState(false)
  const [hasError, setHasError] = useState(true)

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [propsPinPut, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
      setCount(60)
      setValue('')
      setHasError(false)
    }
  }, [visible])

  useEffect(() => {
    if (!visible) return
    if (count === 0) return
    const t = setTimeout(() => setCount(count - 1), 1000)
    return () => clearTimeout(t)
  }, [count, visible])

  const handleComplete = ({ nativeEvent: { code } }) => {
    if (code.length === 4) setValue(code)
  }

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} pressBehavior="close" />
      )}
      onDismiss={() => changeVisible(false)}
    >
      <BottomSheetView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => changeVisible(false)}>
            <View style={styles.closeBtn}>
              <MaterialIcons name="close" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={texts.bigTitleBottomSheet}>Ingresar token</Text>
          <Text style={texts.subtitleSection}>
            Ingresa el código enviado a tu celular
          </Text>

          <CodeField
            ref={ref}
            {...propsPinPut}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            rootStyle={styles.codeFieldRoot}
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  isFocused && styles.focusCell,
                  hasError && { color: 'red' },
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <OtpAutoFill
            onComplete={handleComplete}
            length={4}
          />

          <Text
            style={{
              ...texts.titleBottomSheet,
              color: count > 0 ? colors.accentColor : 'red',
              textAlign: 'center',
            }}
          >
            {count > 9 ? `0:${count}` : `0:0${count}`}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={async () => {
            if (validating) return
            setValidating(true)

            const user = store.getState().auth.user

            if (!hasError) {
              const resp = await validateToken(
                user.cellphone_code,
                user.cellphone,
                value
              )
              if (!resp?.hasError) onSelect(true)
              else setHasError(true)
            } else {
              await generateToken(user.cellphone, user.email)
              setHasError(false)
              setCount(60)
            }
            setValidating(false)
          }}
        >
          <View style={styles.button}>
            <Text style={texts.generalHighlighText}>
              {!hasError ? 'Validar token' : 'Solicitar nuevo token'}
            </Text>
          </View>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  closeBtn: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  codeFieldRoot: {
    marginTop: 20,
    marginHorizontal: '15%',
  },
  cell: {
    width: 40,
    height: 50,
    fontSize: 36,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  button: {
    backgroundColor: '#F3F3F3',
    paddingVertical: '6%',
    alignItems: 'center',
  },
})
