import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Layout, Text, Icon, Avatar } from "@ui-kitten/components";

import { useNavigation } from "@react-navigation/core";

import { Calendar } from "react-native-calendars";

import MainHeader from "src/components/MainHeader";

var height = Dimensions.get("window").height;

const PlaylistIcon = (props) => <Icon {...props} name="layers-outline" />;

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <MainHeader />

        <Layout style={styles.header}>
          <Layout style={styles.header}>
            <Text category="h1" style={styles.title}>
              12
            </Text>
            <Text category="h6">maio</Text>
          </Layout>
        </Layout>
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
  title: {
    padding: 0,
    marginVertical: -5,
    marginHorizontal: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 20,
  },
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
