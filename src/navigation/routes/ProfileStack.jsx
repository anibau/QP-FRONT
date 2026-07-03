import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileMainPage} from '../../screens/profile/ProfileMainPage';

const Stack = createStackNavigator();

import { authenticatedProfileStack } from '../../config/navigation';

export const ProfileStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedProfileStack.home}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedProfileStack.home}
                component={ProfileMainPage}
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