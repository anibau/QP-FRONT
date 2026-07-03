import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ICON_SIZE = 22

export const CheckBanner = ({
  state = false,
  onPress = () => {},
  label = '',
  marginBottom = 0,
  marginTop = 0,
  atEnd = true,
}) => {
  const Checkbox = (
    <Pressable
      onPress={() => onPress(!state)}
      style={styles.checkbox}
    >
      <Ionicons
        name={state ? 'checkbox' : 'square-outline'}
        size={ICON_SIZE}
        color={state ? '#32BA7C' : '#2F73C4'}
      />
    </Pressable>
  )

  return atEnd ? (
    <View
      style={[
        styles.row,
        {
          justifyContent: 'space-between',
          marginBottom,
          marginTop,
        },
      ]}
    >
      <Text style={styles.text}>{label}</Text>
      {Checkbox}
    </View>
  ) : (
    <View
      style={[
        styles.row,
        {
          justifyContent: 'flex-start',
          marginBottom,
          marginTop,
        },
      ]}
    >
      {Checkbox}
      <Text style={styles.textLight}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    marginHorizontal: 5,
    color: '#101010',
    fontFamily: 'product-sans-bold',
    fontSize: 15,
    fontWeight: '700',
  },

  textLight: {
    marginHorizontal: 5,
    color: '#101010',
    fontFamily: 'product-sans-regular',
    fontSize: 15,
  },
})


