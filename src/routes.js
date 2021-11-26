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

import { TrackDetailsScreen } from "src/screens/Details";
import { TrackPlayer } from "src/screens/TrackBottomPlayer/index";

import { PlaylistScreen } from "screens/Playlist";

import { AlbumDetailsScreen } from "screens/AlbumDetails";

import { ConfigurationScreen } from "screens/Profile/Configuration";

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
  const playlist = useSelector((state) => state.playlist);
  const playback = useSelector((state) => state.playback);

  return (
    <>
      {playlist.podcasts.length != 0 ? <TrackPlayer /> : <></>}

      <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
        {/* gambiarra */}

        <Screen name="Home" component={HomeScreen} />
        <Screen name="Search" component={SearchScreen} />
        {/* <Screen name="Creators" component={CreatorsScreen} /> */}
        {/* <Screen name="Downloads" component={DownloadsScreen} /> */}
        <Screen name="Profile" component={ProfileScreen} />
        <Screen name="AlbumDetails" component={AlbumDetailsScreen} />
        {/* <Screen name="Orders" component={OrdersScreen} /> */}
      </Navigator>
    </>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}
    >
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
    </RootStack.Navigator>
  );
}

export function AppNavigator() {
  const { authenticated } = useSelector((state) => state.auth);
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
        </RootStack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
}
