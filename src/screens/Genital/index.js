import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import {
  Icon,
  Layout,
  Input,
  TopNavigation,
  Text,
  Spinner,
  Avatar,
  Button,
} from "@ui-kitten/components";

import { ModalCreateGenitalOcurrency } from "./components/modal.create.component";

import Constants from "expo-constants";

import MainHeader from "src/components/MainHeader";

import { ListCards } from "./components/list.cards.component";
import useStore from "src/store";

export const GenitalScreen = () => {
  const [visible, setVisible] = useState(false);

  function handleAddNewOcurrency() {
    setVisible(true);
  }

  const { genital } = useStore();

  console.log("genital", genital);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <MainHeader />
        <TopNavigation
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
        />

        <ScrollView>
          <Text category="h4" style={styles.title}>
            Saúde das Mamas
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
      <ModalCreateGenitalOcurrency visible={visible} setVisible={setVisible} />
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
