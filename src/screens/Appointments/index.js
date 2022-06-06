import React, { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import {
  Icon,
  Layout,
  Input,
  TopNavigation,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";

import { default as theme } from "../../../custom-theme.json";

import Constants from "expo-constants";

import MainHeader from "src/components/MainHeader";

import useStore from "src/store";
import { useNavigation } from "@react-navigation/native";

import { FloatingAction } from "react-native-floating-action";

import ListCards from "./components/list.cards.component";

const actions = [
  {
    color: theme["color-primary-500"],
    text: "Voltar",
    icon: (
      <Icon style={{ width: 20, height: 20 }} fill="#fff" name="arrow-back" />
    ),
    name: "back",
    position: 1,
  },
  {
    text: "Marcar Consulta",
    color: theme["color-primary-500"],
    icon: (
      <Icon style={{ width: 20, height: 20 }} fill="#fff" name="plus-outline" />
    ),
    name: "report",
    position: 2,
  },
];

export const AppointmentsScreen = () => {
  const now = new Date();
  const navigation = useNavigation();

  const { appointment } = useStore();

  const list = appointment
    .map((reminder) => {
      if (new Date(reminder.date) > now) {
        return {
          ...reminder,
          active: true,
        };
      } else {
        return {
          ...reminder,
          active: false,
        };
      }
    })
    .map((appointment) => {
      return { ...appointment, type: "appointment" };
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <MainHeader />
        {/* <TopNavigation
          alignment="left"
          accessoryLeft={BackAction}
          accessoryRight={() => (
            <TopNavigationAction
              icon={GearIcon}
              onPress={handleNavigateConfigScreen}
            />
          )}
        /> */}
        {/* <TopNavigation
          style={styles.top}
          alignment="left"
          accessoryRight={() => (
            <Button
              accessoryLeft={ExamIcon}
              style={styles.button}
              appearance="filled"
              onPress={handleAddNewExam}
            >
              Marcar Exame
            </Button>
          )}
          accessoryLeft={() => (
            <Button
              accessoryLeft={AppointmenntIcon}
              style={styles.button}
              appearance="filled"
              onPress={handleAddNewAppointment}
            >
              Marcar Consulta
            </Button>
          )}
        /> */}

        <Text category="h4" style={styles.title}>
          Consultas
        </Text>
        <ScrollView>
          {/* <Layout style={{ flex: 1 }}>
            <Input
              label=""
              autoComplete="off"
              placeholder="Procure por um podcast"
              accessoryLeft={SearchIcon}
              // onChangeText={(nextValue) => setValue(nextValue)}
              onChangeText={(text) => setSearchTerm(text)}
              style={styles.search_input}
            />
          </Layout> */}

          <ListCards
            actives={list.filter((reminder) => reminder.active)}
            disableds={list.filter((reminder) => !reminder.active)}
          />
        </ScrollView>
        <FloatingAction
          tintColor={null}
          actions={actions}
          color={theme["color-primary-500"]}
          onPressItem={(name) => {
            const navigations = {
              back: () => {
                navigation.goBack();
              },
              report: () => {
                navigation.navigate("CreateAppointment");
              },
            };
            console.log(`selected button: ${name}`);
            navigations[name]();
          }}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    marginLeft: 15,
    marginVertical: 15,
    fontWeight: "bold",
  },
  search_input: {
    margin: 15,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
  top: {
    margin: 10,
  },
});
