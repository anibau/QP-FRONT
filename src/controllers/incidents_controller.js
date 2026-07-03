import axios from "axios";
import { Platform } from "react-native";
import {
  INCIDENTS_BY_USER,
  INCIDENT_TYPES,
  INCIDENT_DETAILS,
  CREATE_INCIDENT,
} from '../utils/urls';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ASYNCSTORAGE_KEY } from '../config/constants';
import { processData } from '../utils/utils';

export const getIncidentsByUser = async (userId) => {
  try {
    const auth = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
    const { access_token } = JSON.parse(auth || "{}");

    const url = INCIDENTS_BY_USER + userId;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

export const getIncidentTypes = async () => {
  try {
    const auth = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
    const { access_token } = JSON.parse(auth || "{}");

    const response = await axios.get(INCIDENT_TYPES, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

export const getIncidentDetails = async (incidentId) => {
  try {
    const auth = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
    const { access_token } = JSON.parse(auth || "{}");

    const url = INCIDENT_DETAILS + incidentId;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return processData(response);
  } catch (error) {
    return {
      hasError: true,
      message: error?.response?.data?.message ?? "Ocurrió un error",
    };
  }
};

export const createIncident = async (
  incidentTypeId,
  userId,
  incidentComment,
  file,
  storeId
) => {
  try {
    const auth = await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY);
    const { access_token } = JSON.parse(auth || "{}");

    const formData = new FormData();
    formData.append("incidence_type_id", incidentTypeId.toString());
    formData.append("user_id", userId.toString());
    formData.append("incidence_comment", incidentComment);
    formData.append("incidence_company_id", storeId.toString());

    if (file?.uri) {
      formData.append("file", {
        uri: file.uri,
        name: file.fullName || "file.jpg",
        type: file.mimeType || "image/jpeg",
      });
    }

    const response = await fetch(CREATE_INCIDENT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        // OJO: NO setear Content-Type manualmente para multipart en fetch
      },
      body: formData,
    });

    const json = await response.json();

    if (response.ok) {
      return processData({
        status: response.status,
        data: json,
      });
    }

    return {
      hasError: true,
      message: json?.message ?? "Ocurrió un error",
    };
  } catch (e) {
    return {
      hasError: true,
      message: e?.message ?? "Ocurrió un error",
    };
  }
};
