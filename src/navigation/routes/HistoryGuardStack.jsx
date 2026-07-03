import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { HistoryGuardPage} from '../../screens/history/HistoryGuardPage';
import { authenticatedGuardHistoryStack } from '../../config/navigation';

const Stack = createStackNavigator();


export const HistoryGuardStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedGuardHistoryStack.home}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedGuardHistoryStack.home}
                component={HistoryGuardPage}
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