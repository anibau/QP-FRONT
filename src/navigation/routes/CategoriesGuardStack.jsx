import React from 'react';
import _ from 'lodash';
import {createStackNavigator} from '@react-navigation/stack';
import {CategoriesGuardPage} from '../../screens/categories/CategoriesGuardPage';
import {GuardScannPage} from '../../screens/categories/GuardScannPage';
import {authenticatedGuardHomeStack} from '../../config/navigation';

const Stack = createStackNavigator();


export const CategoriesGuardStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedGuardHomeStack.home}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedGuardHomeStack.home}
                component={CategoriesGuardPage}
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