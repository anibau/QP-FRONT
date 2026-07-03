import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

import Modal from "react-native-modal";
import i18n from "../../config/i18n";

export const Info = (props) => {
  const {
    display,
    onHideModal,
    onClose,
    containerStyle,
    containerBodyStyle,
    containerImageTitleStyle,
    titleInfo,
    titleInfoStyle,
    messageInfo,
    messageInfoStyle,
    imageTitle,
    loading,
    loadingColor,
    loadingText,
    loadingTextStyle,
    containerLoadingStyle,
    info,
  } = props;

  return (
    <Modal
      isVisible={display}
      backdropOpacity={0.6}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onModalHide={() => onHideModal?.()}
      style={{ margin: 0 }}
    >
      <TouchableOpacity activeOpacity={1} style={styles.container}>
        <View style={[styles.container, containerStyle]}>
          {info && (
            <View style={[styles.containerModalBody, containerBodyStyle]}>
              <View
                style={[
                  styles.containerImageTitle,
                  containerImageTitleStyle,
                ]}
              >
                {imageTitle}
              </View>

              {!!titleInfo && (
                <Text style={[styles.titleInfo, titleInfoStyle]}>
                  {titleInfo}
                </Text>
              )}

              {!!messageInfo && (
                <Text style={[styles.messageInfo, messageInfoStyle]}>
                  {messageInfo.charAt(0).toUpperCase() + messageInfo.slice(1)}
                </Text>
              )}

              <TouchableOpacity onPress={onClose} style={styles.button}>
                <Text style={styles.buttonText}>{i18n.t("common.ok")}</Text>
              </TouchableOpacity>
            </View>
          )}

          {loading && (
            <View style={[styles.containerLoading, containerLoadingStyle]}>
              <ActivityIndicator size="large" color={loadingColor} />
              <Text style={[styles.text_loading, loadingTextStyle]}>
                {loadingText}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLoading: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
  },
  text_loading: {
    marginTop: 20,
    marginBottom: 20,
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  containerModalBody: {
    width: Dimensions.get("window").width - 80,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
  },
  containerImageTitle: {
    backgroundColor: "#E6F6EC",
    width: 76,
    height: 76,
    borderRadius: 38,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleInfo: {
    color: "#313638",
    fontSize: 18,
    lineHeight: 22,
    marginTop: 20,
    textAlign: "center",
  },
  messageInfo: {
    color: "#313638",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#2F73C4",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});

export default Info;

Info.propTypes = {
  display: PropTypes.bool,
  onHideModal: PropTypes.func,
  onClose: PropTypes.func,

  containerStyle: PropTypes.any,
  containerBodyStyle: PropTypes.any,
  containerImageTitleStyle: PropTypes.any,
  titleInfoStyle: PropTypes.any,
  messageInfoStyle: PropTypes.any,
  containerLoadingStyle: PropTypes.any,
  loadingTextStyle: PropTypes.any,

  loading: PropTypes.bool,
  info: PropTypes.bool,

  titleInfo: PropTypes.string,
  messageInfo: PropTypes.string,

  loadingColor: PropTypes.string,
  loadingText: PropTypes.string,

  imageTitle: PropTypes.node,
};

Info.defaultProps = {
  display: false,
  loading: false,
  info: false,
  loadingColor: "#fff",
  loadingText: i18n.t("common.loading"),
  titleInfo: "",
  messageInfo: "",
};
