import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardPodcast } from "./card.podcast.component";
import { CardAlbum } from "./card.album.component";

export const ListCards = ({ navigation, list = [] }) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        {list.map((podcast, index) => (
          <Layout key={index}>
            {podcast.type === "podcast" ? (
              <CardPodcast
                tags={podcast.tags}
                podcast={podcast}
                title={podcast.title}
                description={podcast.description}
                image_source={podcast.image_source}
              />
            ) : (
              <CardAlbum
                _id={podcast._id}
                tags={podcast.tags}
                podcast={podcast}
                title={podcast.title}
                description={podcast.description}
                image_source={podcast.image_source}
                podcasts={podcast.podcasts}
                author={podcast.author}
              />
            )}
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
