import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import TabIcon from "./TabIcon";
import Auth from "../Screens/Auth";
import SomePage from "../Screens/SomePage";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const AppStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Auth" component={Auth} />
      <HomeStack.Screen name="Tabs" component={Tabs} />
    </HomeStack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Tabs", {
              screen: "Profile",
            });
          },
        })}
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: () => <TabIcon img={require("../assets/home.png")} />,
        }}
      />
      <Tab.Screen
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Tabs", {
              screen: "SomePage",
            });
          },
        })}
        name="SomePage"
        component={SomePage}
        options={{
          tabBarIcon: () => <TabIcon img={require("../assets/list.png")} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AppStackScreen />
    </NavigationContainer>
  );
};
