import React from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

import img from "../../assets/thumb.png";

export const Section = ({ navigation, title, podcasts }) => {
  return (
    <Layout style={styles.container}>
      <Text category="h4" style={styles.title}>
        {title}
      </Text>

      <Layout>
        <ScrollView horizontal={true} style={styles.cards}>
          {podcasts.map((podcast) => (
            <Image source={img} style={styles.thumb} />
          ))}
        </ScrollView>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: "auto",
    paddingVertical: 10,
  },
  title: {
    paddingTop: 15,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  cards: {
    padding: 10,
    marginTop: 5,
    paddingLeft: 15,
  },
  thumb: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});
