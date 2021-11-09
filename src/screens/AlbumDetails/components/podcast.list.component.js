import React from "react";
import { Dimensions, StyleSheet, ScrollView, View } from "react-native";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Divider,
} from "@ui-kitten/components";

var width = Dimensions.get("window").width;

import { Card } from "./card.component";

export const AlbumPodcastList = ({ podcasts }) => {
  return (
    <Layout style={styles.container}>
      <Layout style={styles.title_container}>
        <Text style={styles.title} category="h4">
          Todos os episódios
        </Text>
      </Layout>
      <ScrollView style={styles.card_container}>
        {podcasts.map((podcast, index) => (
          <View key={index}>
            <Card
              title={podcast.title}
              description={podcast.description}
              imageSource={podcast.image_source}
              podcast={podcast}
              tags={podcast.tags}
            />
            <Divider />
          </View>
        ))}

        <Layout style={{ height: 55 }} />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    margin: 15,
  },
  title_container: {
    width: width,
  },
  title: {
    marginTop: 15,
    fontWeight: "bold",
  },
  card_container: {
    flex: 1,
    marginTop: 10,
  },
});
