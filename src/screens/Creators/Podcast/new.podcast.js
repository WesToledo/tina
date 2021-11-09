import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import {
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Spinner,
} from "@ui-kitten/components";

import api from "src/services/api";
import { useNavigation } from "@react-navigation/core";

import Form from "./form.new.component";
import { useSelector } from "react-redux";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
};

export function NewPodcastScreen({ route }) {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  const { albumId } = route.params;

  const [form, setForm] = useState({
    title: undefined,
    description: undefined,
    authorId: user._id,
    image: null,
    imageChange: false,
    audio: null,
    audioChange: false,
    selectedItems: [],
  });

  async function onSubmit(onUploadProgress) {
    var formData = new FormData();
    var { title, description, authorId, image, selectedItems, audio } = form;

    formData.append("author", authorId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("album", albumId);
    formData.append("tags", JSON.stringify(selectedItems));

    formData.append("thumb", {
      uri: image,
      name: `${title}`,
      type: `image/${image.substring(image.lastIndexOf(".") + 1)}`,
    });
    formData.append("audio", {
      uri: audio.uri,
      name: `${"audio" + title}`,
      // type: `audio/${audio.name.substring(image.lastIndexOf(".") + 1)}`,
      type: `audio/mpeg`,
    });
    console.log(formData);

    try {
      await api.post("/upload/podcast", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => onUploadProgress(e),
      });
      navigation.navigate("Creators", {
        shouldRefresh: true,
      });
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Form form={form} setForm={setForm} onSubmit={onSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
