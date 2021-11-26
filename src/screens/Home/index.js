import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Dimensions } from "react-native";
import Constants from "expo-constants";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Spinner,
  Avatar,
} from "@ui-kitten/components";

import { Section } from "./components/section.component";
import api from "src/services/api";
import { useNavigationuseIsFocused } from "@react-navigation/core";

import { Calendar } from "react-native-calendars";

var height = Dimensions.get("window").height;

const PlaylistIcon = (props) => <Icon {...props} name="layers-outline" />;

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title="TINA"
          alignment="left"
          accessoryRight={() => (
            <Avatar size="large" source={require("src/assets/tina.jpeg")} />
          )}
        />
        <Calendar
          // Collection of dates that have to be marked. Default = {}
          markedDates={{
            "2021-05-16": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
            "2012-05-17": { marked: true },
            "2012-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
            "2012-05-19": { disabled: true, disableTouchEvent: true },
          }}
        />
        <ScrollView style={{ marginBottom: 70 }}></ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  spinner: {
    height: height - 180,
    justifyContent: "center",
    alignItems: "center",
  },
});
