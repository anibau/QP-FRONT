import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';

import { HistoryMainPage} from '../../screens/history/HistoryMainPage';

const Stack = createStackNavigator();

import { authenticatedHistoryStack } from '../../config/navigation';

export const HistoryStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedHistoryStack.home}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedHistoryStack.home}
                component={HistoryMainPage}
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