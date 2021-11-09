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

export function EditAlbumScreen({ route }) {
  const navigation = useNavigation();

  const { _id, title, description, author, image_source, key, knowledge_area } =
    route.params;

  const [form, setForm] = useState({
    title,
    description,
    authorId: author,
    image: image_source,
    imageChange: false,
    key,
    selectedItems: [knowledge_area],
  });

  async function onSubmit(onUploadProgress) {
    onUploadProgress({ loaded: 50, total: 100 });

    const { title, description, authorId, image, key, selectedItems } = form;

    try {
      await api.put("/album/update/" + _id, {
        title,
        description,
        author: authorId,
        image_source: image,
        key,
        knowledge_area: selectedItems[0],
      });
      onUploadProgress({ loaded: 100, total: 100 });

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
        <Form
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          submitText="Salvar Alterações"
        />
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
