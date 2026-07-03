import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { SignInPage } from '../../screens/login/SignInPage';
import { SignUpPage } from '../../screens/login/SignUpPage';
import { RecoverPasswordStep1 } from '../../screens/login/RecoverPasswordStep1';
import { TermsPage } from '../../screens/login/TermsPage';
import { PrivacyPolicyPage } from '../../screens/login/PrivacyPolicyPage';
import { initialStack } from '../../config/navigation';

const Stack = createStackNavigator();

export const NotAuthenticatedRoutes = () => {
    return (
        <Stack.Navigator
            initialRouteName= {initialStack.sign_in}
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name = {initialStack.sign_in} component={SignInPage}/>
            <Stack.Screen name = {initialStack.sign_up} component={SignUpPage}/>
            <Stack.Screen name = {initialStack.recover_pass_1} component={RecoverPasswordStep1}/>
            <Stack.Screen name = {initialStack.terms} component={TermsPage}/>
            <Stack.Screen name = {initialStack.privacy} component={PrivacyPolicyPage}/>
        </Stack.Navigator>
    )
}
