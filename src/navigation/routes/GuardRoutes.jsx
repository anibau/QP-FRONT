import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { guardStack, authenticatedGuardHomeStack, authenticatedGeneralStack } from '../../config/navigation';
import MainTabGuard from '../routes/MainTabGuard';
import {ReportGuardPage} from '../../screens/incidents/ReportGuardPage';
import {InvoiceGuardPage} from '../../screens/categories/InvoiceGuardPage';
import {GuardScannPage} from '../../screens/categories/GuardScannPage';
import { SuggestionsPage } from '../../screens/general/SuggestionsPage';
import { IncidentsListPage} from '../../screens/incidents/IncidentsListPage';
import { IncidentDetailsPage} from '../../screens/incidents/IncidentDetailsPage';
import { IncidentRegisterPage} from '../../screens/incidents/IncidentRegisterPage';

const Stack = createStackNavigator();

export const GuardRoutes = (props) => {
    return (
        <Stack.Navigator
            {...props}
            initialRouteName= {guardStack.main}
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name= {guardStack.main}
                component={MainTabGuard}
                options={({ navigation, route }) => {
                    return {
                        headerShown: false
                    }
                }}>
            </Stack.Screen>
            <Stack.Screen name= {authenticatedGuardHomeStack.details}
                component={InvoiceGuardPage}
                options={({ navigation, route }) => {
                    return {
                        headerShown: false
                    }
                }}>
            </Stack.Screen>
            <Stack.Screen name= {authenticatedGuardHomeStack.report}
                component={ReportGuardPage}
                options={({ navigation, route }) => {
                    return {
                        headerShown: false
                    }
                }}>
            </Stack.Screen>
            <Stack.Screen
                name={authenticatedGuardHomeStack.scann}
                component={GuardScannPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedGeneralStack.suggestions}
                component={SuggestionsPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false
                    }
                }}
            />
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
    )
}
