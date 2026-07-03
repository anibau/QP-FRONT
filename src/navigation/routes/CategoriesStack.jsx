import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from '@react-navigation/stack';
import { CategoriesMainPage} from '../../screens/categories/CategoriesMainPage';
import { authenticatedCategoriesStack } from '../../config/navigation';

const Stack = createStackNavigator();


export const CategoriesStack = ({navigation}) => {
    return (
        <Stack.Navigator
            initialRouteName={authenticatedCategoriesStack.home}
            screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen
                name={authenticatedCategoriesStack.home}
                component={CategoriesMainPage}
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