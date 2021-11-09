import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import {
  Button,
  Icon,
  Spinner,
  Text,
  Input,
  Layout,
} from "@ui-kitten/components";
import ProgressBar from "react-native-progress/Bar";
import MultiSelect from "react-native-multiple-select";
import * as ImagePicker from "expo-image-picker";

import api from "src/services/api";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export default function Form({
  form,
  setForm,
  onSubmit,
  submitText = "Criar Álbum",
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0.0);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    async function getAreas() {
      try {
        const { data } = await api.get("/area/");
        setAreas(data.area);
      } catch (err) {
        console.log("erro", err);
      }
    }

    getAreas();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setForm({ ...form, image: result.uri, imageChange: true });
    }
  };

  function onUploadProgress(e) {
    const progress = (e.loaded * 100) / e.total / 100;
    setProgress(progress);
  }

  const onSelectedItemsChange = (selectedItems) => {
    console.log(selectedItems);
    setForm({ ...form, selectedItems });
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView>
        <Text category="s2" style={{ color: "#8f9bb3" }}>
          Escolha a thumbnail do podcast:
        </Text>
        <View style={styles.image_container}>
          {form.image ? (
            <Image
              source={{ uri: form.image }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={pickImage}
            >
              <View style={styles.image_upload}>
                <Icon
                  style={styles.icon}
                  fill="#8F9BB3"
                  name="cloud-upload-outline"
                />
              </View>
            </TouchableHighlight>
          )}
        </View>
        <Input
          placeholder="Place your Text"
          style={styles.input}
          label="Título"
          placeholder="Escreva o título do álbum"
          value={form.title}
          onChangeText={(nextValue) => setForm({ ...form, title: nextValue })}
        />
        <Input
          style={styles.input}
          label="Descrição"
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder="Escreva o descrição do podcast"
          value={form.description}
          onChangeText={(nextValue) =>
            setForm({ ...form, description: nextValue })
          }
        />

        <Text
          category="s2"
          style={{ color: "#8f9bb3", marginTop: 5, marginBottom: 10 }}
        >
          Escolha a área do conhecimento do album:
        </Text>
        {areas.length > 0 ? (
          <MultiSelect
            hideTags
            items={areas}
            uniqueKey="_id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={form.selectedItems}
            selectText="Escolha as tags"
            searchInputPlaceholderText="Procure Tags..."
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="red"
            tagBorderColor="#8f9bb3"
            tagTextColor="#8f9bb3"
            selectedItemTextColor="#8f9bb3"
            selectedItemIconColor="#8f9bb3"
            itemTextColor="#8f9bb3"
            displayKey="name"
            single
            selectedItemIconColor="green"
            searchInputStyle={{ color: "#8f9bb3" }}
            textColor="#8f9bb3"
            submitButtonColor="#8f9bb3"
            submitButtonText="Escolher"
            styleMainWrapper={{ backgroundColor: "transparent" }}
            styleDropdownMenu={{ backgroundColor: "transparent" }}
            styleDropdownMenuSubsection={{
              backgroundColor: "#1a2138",
              paddingLeft: 20,
              borderRadius: 5,
              borderColor: "#111527",
              borderWidth: 1,
            }}
            styleInputGroup={{
              backgroundColor: "#1a2138",
              paddingVertical: 10,
            }}
            // styleItemsContainer={{ backgroundColor: "red" }}
            styleRowList={{
              backgroundColor: "#1a2138",
              borderWidth: 1,
              padding: 5,
              borderColor: "#111527",
            }}
          />
        ) : (
          <Layout style={styles.spinner}>
            <Spinner size="giant" />
          </Layout>
        )}

        {!loading ? (
          <Button
            style={styles.button}
            onPress={() => {
              setLoading(true);
              onSubmit(onUploadProgress);
            }}
            disabled={
              form.selectedItems.length === 0 ||
              form.image === null ||
              form.title == undefined ||
              form.description == undefined
            }
          >
            {submitText}
          </Button>
        ) : (
          <>
            <Button style={styles.button} accessoryLeft={LoadingIndicator} />
            <ProgressBar progress={progress} width={null} color="#a61f77" />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  image_container: {
    marginTop: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image_upload: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 5,
  },
  icon: {
    width: 100,
    height: 100,
  },
  button: {
    marginVertical: 5,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
