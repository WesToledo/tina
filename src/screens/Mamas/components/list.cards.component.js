import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardPodcast } from "./card.podcast.component";

export const ListCards = ({ navigation, list = [] }) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout>
          <CardPodcast />

          <Divider />
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    height: "auto",
  },
});
