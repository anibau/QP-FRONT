import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileMainPage} from '../../screens/profile/ProfileMainPage';
import { authenticatedGuardProfileStack } from '../../config/navigation';

const Stack = createStackNavigator();

export const ProfileGuardStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedGuardProfileStack.home}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedGuardProfileStack.home}
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