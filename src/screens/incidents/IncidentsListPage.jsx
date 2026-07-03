import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, Dimensions, ScrollView, Platform} from 'react-native';
import {AppBar} from '../../ui/general/AppBar';
import {texts} from '../../utils/styles';
import {IncidentItem} from '../../ui/pages/incidents/IncidentItem';
import {FixedFilledButton} from '../../ui/general/FixedFilledButton';
import { authenticatedGeneralStack } from '../../config/navigation';
import {getIncidentsByUser} from '../../controllers/incidents_controller';
import { Info } from '../../ui/modal/Info';
import { store } from '../../redux/store/store';
import {getIncidentTypes} from '../../controllers/incidents_controller';

const screenHeight = Dimensions.get('window').height;

export const IncidentsListPage = ({navigation}) => {

    const [loadingState, setLoadingState] = useState({
        loading: false,
        display: false,
        info: false
    });

    const [navigating, setNavigating] = useState(false);

    const [incidentsList, setIncidentsList] = useState([]);
    
    const getIncidents = async() => {
        setLoadingState({
            ...loadingState,
            loading: true,
            display: true
        });
        const data = store.getState().auth;
        const resp = await getIncidentsByUser(data.user.id);
        setLoadingState({
            ...loadingState,
            loading: false,
            display: false
        });
        if(!resp.hasError){
            setIncidentsList(resp.data);
        }
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNavigating(false);
            getIncidents();
        });
    }, [navigation]);

    return (
        <>
            <SafeAreaView
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flex: 1,
                    height: screenHeight,
                }}
            >
                    <AppBar
                        title="Buzón de incidencias"
                        onPress={()=>{
                            navigation.pop();
                        }}
                    />
                    <View
                        style={{
                            height: screenHeight * 0.1,
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{...texts.titleSection, paddingHorizontal: "5%"}}>
                            Incidencias enviadas
                        </Text>
                    </View>
                    <ScrollView
                        style = {{
                            height: screenHeight * 0.4,
                        }}
                    >
                        {
                            incidentsList.map((element, index) => <IncidentItem
                                key = {element.id}
                                incident = {element}
                                onPressed={()=>{
                                    if(!navigating){
                                        setNavigating(true);
                                        navigation.push(authenticatedGeneralStack.incidentDetail, {
                                            id: element.id,
                                            incident: element
                                        });
                                    }
                                }}
                            />)
                        }
                    </ScrollView>
                    <View
                        style={{
                            height: screenHeight * 0.15
                        }}
                    >
                    </View>
                    <FixedFilledButton
                        onPress={() => {
                            if(!navigating){
                                setNavigating(true);
                                navigation.push(authenticatedGeneralStack.registerIncident)
                            }
                        }}
                        title = {"Nueva incidencia"}
                        bottom = {screenHeight * 0.02}
                    />
                    <Info
                        loading={loadingState.loading}
                        info={loadingState.info}
                        display={loadingState.display}
                    />
            </SafeAreaView>
        </>
    )           
}