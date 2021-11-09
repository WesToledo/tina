import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import {
  Icon,
  Layout,
  Input,
  TopNavigation,
  Text,
} from "@ui-kitten/components";

import { ListCards } from "./components/list.cards.component";

export const DownloadsScreen = ({ navigation }) => {
  var podcasts = [
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
    { name: "NerdCast", description: "asd" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="MyApp" alignment="center" />

        <ScrollView>
          <Text category="h4" style={styles.title}>
            Downloads
          </Text>
          <Layout style={styles.podcasts_list}>
            <ListCards podcasts={podcasts} />
          </Layout>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 15,
    marginLeft: 15,
    marginBottom: 15,
    fontWeight: "bold",
  },
  search_input: {
    margin: 15,
  },
});
