import { useState } from "react";
import {createCard} from '../controllers/cards_controller';
import Toast from 'react-native-toast-message';

export function useCreateCard() {
    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const createUserCard = async(body) => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await createCard(body);
        if(resp.hasError){
            setLoadingState({
                ...loadingState,
                loading: false,
                display: false
            });
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: resp.message,
                position: "bottom"
            });
            return false;
        }else{
            setLoadingState({
                ...loadingState,
                loading: false,
                display: false
            });
            return true;
        }
    }

    return {
        createUserCard,
        loadingState
    };
}