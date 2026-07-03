import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, Dimensions, FlatList, Modal, ActivityIndicator} from 'react-native';
import Container from '../../ui/container/Container';
import {MainAppBar} from '../../ui/general/MainAppBar';
import { authenticatedGeneralStack, authenticatedHistoryStack } from '../../config/navigation';
import {texts} from '../../utils/styles';
import {HistoryListItem} from '../../ui/pages/history/HistoryListItem';
import {Divider} from '../../ui/general/Divider';
import { useSelector } from 'react-redux';
import useHistory from '../../hooks/useHistory';
import {LoadingView} from '../../ui/general/LoadingView';
import {ErrorView} from '../../ui/general/ErrorView';
import { EmptyView } from '../../ui/general/EmptyView';
import { useCards } from '../../hooks/useCards';
import { Info } from '../../ui/modal/Info';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const HistoryMainPage = ({navigation}) => {

    const general = useSelector(state => {
        return state.general;
    });

    const [showRetryModal, setShowRetryModal] = useState(false);
    const [elementSelected, setElementSelected] = useState({});

    const {
        navigating,
        setNavigating,
        historyItems, 
        historyItemsLoading, 
        historyItemsError,
        getHistory
    } = useHistory({navigation});

    const {
        retryLoadingState,
        retryPayment
    } = useCards({navigation});

    useEffect(() => {
      if(!retryLoadingState.loading && retryLoadingState.success){
        getHistory(true);
      }
    }, [retryLoadingState]);

    const renderFooter = () => {
        return historyItemsLoading ? <ActivityIndicator size="large" /> : null;
    };

    return (
        <>
            <Container>
                <View
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                    enableOnAndroid
                >
                    <MainAppBar
                        title = {general.address}
                        marginBottom={"5%"}
                        goToShops={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedHistoryStack.details, {
                                    lastBuy: true
                                });
                            }
                        }}
                        goToSuggestions={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedGeneralStack.suggestions);
                            }
                        }}
                        goToIncidents={()=>{
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedGeneralStack.incidentsList);
                            }
                        }}
                    />
                    <Text style={{...texts.titleSection, marginBottom: "1%", paddingHorizontal: "5%"}}>
                        Historial de compras
                    </Text>
                    {
                        historyItemsLoading && !historyItemsError ? <LoadingView
                            heightPercentage = {60}
                        /> : null
                    }
                    {
                        !historyItemsLoading && historyItemsError ? <ErrorView
                            heightPercentage = {60}
                        /> : null
                    }
                    {
                        !historyItemsLoading && !historyItemsError && !Boolean(historyItems.length) ? <EmptyView
                            heightPercentage = {60}
                        /> : null
                    }
                    {
                        (historyItems.length > 0 && !historyItemsError) && <FlatList
                        style = {{
                            height: screenHeight * 0.8
                        }}
                        data={historyItems}
                        keyExtractor={(item, index) => `${item.id}`}
                        renderItem={({item}) => {
                            return (
                                <View>
                                    <HistoryListItem
                                        item={item}
                                        onPressed={()=>{
                                            if(item.payed == 0){
                                                setElementSelected(item);
                                                setShowRetryModal();
                                                return;
                                            }
                                            if(navigating) return;
                                            setNavigating(true);
                                            navigation.push(authenticatedHistoryStack.details, {
                                                invoice: item,
                                                shopName: item.Titulo
                                            });
                                        }}
                                    />
                                    <Divider
                                        key = {`${item.id}_divider`}
                                        marginVertical = {0}
                                    />
                                </View>
                            );
                        }}
                        onEndReached={()=>{
                            getHistory(false);
                        }}
                        onEndReachedThreshold={0.8} // Load more data when reaching 50% of the end of the list
                        ListFooterComponent={renderFooter}
                        />
                    }
                </View>
            </Container>
            <Info
                loading={retryLoadingState.loading}
                info={retryLoadingState.info}
                display={retryLoadingState.display}
            />
            <Modal
                visible={showRetryModal}
                onRequestClose={() => setShowRetryModal(false)}
                transparent
                animationType="fade"
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ 
                    padding: 20, 
                    borderRadius: 10,
                    width: screenWidth * 0.8,
                    backgroundColor: 'white'
                }}>
                <Text style = {{
                    fontWeight: "bold",
                    marginBottom: 10
                }}>¿Desea reintentar la compra?</Text>
                <Text>{`Se usará la tarjeta activa`}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => setShowRetryModal(false)}>
                    <Text style={{ marginRight: 20 }}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{
                        setShowRetryModal(false);
                        retryPayment(elementSelected)
                    }}>
                    <Text style = {{color: "#FF3128"}}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </View>
            </Modal>
        </>
    )           
}