import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import {
  Icon,
  Layout,
  TopNavigation,
  Text,
  Button,
} from "@ui-kitten/components";

import { default as theme } from "../../../custom-theme.json";

import Constants from "expo-constants";

import MainHeader from "src/components/MainHeader";

import { ListCards } from "./components/list.cards.component";
import useStore from "src/store";
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from "@react-navigation/native";

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
    text: "Reportar problema",
    color: theme["color-primary-500"],
    icon: (
      <Icon style={{ width: 20, height: 20 }} fill="#fff" name="alert-circle" />
    ),
    name: "report",
    position: 2,
  },
];
export const GenitalScreen = () => {
  const navigation = useNavigation();

  const { genital } = useStore();

  console.log("genital", genital);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <MainHeader />
        {/* <TopNavigation
          alignment="left"
          accessoryRight={() => (
            <Button
              style={styles.button}
              appearance="filled"
              onPress={handleAddNewOcurrency}
            >
              Reportar Problema
            </Button>
          )}
        /> */}

        <ScrollView>
          <Text category="h4" style={styles.title}>
            Saúde das Partes Íntimas
          </Text>
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
          <ListCards genital={genital} />
        </ScrollView>
      </Layout>
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
              navigation.navigate("CreateGenitalReport");
            },
          };
          console.log(`selected button: ${name}`);
          navigations[name]();
        }}
      />
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
});
