import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import _ from 'lodash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { CategoriesGuardStack } from '../routes/CategoriesGuardStack';
import { HistoryGuardStack } from '../routes/HistoryGuardStack';
import { ProfileGuardStack } from '../routes/ProfileGuardStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { 
    authenticatedGuardStack, 
    authenticatedGuardHomeStack, 
    authenticatedGuardHistoryStack,
    authenticatedGuardProfileStack
} from '../../config/navigation';

const Tab = createBottomTabNavigator();

const isTabBarVisible = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [authenticatedGuardStack.home];
    if (hideOnScreens.indexOf(routeName) > -1)
    return false;
    
    return true;
}

const MainTabGuard = (props) => {
    return (
        <Tab.Navigator
            initialRouteName={authenticatedGuardStack.home}
            screenOptions={{ 
                gestureEnabled: false,
                "tabBarActiveTintColor": "#e91e63",
                "tabBarActiveBackgroundColor": "#fff",
                "tabBarInactiveBackgroundColor": "#fff",
                "tabBarShowLabel": false,
                "tabBarItemStyle": {
                    "justifyContent": "center",
                },
                "indicatorStyle": {
                    "backgroundColor": 'red',
                    
                },
                "tabBarStyle": {
                    "borderTopWidth": 1
                },
            }}
        >

            <Tab.Screen name={authenticatedGuardHomeStack.tab} options={({ navigation, route }) => {
                return {
                    tabBarVisible: isTabBarVisible(!_.isNil(route) ? route : null),
                    headerShown: false,
                    tabBarIcon: (props) => {
                        return (props.focused ?
                            <View
                                style= {styles.itemSelected}
                            >
                                <Image resizeMode={"contain"} style={{ width: 19, height: 19, }} source={require("../../assets/icons/home_selected.png")} />
                            </View>:
                            <Image style={{ width: 19, height: 19, }} source={require("../../assets/icons/home.png")} />
                        )
                    }
                }
            }} component={CategoriesGuardStack} />
            <Tab.Screen name={authenticatedGuardHistoryStack.tab} options={({ navigation, route }) => {
                return {
                    tabBarVisible: isTabBarVisible(!_.isNil(route) ? route : null),
                    headerShown: false,
                    tabBarIcon: (props) => {
                        return (props.focused ?
                            <View
                                style= {styles.itemSelected}
                            >
                                <Image resizeMode={"contain"} style={{ width: 19, height: 19, }} source={require("../../assets/icons/shopping_selected.png")} />
                            </View>:
                            <Image style={{ width: 19, height: 19, }} source={require("../../assets/icons/shopping.png")} />
                        )
                    }
                }
            }} component={HistoryGuardStack} />
            <Tab.Screen name={authenticatedGuardProfileStack.tab} options={({ navigation, route }) => {
                return {
                    tabBarVisible: isTabBarVisible(!_.isNil(route) ? route : null),
                    headerShown: false,
                    tabBarIcon: (props) => {
                        return (props.focused ?
                            <View
                                style= {styles.itemSelected}
                            >
                                <Image resizeMode={"contain"} style={{ width: 19, height: 19, }} source={require("../../assets/icons/profile_selected.png")} />
                            </View>:
                            <Image style={{ width: 19, height: 19, }} source={require("../../assets/icons/profile.png")} />
                        )
                    }
                }
            }} component={ProfileGuardStack} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    itemSelected: {
        flex: 1,
        justifyContent: "center",
        borderTopColor: "red",
        borderTopWidth: 3,
        width: 40,
        alignItems: "center"
    }
})
export default function MainTabGuardWrapper(props) {
    const insets = useSafeAreaInsets();
    return <MainTabGuard {...props} insetsBottom={insets.bottom} />;
}