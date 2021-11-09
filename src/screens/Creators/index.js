import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import {
  Icon,
  Spinner,
  Layout,
  Input,
  TopNavigation,
  Text,
  TopNavigationAction,
} from "@ui-kitten/components";
import Constants from "expo-constants";

import api from "src/services/api";

import { MyPodcasts as MyPodcasts } from "./components/my.podcasts";
import { useSelector } from "react-redux";

const NewIcon = (props) => <Icon {...props} name="plus-outline" />;

var height = Dimensions.get("window").height;

export function CreatorsScreen({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const authorId = useSelector((state) => state.auth.user._id);

  const [albums, setAlbums] = useState([]);

  async function getAlbums() {
    try {
      const { data } = await api.get("/album/my/" + authorId);
      if (data.albums.length != 0) setAlbums(data.albums);
      else setAlbums(null);
    } catch (err) {
      console.log("erro", err);
    }
  }
  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    if (isFocused && route.params) {
      getAlbums();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          title="Acessa Cast"
          alignment="center"
          accessoryRight={() => (
            <TopNavigationAction
              icon={NewIcon}
              onPress={() => navigation.navigate("NewAlbum")}
            />
          )}
        />

        <Text category="h4" style={styles.title}>
          Meus podcasts
        </Text>

        {albums != null ? (
          <ScrollView>
            {albums.length != 0 ? (
              <MyPodcasts albums={albums} getAlbums={getAlbums} />
            ) : (
              <Layout style={styles.spinner}>
                <Spinner size="giant" />
              </Layout>
            )}
          </ScrollView>
        ) : (
          <Layout>
            <Text style={styles.sub_title}>
              Você não tem nenhum album publicado ainda
            </Text>
          </Layout>
        )}
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    marginLeft: 15,
    fontWeight: "bold",
  },
  sub_title: {
    margin: 15,
  },
  spinner: {
    flex: 1,
    height: height - 170,
    justifyContent: "center",
    alignItems: "center",
  },
});
