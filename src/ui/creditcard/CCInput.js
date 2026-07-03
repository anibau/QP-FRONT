import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const s = StyleSheet.create({
  baseInputStyle: {
    color: "black",
  },
});

export default class CCInput extends Component {
  inputRef = createRef();

  static propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.string,

    status: PropTypes.oneOf(["valid", "invalid", "incomplete"]),

    containerStyle: PropTypes.any,
    inputStyle: PropTypes.any,
    labelStyle: PropTypes.any,
    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,

    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onBecomeEmpty: PropTypes.func,
    onBecomeValid: PropTypes.func,
    additionalInputProps: PropTypes.object,
  };

  static defaultProps = {
    label: "",
    value: "",
    status: "incomplete",
    containerStyle: {},
    inputStyle: {},
    labelStyle: {},
    onFocus: () => {},
    onChange: () => {},
    onBecomeEmpty: () => {},
    onBecomeValid: () => {},
    additionalInputProps: {},
  };

  componentDidUpdate(prevProps) {
    const { status, value, onBecomeEmpty, onBecomeValid, field } = this.props;

    if (prevProps.value !== "" && value === "") {
      onBecomeEmpty(field);
    }

    if (prevProps.status !== "valid" && status === "valid") {
      onBecomeValid(field);
    }
  }

  focus = () => {
    this.inputRef.current?.focus();
  };

  _onFocus = () => this.props.onFocus(this.props.field);
  _onChange = (value) => this.props.onChange(this.props.field, value);

  render() {
    const {
      label,
      value,
      placeholder,
      status,
      keyboardType,
      containerStyle,
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      additionalInputProps,
    } = this.props;

    return (
      <TouchableOpacity onPress={this.focus} activeOpacity={0.99}>
        <View style={[containerStyle]}>
          {!!label && <Text style={[labelStyle]}>{label}</Text>}

          <TextInput
            ref={this.inputRef}
            {...additionalInputProps}
            keyboardType={keyboardType}
            autoCapitalize="words"
            autoCorrect={false}
            style={[
              s.baseInputStyle,
              inputStyle,
              validColor && status === "valid"
                ? { color: validColor }
                : invalidColor && status === "invalid"
                ? { color: invalidColor }
                : {},
            ]}
            underlineColorAndroid="transparent"
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            value={value}
            onFocus={this._onFocus}
            onChangeText={this._onChange}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
