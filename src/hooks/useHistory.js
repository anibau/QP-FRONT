import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { ActionSaveHistoryItems, ActionSaveItemDetails } from '../redux/actions';
import { store } from '../redux/store/store';
import {getShopHistory} from '../controllers/shop_controller';
import {getInvoiceDetails} from '../controllers/shop_controller';
import _ from "lodash";

export default function useHistory({navigation, withFetch = true, historyItem, lastBuy}) {
    const {
        historyItems, 
        historyPage,
        historyItemsLoading, 
        historyItemsError,
        historyItemDetails,
        historyItemDetailsLoading,
        historyItemDetailsError
    } = useSelector(state => {
        return state.history;
    });

    const [navigating, setNavigating] = useState(false);

    const getHistory = async(reset) => {
        const user = store.getState().auth.user;
        const resp = await getShopHistory(user.id, reset ? 1 : historyPage);
        if (resp.hasError) {
            store.dispatch(ActionSaveHistoryItems({
                historyItems: [],
                historyItemsLoading: false,
                historyItemsError: true,
            }));
        }else{
            const newItems = reset ? resp.data.data : [...historyItems, ...resp.data.data];
            store.dispatch(ActionSaveHistoryItems({
                historyItems: newItems,
                historyPage: reset ? 2 : historyPage + 1,
                historyItemsLoading: false,
                historyItemsError: false,
            }));
        }
    }

    const getDetails = async (item) => {
        store.dispatch(ActionSaveItemDetails({
            historyItemDetails: {
                det: []
            },
            historyItemDetailsLoading: true,
            historyItemDetailsError: false,
        }));
        const details = await getInvoiceDetails(item.id);
        if(!details.hasError){
            store.dispatch(ActionSaveItemDetails({
                historyItemDetails: {
                    det: details.data.det
                },
                historyItemDetailsLoading: false,
                historyItemDetailsError: false,
            }));
        }else{
            store.dispatch(ActionSaveItemDetails({
                historyItemDetails: {
                    det: []
                },
                historyItemDetailsLoading: false,
                historyItemDetailsError: true,
            }));
        }
    }

    const getLastBuy = async() => {
        store.dispatch(ActionSaveItemDetails({
            historyItemDetails: {
                det: []
            },
            historyItemDetailsLoading: true,
            historyItemDetailsError: false,
        }));
        const historyPrev = store.getState().history.historyItems;
        if(Boolean(historyPrev.length)){
            const lastHistoryItem = historyPrev[historyPrev.length - 1];//TODO: Verificar orden
            getDetails(lastHistoryItem);
            return;
        }
        const user = store.getState().auth.user;
        const resp = await getShopHistory(user.id, historyPage);
        if (resp.hasError) {
            store.dispatch(ActionSaveItemDetails({
                historyItemDetails: {
                    det: []
                },
                historyItemDetailsLoading: false,
                historyItemDetailsError: true,
            }));
        }else if (Boolean(resp.data.data.length)){
            getDetails(resp.data.data[resp.data.data.length - 1]);
        }else{
            store.dispatch(ActionSaveItemDetails({
                historyItemDetails: {
                    det: []
                },
                historyItemDetailsLoading: false,
                historyItemDetailsError: false,
            }));
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            if(withFetch){
                getHistory(true);
            }
            if(lastBuy){
                getLastBuy()
            }else{
                if(!_.isNil(historyItem)){
                    getDetails(historyItem);
                }
            }
        });
    }, [navigation]);
    
    return {
        navigating,
        historyItems, 
        historyItemsLoading, 
        historyItemsError,
        historyItemDetails,
        historyItemDetailsLoading,
        historyItemDetailsError,
        getHistory,
        getLastBuy,
        setNavigating
    };
}