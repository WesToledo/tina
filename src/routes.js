import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";

import { SignInScreen } from "src/screens/SignIn";
import { SignUpScreen } from "src/screens/SignUp";
import { RecoverPasswordScreen } from "src/screens/RecoverPassword";
import { PersonalDataScreen } from "src/screens/PersonalData";

import { HomeScreen } from "screens/Home";
import { SearchScreen } from "screens/Search";
import { ProfileScreen } from "screens/Profile";

import { ConfigurationScreen } from "screens/Profile/Configuration";
import useStore from "./store";

const { Navigator, Screen } = createBottomTabNavigator();
const RootStack = createStackNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const VitalsIcon = (props) => <Icon {...props} name="activity-outline" />;
const HeartIcon = (props) => <Icon {...props} name="heart-outline" />;
const CloudIcon = (props) => <Icon {...props} name="cloud-download-outline" />;
const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Calendário" icon={HomeIcon} />
    <BottomNavigationTab title="Mamas" icon={VitalsIcon} />
    <BottomNavigationTab title="Saúde Genital" icon={HeartIcon} />
    {/* <BottomNavigationTab title="Downloads" icon={CloudIcon} /> */}
    <BottomNavigationTab title="Perfil" icon={PersonIcon} />
  </BottomNavigation>
);

function TabNavigator() {
  return (
    <>
      <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        {/* gambiarra */}

        <Screen name="Home" component={HomeScreen} />
        <Screen name="Search" component={SearchScreen} />
        {/* <Screen name="Creators" component={CreatorsScreen} /> */}
        {/* <Screen name="Downloads" component={DownloadsScreen} /> */}
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="AlbumDetails" component={ProfileScreen} />
        {/* <Screen name="Orders" component={OrdersScreen} /> */}
      </Navigator>
    </>
  );
}

function RootStackScreen() {
  const state = useStore();

  console.log(state);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
      {true ? (
        <>
          <RootStack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />

          <RootStack.Screen
            name="Configuration"
            component={ConfigurationScreen}
            screenOptions={{
              headerShown: true,
            }}
          />
        </>
      ) : (
        <></>
      )}
    </RootStack.Navigator>
  );
}

export function AppNavigator() {
  const authenticated = useStore((state) => state.authenticated);

  return (
    <NavigationContainer>
      {!authenticated ? (
        <RootStack.Navigator>
          <RootStack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ title: "" }}
          />
          <RootStack.Screen
            name="Recover"
            component={RecoverPasswordScreen}
            options={{ title: "" }}
          />
          <RootStack.Screen
            name="PersonalData"
            component={PersonalDataScreen}
            options={{ title: "", headerShown: false }}
          />
        </RootStack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
}
