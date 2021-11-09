import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Divider,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";

import { Card } from "./components/card.component";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
};

export const PlaylistScreen = ({ navigation }) => {
  const playlist = useSelector((state) => state.playlist);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          accessoryLeft={BackAction}
          title="Playlist"
          alignment="center"
        />
        <Layout style={styles.container}>
          <ScrollView style={{ marginBottom: 70 }}>
            {playlist.podcasts.map((podcast, index) => (
              <View key={index}>
                <Card
                  title={podcast.title}
                  description={podcast.description}
                  imageSource={podcast.image_source}
                  id={podcast._id}
                />
                <Divider />
              </View>
            ))}
          </ScrollView>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    paddingHorizontal: 15,
  },
});
