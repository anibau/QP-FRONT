import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ActionSaveCard } from '../redux/actions/index';
import { store } from '../redux/store/store';
import {fetchUserCards, createCard, deleteCard, setFavoriteCard} from '../controllers/cards_controller';
import {payWithCard} from '../controllers/shop_controller';
import Toast from 'react-native-toast-message';

export function useCards({navigation, withFetch = true}) {
    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });
    const {
        cardsRegistered, 
        cardsLoading, 
        cardsError,
    } = useSelector(state => {
        return (state).payment;
    });
    const getUserCards = async({withLoadingUpdate = false}) => {
        const prevCardList = (store.getState().payment).cardsRegistered;
        const userData = (store.getState().auth).user;
        if(!Boolean(prevCardList.length)){
            store.dispatch(ActionSaveCard({
                cardsLoading: true,
                cardsError: false,
            }));
        }
        const resp = await fetchUserCards(userData.id);
        if(resp.hasError){
            store.dispatch(ActionSaveCard({
                cardsRegistered: [],
                cardsLoading: false,
                cardsError: true,
            }));
        }else{
            resp.data.sort((a, b) => b.card_default - a.card_default);
            store.dispatch(ActionSaveCard({
                cardsRegistered: resp.data,
                cardsLoading: false,
                cardsError: false,
            }));
        }
        if(withLoadingUpdate){
            setLoadingState({
                ...loadingState,
                loading: false,
                display: false
            });
        }
    }
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
    const deleteUserCard = async(cardId) => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await deleteCard(cardId);
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
            getUserCards({
                withLoadingUpdate: true
            });
            return true;
        }
    }
    const setUserFavoritCard = async(body) => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const resp = await setFavoriteCard(body);
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
            Toast.show({
                type: 'success',
                text1: 'Correcto',
                text2: 'Se cambió la tarjeta principal',
                position: "bottom"
            });
            getUserCards({
                withLoadingUpdate: true
            });
            return true;
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(withFetch){
                getUserCards({
                    withLoadingUpdate: false
                });
            }
        });
    }, [navigation]);

    const [retryLoadingState, setRetryLoadingState] = useState({
        loading: false,
        display: false,
        info: false,
        success: false
    });

    const retryPayment = async (bodyPayWithCard) => {
        setRetryLoadingState({
            ...retryLoadingState,
            loading: true,
            display: true,
            success: false
        });
        const resp2 = await payWithCard(bodyPayWithCard);
        if(resp2.hasError){
            setRetryLoadingState({
                ...retryLoadingState,
                loading: false,
                display: false,
                success: false
            });
            Toast.show({
                type: 'error',
                text1: 'No se pudo completar su compra.',
                text2: "Verifique su tarjeta activa",
                position: "bottom",
            });
            return;
        }
        Toast.show({
            type: 'success',
            text1: 'Correcto.',
            text2: "La compra fue completada",
            position: "bottom",
        });
        setRetryLoadingState({
            ...retryLoadingState,
            loading: false,
            display: false,
            success: true
        });
    }
    
    return {
        cardsRegistered,
        cardsLoading,
        cardsError,
        loadingState,
        createUserCard,
        deleteUserCard,
        setUserFavoritCard,
        retryLoadingState,
        retryPayment
    };
}