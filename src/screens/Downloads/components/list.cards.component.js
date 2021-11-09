import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { Card } from "./card.component";

export const ListCards = ({ navigation, podcasts = [] }) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        {podcasts.map(({ name, description }, index) => (
          <Layout key={index}>
            <Card name={name} description={description} />
            <Divider />
          </Layout>
        ))}
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
