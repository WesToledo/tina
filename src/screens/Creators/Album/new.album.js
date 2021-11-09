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

import Form from "./form.component";
import { useSelector } from "react-redux";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
};

export function NewAlbumScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: undefined,
    description: undefined,
    authorId: user._id,
    image: null,
    imageChange: false,
    selectedItems: [],
  });

  async function onSubmit(onUploadProgress) {
    var formData = new FormData();
    var { title, description, authorId, image, selectedItems } = form;

    let fileType = image.substring(image.lastIndexOf(".") + 1);

    formData.append("author", authorId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("knowledge_area", selectedItems[0]);

    formData.append("thumb", {
      uri: image,
      name: `${title}`,
      type: `image/${fileType}`,
    });

    try {
      await api.post("upload/album", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => onUploadProgress(e),
      });
      navigation.navigate("Creators", {
        shouldRefresh: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          accessoryLeft={BackAction}
          title="Criar novo album"
          alignment="center"
        />
        <Form form={form} setForm={setForm} onSubmit={onSubmit} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
