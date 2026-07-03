import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, StatusBar, Platform, Linking, AppState} from 'react-native';
import { BarCodeScanner, Camera } from '../../services/barcode/scanner';
import {AppBar} from '../../ui/general/AppBar';
import {NetworkTrailing} from '../../ui/general/NetworkTrailing';
import {CustomImage} from '../../ui/general/CustomImage';
import { Info } from '../../ui/modal/Info';
import Toast from 'react-native-toast-message';
import { ScannerBox } from '../../ui/pages/categories/ScannerBox';
import Container from '../../ui/container/Container';
import {RequestSheet} from '../../ui/general/RequestSheet';
import {GoToSettingsSheet} from '../../ui/pages/categories/GoToSettingsSheet';
import { RFValue } from 'react-native-responsive-fontsize';
import { getInvoiceDetails } from '../../controllers/shop_controller';
import { authenticatedGuardHomeStack } from '../../config/navigation';
import { ScannerManualEntry } from '../../ui/pages/categories/ScannerManualEntry';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const GuardScannPage = ({navigation, route}) => {

  const {
    shop = {},
    locale = {}
  } = route.params;

  const [hasPermission, setHasPermission] = useState(false);
  const [permissionSheetVisible, setPermissionSheetVisible] = useState(false);
  const [settingsSheetVisible, setSettingsSheetVisible] = useState(false);
  
  
  const listener = useRef();
  const appState = useRef(AppState.currentState)
  const inSettingsScann = useRef(Boolean(false));
  const [scanned, setScanned] = useState(false);
  const [barcodeText, setBarcodeText] = useState("");
  const [loadingState, setLoadingState] = useState({
    loading: false,
    display: false,
    info: false
  });
  /*
  * Sección del scanner de QR 
  */

  const verifyPermissionStatus = async () => {
    let permissionStatus = await BarCodeScanner.getPermissionsAsync();
    if(!permissionStatus.granted){
        if(permissionStatus.canAskAgain){
          setPermissionSheetVisible(true);
        }else{
          setSettingsSheetVisible(true);
        }
    }else{
      setHasPermission(true);
    }
}

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if(appState.current == "background" && nextAppState === "active" && inSettingsScann.current){
        verifyPermissionStatus();
      }
    }
    appState.current = nextAppState;
  };

  const goToSettings = () => {
    inSettingsScann.current = Boolean(true);
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:')
    } else {
      Linking.openSettings();
    }
}

  const scannReceipt = async (invoiceId) => {
    setLoadingState({
        ...loadingState,
        loading: true,
        display: true
    });
    const response = await getInvoiceDetails(invoiceId);
    setBarcodeText("");
    setLoadingState({
        ...loadingState,
        loading: false,
        display: false
    });
    if(response.hasError){
      Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.message,
          position: "bottom"
      });
      return;
    }
    navigation.push(authenticatedGuardHomeStack.details, {
      invoiceData: response.data
    });
  }

  /*
  * Sección de permisos
  */

  const requestPermissionAsync = async () => {
    try{
        let {status} = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted'){
          setHasPermission(true);
        }else {
          const response = await BarCodeScanner.getPermissionsAsync();
          if(response.canAskAgain){
            setPermissionSheetVisible(true);              
          }else{
            setSettingsSheetVisible(true);
          }
        }
    }catch(e){
    }
  }

  useEffect(() => {
    (async () => {
      if(!hasPermission){
        const response = await BarCodeScanner.getPermissionsAsync();
        const status = response.status;
        if(status !== 'granted'){
          if(response.canAskAgain){
            setPermissionSheetVisible(true);
          }else{
            setSettingsSheetVisible(true);
          }
        }else{
          setHasPermission(true);
        }
      }
      // scannReceipt(2);
      })();
    listener.current = AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      if(listener.current !== undefined){
        listener.current.remove();
      }
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <>
        <View style={styles.container}>
          <StatusBar backgroundColor="#202020" />
          <AppBar
            title={shop.company_name}
            onPress={() => navigation.pop()}
            darkMode
            backgroundColor="#202020"
            trailing={
              <NetworkTrailing
                url={shop.company_url}
                width={50}
                resizeMode="contain"
                height={50}
                borderRadius={100}
              />
            }
          />
          <ScannerManualEntry
            placeholder="Código de factura"
            onSubmit={(data) => {
              setScanned(true);
              if (data.length) {
                scannReceipt(data);
              }
            }}
          />
          <Info
            loading={loadingState.loading}
            info={loadingState.info}
            display={loadingState.display}
          />
        </View>
      </>
    );
  }

  if (!hasPermission) {
    return (
    <>
      <Container>
      <View style={styles.container}>
        <AppBar
          title={shop.company_name}
          onPress={()=>{
            navigation.pop();
          }}
          backgroundColor = "#202020"
          trailing ={
            <NetworkTrailing
                url={shop.company_url}
                width={50}
                resizeMode="contain"
                height={50}
                borderRadius={100}
            />
          }
        />
        <View
          style = {{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="small" color="white" />
        </View>
        </View>
      </Container>
      <RequestSheet
        visible={permissionSheetVisible}
        title = "Cámara"
        subtitle = "Para usar el scanner de QR necesita permitir el uso de la cámara"
        buttonText = "Activar Cámara"
        image = {
          <CustomImage
              source={require("../../assets/images/photo-camera.png")}
              width={RFValue(100)}
              resizeMode="contain"
              height={RFValue(100)}
          />
        }
        onClose={()=>{
          setPermissionSheetVisible(false);
          navigation.pop();
        }}
        onActivate={()=>{
          setPermissionSheetVisible(false);
          requestPermissionAsync();
        }}
      />
      <GoToSettingsSheet
        visible = {settingsSheetVisible}
        title = "Cámara"
        subtitle = "Para usar el scanner de QR debe dar el permiso manualmente"
        onClose={()=>{
          setSettingsSheetVisible(false);
          navigation.pop();
        }}
        onOpenSettings={()=>{
          setSettingsSheetVisible(false);
          goToSettings();
        }}
    />
    </>);
  }
  return (
    <>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={"#202020"}
          />
          <AppBar
            title={shop.company_name}
            onPress={()=>{
              navigation.pop();
            }}
            darkMode
            backgroundColor = "#202020"
            trailing ={
              <NetworkTrailing
                url={shop.company_url}
                width={50}
                resizeMode="contain"
                height={50}
                borderRadius={100}
              />
            }
          />
          <View style={styles.container}>
            <Camera
              style={{ width: screenWidth, height: screenHeight * 0.9}} 
              barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
              }}
              onBarCodeScanned = { scanned ? undefined : ({ type, data }) => {
                setScanned(true);
                if(Boolean(data.length)){
                  scannReceipt(data);
                }
              }}
            />
          </View>
          <Info
            loading={loadingState.loading}
            info={loadingState.info}
            display={loadingState.display}
          />
        </View>
      <ScannerBox/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});