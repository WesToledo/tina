import React from "react";
import { Dimensions, StyleSheet, ScrollView, Image } from "react-native";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  Layout,
} from "@ui-kitten/components";
import Constants from "expo-constants";

var width = Dimensions.get("window").width;

export const AlbumDetails = ({ title, description, author, imageSource }) => {
  return (
    <Layout style={styles.container}>
      <Layout>
        <Image
          source={{
            uri: imageSource,
          }}
          style={styles.image}
        />
      </Layout>
      <Layout>
        <Text category="h4" style={styles.title}>
          {title}
        </Text>
        <Text category="s1">{description}</Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    margin: 15,
  },
  title: {
    marginTop: 15,
    fontWeight: "bold",
    width: width * 0.6 - 45,
  },
});
