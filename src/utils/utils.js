import { Platform, Dimensions } from 'react-native';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_ASYNCSTORAGE_KEY, baseUrl } from '../config/constants';
import { downloadFileToLocal } from '../services/files/download';

export const sw = Dimensions.get('window').width;
export const sh = Dimensions.get('window').height;

export const getDistanceStrFromDouble = (distanceDouble) => {
  const kilometers = distanceDouble / 1000;
  return kilometers.toFixed(1) + " kilometros";
};

export const processData = (response) => {
  if (response.status === 200) {
    if (response.data.success) {
      const data = response.data;
      return {
        hasError: false,
        message: data.message ?? "",
        data: data.data,
      };
    } else {
      return {
        hasError: true,
        message: response.data.message ?? "Ocurrió un error",
      };
    }
  } else {
    return {
      hasError: true,
      message: response.data.message ?? "Ocurrió un error",
    };
  }
};

export const lengthFromDocumentId = (id) => {
  if (id == 1) return 8;
  if (id == 2) return 12;
  if (id == 3) return 11;
  if (id == 4) return 12;
  if (id == 5) return 15;
  if (id == 6) return 15;
  return 20;
};

export const validateDocumentNumber = (id, value) => {
  if (id == 1 && value.length != 8) return "Ingrese un número válido";
  if (id == 2 && value.length > 12) return "Ingrese un documento válido";
  if (id == 3 && value.length != 11) return "Ingrese un número válido";
  if (id == 4 && value.length > 12) return "Ingrese un documento válido";
  if (id == 5 && value.length > 15) return "Ingrese un documento válido";
  if (id == 6 && value.length > 15) return "Ingrese un documento válido";
  if (![1, 2, 3, 4, 5, 6].includes(id) && value.length > 20)
    return "Ingrese un documento válido";

  return "";
};

export const keyboardTypeFromDocumentId = (id) => {
  return id == 1 || id == 3 ? "numeric" : "default";
};

export const downloadPdfFile = async (item) => {
  try {
    const auth = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
    const { access_token } = JSON.parse(auth);

    const url = `${baseUrl}/general/download/invoice/${item.id}`;
    const filename = `quickpay_invoice_${item.id}.pdf`;

    const uri = await downloadFileToLocal(url, filename, {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(uri);
    }

    return uri;
  } catch (error) {
    console.error("Error descargando PDF:", error);
    throw error;
  }
};

export const niubizErrorMessageFromCode = (code) => {
  if (code == "101") return "Tarjeta vencida";
  if (code == "102") return "Operación no permitida para esta tarjeta";
  if (code == "113") return "Monto no permitido";
  if (code == "116") return "Fondos insuficientes";
  if (code == "118") return "Tarjeta inválida";
  if (code == "129") return "Tarjeta no operativa";
  if (code == "180") return "Tarjeta inválida";
  if (code == "208") return "Tarjeta perdida";
  if (code == "209") return "Tarjeta robada";
  if (code == "666") return "Problemas de comunicación";
  if (code == "670") return "Transacción denegada por posible fraude";
  if (code == "678") return "Error en autenticación";
  if (code == "754") return "Comercio no válido";
  if (code == "191") return "Contactar emisor";
  if (code == "0") return "Afiliación a REC no exitosa";
  return "Error desconocido";
};
