import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';

import { PaymentMainPage} from '../../screens/payment/PaymentMainPage';

const Stack = createStackNavigator();

import { authenticatedPaymentStack } from '../../config/navigation';

export const PaymentStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedPaymentStack.home}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedPaymentStack.home}
                component={PaymentMainPage}
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