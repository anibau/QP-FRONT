import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';

import { IncidentsListPage} from '../../screens/incidents/IncidentsListPage';
import { IncidentDetailsPage} from '../../screens/incidents/IncidentDetailsPage';
import { IncidentRegisterPage} from '../../screens/incidents/IncidentRegisterPage';

const Stack = createStackNavigator();

import { authenticatedGeneralStack } from '../../config/navigation';

export const IncidentsStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedGeneralStack.incidentsList}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedGeneralStack.incidentsList}
                component={IncidentsListPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedGeneralStack.incidentDetail}
                component={IncidentDetailsPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedGeneralStack.registerIncident}
                component={IncidentRegisterPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false
                    }
                }}
            />
        </Stack.Navigator>
    );
}