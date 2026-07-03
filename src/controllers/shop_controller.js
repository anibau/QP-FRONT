import axios from "axios";
import {
  GET_LOCALE_BY_SHOP,
  GENERATE_TOKEN,
  VALIDATE_TOKEN,
  GET_PRODUCT_DETAIL,
  GET_TENDS_LIST,
  GET_SERVICES_LIST,
  GET_PARKING_LIST,
  GET_SHOP_HISTORY,
  VALIDATE_COUPON,
  GET_INVOICE_DETAILS,
  CREATE_INCIDENT,
  SAVE_TEMP_PURCHASE,
  SAVE_PURCHASE,
  VALIDATE_INVOICE,
  VALIDATED_LIST,
  SCANN_PRODUCT_DETAIL,
  PAY_WITH_CARD,
} from '../utils/urls';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ASYNCSTORAGE_KEY } from '../config/constants';
import { processData } from '../utils/utils';

const getAuthHeader = async () => {
  const auth = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
  const { access_token } = JSON.parse(auth || "{}");
  return { Authorization: `Bearer ${access_token}` };
};

export const getTendsList = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(GET_TENDS_LIST, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const getShopHistory = async (userId, page) => {
  try {
    const headers = await getAuthHeader();
    const url = `${GET_SHOP_HISTORY}?page=${page}`;
    const response = await axios.post(url, { invoice_user_id: userId }, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const getInvoiceDetails = async (invoiceId) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(GET_INVOICE_DETAILS + invoiceId, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const getServicesList = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(GET_SERVICES_LIST, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const getParkingList = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(GET_PARKING_LIST, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const getLocalesByShop = async (idShop, latitude, longitude) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      GET_LOCALE_BY_SHOP,
      { company_id: idShop, latitude, longitude },
      { headers }
    );
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const getProductDetails = async (productCode, idLocale) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      GET_PRODUCT_DETAIL,
      { product_code: productCode, id_local: idLocale },
      { headers }
    );
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const scannProductDetails = async (productCode, idLocale) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      SCANN_PRODUCT_DETAIL,
      { product_barcode: productCode, id_local: idLocale },
      { headers }
    );
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const generateToken = async (phone, email) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      GENERATE_TOKEN,
      { code: "+51", phone, email },
      { headers }
    );
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const validateToken = async (code, phone, token) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      VALIDATE_TOKEN,
      { code, phone, token },
      { headers }
    );
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const validateCoupon = async (coupon, empresa, products) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      VALIDATE_COUPON,
      { coupon, empresa, products },
      { headers }
    );
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const saveTempPurchase = async (body) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(SAVE_TEMP_PURCHASE, body, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const savePermanentPurchase = async (body) => {
  try {
    const headers = await getAuthHeader();

    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const response = await fetch(SAVE_PURCHASE, {
      method: "POST",
      headers,
      body: formData,
    });

    const json = await response.json();

    if (response.ok) {
      return processData({ status: response.status, data: json });
    }

    return { hasError: true, message: json?.message ?? "Ocurrió un error" };
  } catch (error) {
    return { hasError: true, message: error?.message ?? "Ocurrió un error" };
  }
};

export const payWithCard = async (body) => {
  try {
    const headers = await getAuthHeader();
    const invoiceId = body.invoiceId || body.id;
    const url = `${PAY_WITH_CARD}${invoiceId}`;
    const response = await axios.post(url, {}, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const validateInvoice = async (invoiceId, validatorId) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.post(
      VALIDATE_INVOICE,
      { id: invoiceId, validator_id: validatorId },
      { headers }
    );
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};

export const reportInvoice = async (
  incidentTypeId,
  userId,
  incidentComment,
  incidentResolution,
  origin,
  codeInvoice,
  file
) => {
  try {
    const headers = await getAuthHeader();

    const formData = new FormData();
    formData.append("incidence_type_id", incidentTypeId.toString());
    formData.append("user_id", userId.toString());
    formData.append("incidence_comment", incidentComment);
    formData.append("incidence_resolution", incidentResolution);
    formData.append("origin", origin);
    formData.append("code_invoice", codeInvoice.toString());

    if (file?.uri) {
      formData.append("file", {
        uri: file.uri,
        name: file.fullName || "file.jpg",
        type: file.mimeType || "image/jpeg",
      });
    }

    const response = await fetch(CREATE_INCIDENT, {
      method: "POST",
      headers,
      body: formData,
    });

    const json = await response.json();

    if (response.ok) {
      return processData({ status: response.status, data: json });
    }

    return { hasError: true, message: json?.message ?? "Ocurrió un error" };
  } catch (e) {
    return { hasError: true, message: e?.message ?? "Ocurrió un error" };
  }
};

export const getValidateInvoicesList = async (validatorId) => {
  try {
    const headers = await getAuthHeader();
    const response = await axios.get(VALIDATED_LIST + validatorId, { headers });
    return processData(response);
  } catch (error) {
    return { hasError: true, message: error?.response?.data?.message ?? "Ocurrió un error" };
  }
};
