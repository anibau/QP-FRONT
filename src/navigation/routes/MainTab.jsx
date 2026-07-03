import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import _ from 'lodash';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { CategoriesStack } from '../routes/CategoriesStack';
import { HistoryStack } from '../routes/HistoryStack';
import { PaymentStack } from '../routes/PaymentStack';
import { ProfileStack } from '../routes/ProfileStack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { authenticatedCategoriesStack, authenticatedHistoryStack, authenticatedProfileStack, authenticatedPaymentStack} from '../../config/navigation';

const Tab = createBottomTabNavigator();

const isTabBarVisible = (route) => {
    
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [authenticatedCategoriesStack.main];
    if (hideOnScreens.indexOf(routeName) > -1)
    return false;
    
    return true;
}

const MainTab = (props) => {
    return (
        <Tab.Navigator
            initialRouteName={authenticatedCategoriesStack.main}
            screenOptions={{ 
                gestureEnabled: false,
                "tabBarActiveTintColor": "#e91e63",
                "tabBarActiveBackgroundColor": "#fff",
                "tabBarInactiveBackgroundColor": "#fff",
                "tabBarShowLabel": false,
                "tabBarItemStyle": {
                    "justifyContent": "center"
                },
                "tabBarStyle": [
                    {
                    "display": "flex"
                    },
                    null
                ]
            }}
        >

            <Tab.Screen name={authenticatedCategoriesStack.main} options={({ navigation, route }) => {
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
            }} component={CategoriesStack} />
            <Tab.Screen name={authenticatedHistoryStack.main} options={({ navigation, route }) => {
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
            }} component={HistoryStack} />
            <Tab.Screen name={authenticatedPaymentStack.main} options={({ navigation, route }) => {
                return {
                    tabBarVisible: isTabBarVisible(!_.isNil(route) ? route : null),
                    headerShown: false,
                    tabBarIcon: (props) => {
                        return (props.focused ?
                            <View
                                style= {styles.itemSelected}
                            >
                                <Image resizeMode={"contain"} style={{ width: 19, height: 19, }} source={require("../../assets/icons/finance_selected.png")} />
                            </View>:
                            <Image resizeMode={"stretch"} style={{ width: 19, height: 16, }} source={require("../../assets/icons/finance.png")} />
                        )
                    }
                }
            }} component={PaymentStack} />
            <Tab.Screen name={authenticatedProfileStack.main} options={({ navigation, route }) => {
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
            }} component={ProfileStack} />
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
export default function MainTabWrapper(props) {
    const insets = useSafeAreaInsets();
    return <MainTab {...props} insetsBottom={insets.bottom} />;
}