import React, {useState} from 'react'
import { WebView } from 'react-native-webview';
import {SafeAreaView, ActivityIndicator, View} from 'react-native';
import {AppBar} from '../../ui/general/AppBar';
import {colors} from '../../utils/styles';
import {baseUrlTerms} from '../../config/constants';

export const TermsPage = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    return (
        <SafeAreaView
          style={{
            flex: 1
          }}
        >
          <AppBar
            title = "Términos y condiciones"
            onPress = {()=>{
              navigation.pop();
            }}
          />
          <WebView 
            style={{
              flex: 1
            }}
            source={{ 
              uri: `${baseUrlTerms}terminos-condiciones`
            }} 
            onNavigationStateChange={(state) => {
            }}
            onLoadEnd={()=>{
              setLoading(false);
            }}
          />
          {loading &&
            <View
              style = {{
                position: 'absolute',
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                height: "60%"
              }}
            >
              <ActivityIndicator size="large" color = {colors.accentColor} />
            </View> 
          }
        </SafeAreaView>
      )
}
