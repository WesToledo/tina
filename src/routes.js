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
import { CancerQuestionsScreen } from "src/screens/PersonalData/Cancer";
import { MamografiaQuestionsScreen } from "src/screens/PersonalData/Mamografia";

import SplashScreen from "./screens/SplashScreen/index";

import { HomeScreen } from "screens/Home";

import { MamaScreen } from "src/screens/Mamas";
import { CreateMammaReportScreen } from "src/screens/Mamas/CreateMammaReport";

import { GenitalScreen } from "src/screens/Genital";
import { ProfileScreen } from "screens/Profile";

import { RemindersScreen } from "screens/Reminders";
import { CreateExamScreen } from "src/screens/Reminders/CreateExam";
import { CreateAppointmentScreen } from "src/screens/Reminders/CreateAppointment";

import { ConfigurationScreen } from "screens/Profile/Configuration";
import { RemindersConfigScreen } from "screens/RemindersConfig";
import useStore from "./store";
import { CreateGenitalReportScreen } from "./screens/Genital/CreateGenitalReport";

const { Navigator, Screen } = createBottomTabNavigator();
const RootStack = createStackNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const VitalsIcon = (props) => <Icon {...props} name="activity-outline" />;
const HeartIcon = (props) => <Icon {...props} name="heart-outline" />;
const ClipboardIcon = (props) => <Icon {...props} name="clipboard-outline" />;
const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

// const BottomTabBar = ({ navigation, state }) => (
//   <BottomNavigation
//     selectedIndex={state.index}
//     onSelect={(index) => navigation.navigate(state.routeNames[index])}
//   >
//     <BottomNavigationTab title="Calendário" icon={HomeIcon} />
//     <BottomNavigationTab title="Mamas" icon={VitalsIcon} />
//     <BottomNavigationTab title="Saúde Genital" icon={HeartIcon} />
//     <BottomNavigationTab title="Lembretes" icon={ClipboardIcon} />
//     <BottomNavigationTab title="Perfil" icon={PersonIcon} />
//   </BottomNavigation>
// );

function TabNavigator() {
  const state = useStore();

  console.log("---------------", state);

  return (
    <>
      <RootStack.Navigator>
        <Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "", headerShown: false }}
        />
        <Screen
          name="Mama"
          component={MamaScreen}
          options={{ title: "", headerShown: false }}
        />
        <Screen
          name="Genital"
          component={GenitalScreen}
          options={{ title: "", headerShown: false }}
        />
        <Screen
          name="Lembretes"
          component={RemindersScreen}
          options={{ title: "", headerShown: false }}
        />
        <Screen
          name="AlbumDetails"
          component={ProfileScreen}
          options={{ title: "", headerShown: false }}
        />
      </RootStack.Navigator>
    </>
  );
}

export function AppNavigator() {
  const authenticated = useStore((state) => state.authenticated);

  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {!authenticated ? (
          <>
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
              component={CancerQuestionsScreen}
              options={{ title: "", headerShown: false }}
            />
            <RootStack.Screen
              name="Mamografia"
              component={MamografiaQuestionsScreen}
              options={{ title: "", headerShown: false }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
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
            <RootStack.Screen
              name="RemindersConfig"
              component={RemindersConfigScreen}
              screenOptions={{
                headerShown: false,
              }}
              options={{ title: "", headerShown: false }}
            />
            <RootStack.Screen
              name="CreateMamaReport"
              component={CreateMammaReportScreen}
              // options={{
              //   headerShown: false,
              // }}
              options={{ title: "" }}
            />
            <RootStack.Screen
              name="CreateGenitalReport"
              component={CreateGenitalReportScreen}
              // options={{
              //   headerShown: false,
              // }}
              options={{ title: "" }}
            />
            <RootStack.Screen
              name="CreateExam"
              component={CreateExamScreen}
              // options={{
              //   headerShown: false,
              // }}
              options={{ title: "" }}
            />
            <RootStack.Screen
              name="CreateAppointment"
              component={CreateAppointmentScreen}
              // options={{
              //   headerShown: false,
              // }}
              options={{ title: "" }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
