import React from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import {
  Icon,
  Text,
  TopNavigation,
  TopNavigationAction,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

import { AlbumDetails } from "./components/album.details.component";
import { AlbumPodcastList } from "./components/podcast.list.component";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
};

export const AlbumDetailsScreen = ({ route, navigation }) => {
  const { _id, title, description, author, image_source, podcasts } =
    route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavigation
        accessoryLeft={BackAction}
        title={author.name}
        alignment="center"
      />
      <Layout style={{ flex: 1 }}>
        <AlbumDetails
          title={title}
          description={description}
          author={author}
          imageSource={image_source}
        />
        <AlbumPodcastList podcasts={podcasts} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
