import { useEffect } from "react";
import {getTendsList} from '../controllers/shop_controller';
import { ActionSaveStores } from '../redux/actions';
import { store } from '../redux/store/store';
import { useSelector } from 'react-redux';

export function useStores() {

    const {
        storesList, 
        storesListLoading, 
        storesListError,
    } = useSelector(state => {
        return (state).shopping;
    });

    const getStores = async(body) => {
        const resp = await getTendsList();
        if(resp.hasError){
            store.dispatch(ActionSaveStores({
                storesList: [],
                storesListLoading: false,
                storesListError: true,
            }));
        }else{
            store.dispatch(ActionSaveStores({
                storesList: resp.data.data,
                storesListLoading: false,
                storesListError: false,
            }));
        }
    }

    useEffect(() => {
        getStores();
    }, []);

    return {
        storesList, 
        storesListLoading, 
        storesListError,
    };
}