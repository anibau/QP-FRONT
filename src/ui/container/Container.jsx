import React from 'react';
import _ from 'lodash';

import { StyleSheet, SafeAreaView, View, Dimensions, StatusBar, ImageBackground } from 'react-native';

const Container = function ({ image, style, safeArea, children, ...rest }) {

  return (

    (safeArea) ? <SafeAreaView style={StyleSheet.flatten([styles.container, style])} {...rest}>
      {
        image && <ImageBackground style={styles.bgImage} source={image} imageStyle={{ resizeMode: 'cover' }}></ImageBackground>
      }
      <StatusBar
        barStyle={!_.isNil(rest.theme) ? rest.theme : "light-content"}
        backgroundColor={!_.isNil(rest.backgroundStatusColor) ? rest.backgroundStatusColor : "#FFFFFF"}
      />
      {children}
    </SafeAreaView> :
      <View style={StyleSheet.flatten([styles.container, style])} {...rest}>
        {
          image && <ImageBackground style={styles.bgImage} source={image} imageStyle={{ resizeMode: 'cover' }}></ImageBackground>
        }
        <StatusBar
          backgroundColor = "#cccccc"
        />
        {children}
      </View>


  );
};

const styles = {
  container: {
    padding: 0,
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: "#fff"
  },
  right: {
    paddingRight: 0,
  },
  left: {
    paddingLeft: 0,
  },
  all: {
    paddingHorizontal: 0,
  },
  bgImage: {
    flex: 1,
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').height),
    // height: "100%"
  },
};

export default Container;
