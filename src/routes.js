import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import * as Notifications from "expo-notifications";

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

import { ExamsScreen } from "src/screens/Exams";
import { AppointmentsScreen } from "src/screens/Appointments";
import { CreateExamScreen } from "src/screens/Exams/CreateExam";
import { CreateAppointmentScreen } from "src/screens/Appointments/CreateAppointment";

import { ConfigurationScreen } from "screens/Profile/Configuration";
import { RemindersConfigScreen } from "screens/RemindersConfig";
import useStore from "./store";
import { CreateGenitalReportScreen } from "./screens/Genital/CreateGenitalReport";

import { ConfigReminderPillScreen } from "./screens/RemindersConfig/ConfigReminderPill";
import { ConfigReminderColectorScreen } from "./screens/RemindersConfig/ConfigReminderColector";

const { Navigator, Screen } = createBottomTabNavigator();
const RootStack = createStackNavigator();

const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
const VitalsIcon = (props) => <Icon {...props} name="activity-outline" />;
const HeartIcon = (props) => <Icon {...props} name="heart-outline" />;
const ClipboardIcon = (props) => <Icon {...props} name="clipboard-outline" />;
const PersonIcon = (props) => <Icon {...props} name="person-outline" />;

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
          component={ExamsScreen}
          options={{ title: "", headerShown: false }}
        />
        <Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "", headerShown: false }}
        />
      </RootStack.Navigator>
    </>
  );
}

export function AppNavigator() {
  const { authenticated, user } = useStore();

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
          </>
        ) : (
          <>
            {!user.clinical_data.aswered && (
              <>
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
            )}
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
              name="Exam"
              component={ExamsScreen}
              options={{
                headerShown: false,
              }}
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
              name="Appointment"
              component={AppointmentsScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="CreateAppointment"
              component={CreateAppointmentScreen}
              // options={{
              //   headerShown: false,
              // }}
              options={{ title: "" }}
            />
            <RootStack.Screen
              name="ConfigReminderPillScreen"
              component={ConfigReminderPillScreen}
              // options={{
              //   headerShown: false,
              // }}
              options={{ title: "" }}
            />
            <RootStack.Screen
              name="ConfigReminderColectorScreen"
              component={ConfigReminderColectorScreen}
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
