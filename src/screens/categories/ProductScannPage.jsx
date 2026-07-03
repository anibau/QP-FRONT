import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, StatusBar, Platform, Linking, AppState} from 'react-native';
import { BarCodeScanner, Camera } from '../../services/barcode/scanner';
import {AppBar} from '../../ui/general/AppBar';
import {NetworkTrailing} from '../../ui/general/NetworkTrailing';
import {CustomImage} from '../../ui/general/CustomImage';
import {ProductPreviewSheet} from '../../ui/pages/categories/ProductPreviewSheet';
import { Info } from '../../ui/modal/Info';
import {scannProductDetails} from '../../controllers/shop_controller';
import Toast from 'react-native-toast-message';
import { ScannerBox } from '../../ui/pages/categories/ScannerBox';
import Container from '../../ui/container/Container';
import {RequestSheet} from '../../ui/general/RequestSheet';
import {GoToSettingsSheet} from '../../ui/pages/categories/GoToSettingsSheet';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store/store';
import { ActionSaveProductsSelected } from '../../redux/actions';
import { ScannerManualEntry } from '../../ui/pages/categories/ScannerManualEntry';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const ProductScannPage = ({navigation, route}) => {

  const {
    shop = {},
    locale = {}
  } = route.params;

  const {productsScanned} = useSelector(state => {
    return state.shopping;
  });

  const [hasPermission, setHasPermission] = useState(false);
  const [permissionSheetVisible, setPermissionSheetVisible] = useState(false);
  const [settingsSheetVisible, setSettingsSheetVisible] = useState(false);
  const listener = useRef();
  const appState = useRef(AppState.currentState)
  const inSettingsScann = useRef(Boolean(false));
  const [scanned, setScanned] = useState(false);
  const [productPreview, setProductPreview] = useState({});
  const [barcodeText, setBarcodeText] = useState("");
  const [loadingState, setLoadingState] = useState({
    loading: false,
    display: false,
    info: false
  });
  const [productPreviewVisible, setProductPreviewVisible] = useState(false);
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

  const scannProduct = async (productCode, idLocale) => {
    setLoadingState({
        ...loadingState,
        loading: true,
        display: true
    });
    const response = await scannProductDetails(productCode, idLocale);
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
        setScanned(false);
        return;
    }
    setProductPreview(response.data);
    setProductPreviewVisible(true);
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
          /* setTimeout(() => {
            scannProduct("11111", 1)
          }, 1000); */
        }
      }
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
            placeholder="Código de barras"
            onSubmit={(data) => {
              setScanned(true);
              scannProduct(data, locale.id);
            }}
          />
          <Info
            loading={loadingState.loading}
            info={loadingState.info}
            display={loadingState.display}
          />
        </View>
        <ProductPreviewSheet
          product={productPreview}
          visible={productPreviewVisible}
          onClose={() => {
            setScanned(false);
            setProductPreviewVisible(false);
          }}
          onSelect={(newProduct) => {
            setProductPreviewVisible(false);
            const index = productsScanned.findIndex((element) => element.id === newProduct.id);
            let newProductsSelected = [];
            if (index !== -1) {
              const newItemCount = productsScanned[index].itemsSelected + newProduct.itemsSelected;
              productsScanned[index] = {
                ...productsScanned[index],
                itemsSelected: newItemCount,
              };
              newProductsSelected = productsScanned;
            } else {
              newProductsSelected = [...productsScanned, newProduct];
            }
            store.dispatch(
              ActionSaveProductsSelected({
                localeId: locale.id,
                products: newProductsSelected,
              })
            );
            navigation.pop();
          }}
        />
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
        visible = {permissionSheetVisible}
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
        visible={settingsSheetVisible}
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
                barCodeTypes: [
                  BarCodeScanner.Constants.BarCodeType.qr, 
                  BarCodeScanner.Constants.BarCodeType.code128,
                  BarCodeScanner.Constants.BarCodeType.upc_a,
                  BarCodeScanner.Constants.BarCodeType.upc_e,
                  BarCodeScanner.Constants.BarCodeType.upc_ean,
                  BarCodeScanner.Constants.BarCodeType.aztec,
                  BarCodeScanner.Constants.BarCodeType.codabar,
              ],
              }}
              onBarCodeScanned = { scanned ? undefined : ({ type, data }) => {
                setScanned(true);
                scannProduct(data, locale.id);
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
      <ProductPreviewSheet
        product={productPreview}
        visible = {productPreviewVisible}
        onClose={()=>{
          setScanned(false);
          setProductPreviewVisible(false);
        }}
        onSelect={(newProduct) => {
          setProductPreviewVisible(false);
          const index = productsScanned.findIndex((element) => element.id === newProduct.id);
          let newProductsSelected = [];
          if(index !== -1){
            const newItemCount = productsScanned[index].itemsSelected + newProduct.itemsSelected;
            const newProductItem = {
                ...productsScanned[index],
                itemsSelected: newItemCount
            };
            productsScanned[index] = newProductItem;
            newProductsSelected = productsScanned;
          }else{
            newProductsSelected = [...productsScanned, newProduct];
          }
          store.dispatch(ActionSaveProductsSelected({
            localeId: locale.id,
            products: newProductsSelected
          }));
          navigation.pop();
        }}
      />
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