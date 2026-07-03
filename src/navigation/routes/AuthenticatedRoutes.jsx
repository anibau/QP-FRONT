import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { authenticatedStack } from '../../config/navigation';
import MainTab from '../routes/MainTab';
import { TendsPage} from '../../screens/categories/TendsPage';
import { ParkingPage} from '../../screens/categories/ParkingPage';
import { authenticatedCategoriesStack, authenticatedGeneralStack, authenticatedHistoryStack, authenticatedPaymentStack } from '../../config/navigation';
import { ParkingSelect } from '../../screens/categories/ParkingSelect';
import { ParkingPayPage } from '../../screens/categories/ParkingPayPage';
import { ServicesPage } from '../../screens/categories/ServicesPage';
import { ServicesPayPage } from '../../screens/categories/ServicesPayPage';
import { TendsBuyPage } from '../../screens/categories/TendsBuyPage';
import { ProductScannPage } from '../../screens/categories/ProductScannPage';
import { TendsCheckoutPage } from '../../screens/categories/TendsCheckoutPage';
import { TendsBuyReceiptPage } from '../../screens/categories/TendsBuyReceiptPage';
import { SuggestionsPage } from '../../screens/general/SuggestionsPage';
import { IncidentsListPage } from '../../screens/incidents/IncidentsListPage';
import { IncidentDetailsPage } from '../../screens/incidents/IncidentDetailsPage';
import { IncidentRegisterPage } from '../../screens/incidents/IncidentRegisterPage';
import { HistoryDetailsPage } from '../../screens/history/HistoryDetailsPage';
import { PaymentRegisterCardScreen } from '../../screens/payment/PaymentRegisterCardScreen';


const Stack = createStackNavigator();

export const AuthenticatedRoutes = (props) => {
    return (
        <Stack.Navigator
            {...props}
            initialRouteName= {authenticatedStack.main}
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name= {authenticatedStack.main}
                component={MainTab}
                options={({ navigation, route }) => {
                    return {
                        headerShown: false
                    }
                }}>
            </Stack.Screen>
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
            <Stack.Screen
                name={authenticatedCategoriesStack.tends}
                component={TendsPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.tendsBuy}
                component={TendsBuyPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.tendsCheckout}
                component={TendsCheckoutPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.tendsReceipt}
                component={TendsBuyReceiptPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.productScann}
                component={ProductScannPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.parking}
                component={ParkingPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.parkingSelect}
                component={ParkingSelect}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.parkingPay}
                component={ParkingPayPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.services}
                component={ServicesPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedCategoriesStack.servicesPay}
                component={ServicesPayPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedGeneralStack.suggestions}
                component={SuggestionsPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            <Stack.Screen
                name={authenticatedHistoryStack.details}
                component={HistoryDetailsPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
            {/* <Stack.Screen
                name={authenticatedPaymentStack.register}
                component={PaymentRegisterPage}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            /> */}
            <Stack.Screen
                name={authenticatedPaymentStack.register_form}
                component={PaymentRegisterCardScreen}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: null,
                        headerShown: false,
                        tabBarVisible:false,
                    }
                }}
            />
        </Stack.Navigator>
    )
}
