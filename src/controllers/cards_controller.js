import axios from "axios";
import {
    GET_CARDS_LIST,
    CARD_FAVORIT
} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_ASYNCSTORAGE_KEY} from '../config/constants';
import {processData} from '../utils/utils';

export const fetchUserCards =  async (userId) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const response = await axios.get(`${GET_CARDS_LIST}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
        });
        const data = processData(response);
        return data; 
    }catch(error){
        return {
            hasError: true,
            message: error.response.data.message ?? "Ocurrió un error",
        }
    }
}
export const getCardById =  async (cardId) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const response = await axios.get(`${GET_CARDS_LIST}/${cardId}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': "application/json",
                "Accept": "application/json" 
            },
        });
        const data = processData(response);
        return data; 
    }catch(error){
        return {
            hasError: true,
            message: error.response.data.message ?? "Ocurrió un error",
        }
    }
}
//EJEMPLO DE BODY
/* {
    // "user_id":2,
    "card_number": "3213810012344215",
    "card_name": "Pablo",
    "card_lastname": "Pablo Demo",
    "card_expiry_date": "12/26",
    "card_cvv": 155
} */
export const createCard =  async (body) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const response = await axios.post(GET_CARDS_LIST, body , {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
        });
        const data = processData(response);
        return data; 
    }catch(error){
        return {
            hasError: true,
            message: error.response.data.message ?? "Ocurrió un error",
        }
    }
}
export const updateCard =  async (body, cardId) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const response = await axios.put(`${GET_CARDS_LIST}/${cardId}`, body , {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
        });
        const data = processData(response);
        return data; 
    }catch(error){
        return {
            hasError: true,
            message: error.response.data.message ?? "Ocurrió un error",
        }
    }
}
//EJEMPLO DE BODY
/* {
    "id": 1,
    "user_id": 1
} */
export const setFavoriteCard =  async (body) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const url = `${CARD_FAVORIT}/${body.id}`;
        console.log("url", url)
        const response = await axios.put(url, {} , {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
        });
        console.log("Data", response.data)
        const data = processData(response);
        return data; 
    }catch(error){
        console.log("error", error.response.data)
        return {
            hasError: true,
            message: error.response.data.message ?? "Ocurrió un error",
        }
    }
}
export const deleteCard =  async (cardId) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const response = await axios.delete(`${GET_CARDS_LIST}/${cardId}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': "application/json",
                "Accept": "application/json"
            },
        });
        const data = processData(response);
        return data; 
    }catch(error){
        return {
            hasError: true,
            message: error.response.data.message ?? "Ocurrió un error",
        }
    }
}