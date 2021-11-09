import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Dimensions } from "react-native";
import Constants from "expo-constants";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Spinner,
} from "@ui-kitten/components";

import { Section } from "./components/section.component";
import api from "src/services/api";
import { useNavigation, useIsFocused } from "@react-navigation/core";

var height = Dimensions.get("window").height;

const PlaylistIcon = (props) => <Icon {...props} name="layers-outline" />;

export const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title="TINA"
          alignment="center"
          accessoryRight={() => (
            <TopNavigationAction
              icon={PlaylistIcon}
              onPress={() => navigation.navigate("Playlist")}
            />
          )}
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
