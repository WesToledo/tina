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

import Constants from "expo-constants";

import useStore from "src/store";
import { useNavigation } from "@react-navigation/native";

import ListCards from "./components/list.cards.component";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const NotificationScreen = () => {
  const now = new Date();
  const navigation = useNavigation();

  const { exams, appointment } = useStore();

  const list = [
    ...exams.map((exam) => {
      return { ...exam, type: "exam" };
    }),
    ...appointment.map((appointment) => {
      return { ...appointment, type: "appointment" };
    }),
  ].map((reminder) => {
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
  });

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation alignment="left" accessoryLeft={BackAction} />

        <Text category="h4" style={styles.title}>
          Notificações
        </Text>

        <ScrollView>
          <ListCards
            actives={list.filter((reminder) => reminder.active)}
            disableds={list.filter((reminder) => !reminder.active)}
          />
        </ScrollView>
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
