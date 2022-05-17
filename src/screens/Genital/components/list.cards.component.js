import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardGenital } from "./card.genital.component";

export const ListCards = ({ genital }) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout>
          {genital.map((fact, index) => (
            <CardGenital key={index} fact={fact} />
          ))}
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
