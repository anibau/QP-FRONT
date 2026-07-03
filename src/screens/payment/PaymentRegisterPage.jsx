import React, {useState, useRef} from 'react'
import { WebView } from 'react-native-webview';
import {SafeAreaView, ActivityIndicator, View} from 'react-native';
import {AppBar} from '../../ui/general/AppBar';
import {colors} from '../../utils/styles';
import { store } from '../../redux/store/store';
import { ActionSavePaymentSuccess} from "../../redux/actions";
import { useSelector } from 'react-redux';
import {REGISTER_CARD} from '../../utils/urls';

export const PaymentRegisterPage = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const closing = useRef(Boolean(false));
  const auth = useSelector(state => {
    return state.auth;
  });

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <AppBar
        title = "Formulario de pago"
        onPress = {()=>{
          navigation.pop();
        }}
      />
      <WebView 
        style={{
          flex: 1
        }}
        source={{ 
          uri: `${REGISTER_CARD}${auth.user.id}`
        }} 
        onNavigationStateChange={(state) => {
          if(closing.current) return;
          const newUrl = state.url || "";
          const data = newUrl.split("/");
          if(data.length > 0){
            if(data[data.length - 1] === "success"){
              store.dispatch(ActionSavePaymentSuccess({
                success: true,
                complete: true
              }));
              closing.current = true;
              navigation.pop();
            }else if(data[data.length - 1] === "error"){
              store.dispatch(ActionSavePaymentSuccess({
                success: false,
                error: true,
                complete: true
              }));
              closing.current = true;
              navigation.pop();
            }
          }
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
