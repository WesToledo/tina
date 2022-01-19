import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import {
  Icon,
  Layout,
  Input,
  TopNavigation,
  Text,
  Spinner,
} from "@ui-kitten/components";
import Constants from "expo-constants";

import api from "src/services/api";

const SearchIcon = (props) => <Icon {...props} name="search-outline" />;

import { ListCards } from "./components/list.cards.component";

export const SearchScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="" alignment="center" />

        <ScrollView>
          <Text category="h4" style={styles.title}>
            Buscar
          </Text>
          <Layout style={{ flex: 1 }}>
            <Input
              label=""
              autoComplete="off"
              placeholder="Procure por um podcast"
              accessoryLeft={SearchIcon}
              // onChangeText={(nextValue) => setValue(nextValue)}
              onChangeText={(text) => setSearchTerm(text)}
              style={styles.search_input}
            />
          </Layout>
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
});
