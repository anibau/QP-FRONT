import axios from "axios";
import {CHANGE_TOKEN, CHANGE_PASSWORD} from '../utils/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_ASYNCSTORAGE_KEY} from '../config/constants';

export const changeTokenStatus =  async (email, state) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const response = await axios.post(CHANGE_TOKEN,{
            email: email,
            state: state
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}` 
            }
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
export const changePassword =  async (email, oldPassword, newPassword) => {
    try{
        let {access_token} = JSON.parse(await AsyncStorage.getItem(AUTH_ASYNCSTORAGE_KEY));
        const response = await axios.post(CHANGE_PASSWORD,{
            email: email,
            old_password: oldPassword,
            password: newPassword,
            password_confirmation: newPassword
        }, {
            headers: {
                'Authorization': `Bearer ${access_token}` 
            }
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
const processData = (response) =>{
    if(response.status === 200){
        if(response.data.success){
            const data = response.data;
            return {
                hasError: false,
                message: data.message,
                data: data.data
            }
        }else{
            return {
                hasError: true,
                message: response.data.message ?? "Ocurrió un error",
            }
        }
    }else{
        return {
            hasError: true,
            message: response.data.message ?? "Ocurrió un error",
        }
    }
}