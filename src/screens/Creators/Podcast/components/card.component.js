import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { Icon, Text, Button, Toggle } from "@ui-kitten/components";

import Constants from "expo-constants";

import api from "src/services/api";

var width = Dimensions.get("window").width;

const DownloadIcon = (props) => (
  <Icon {...props} name="cloud-download-outline" />
);

export const Card = ({
  _id,
  title,
  description,
  audio_source,
  audio_key,
  image_key,
  tag,
  image_source,
  podcast,
  publish: publishState,
  albumId,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [publish, setPublish] = useState(publishState);

  async function onChangeToggle(_id, publish) {
    try {
      await api.put("/podcast/publish/" + _id, { publish: !publish });
    } catch (err) {
      console.log("erro", err);
    }
  }

  return (
    <View>
      <View style={styles.content}>
        <TouchableHighlight
          style={styles.image_container}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() =>
            navigation.navigate("EditPodcast", { podcast, albumId })
          }
        >
          <Image
            source={{
              uri: image_source,
            }}
            style={styles.thumb}
          />
        </TouchableHighlight>
        <View style={styles.right}>
          <View style={styles.info}>
            <View style={styles.title_container}>
              <Text numberOfLines={3} style={styles.title_text} category="s1">
                {title}
              </Text>
            </View>
            <View style={styles.subtitle_container}>
              <Text
                numberOfLines={2}
                style={styles.subtitle_text}
                category="s1"
                appearance="hint"
              >
                {description}
              </Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <Toggle
              checked={publish}
              status="primary"
              onChange={() => {
                setPublish(!publish);
                onChangeToggle(_id, publish);
              }}
            />
            <Text appearance="default" style={{ margin: 2 }}>
              Publicado
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    marginVertical: 5,
    height: 120,
  },
  button_container: {
    width: width - width * 0.5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image_container: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  thumb: {
    width: 80,
    height: 80,
  },
  thumb_text: {
    margin: 5,
    fontWeight: "700",
    width: width - width * 0.5,
  },
  right: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  info: {
    width: "45%",
  },
  title_container: {
    maxHeight: 50,
  },
  subtitle_container: {
    maxHeight: 70,
    height: "100%",
    flexDirection: "row",
    width: "90%",
  },
  podcast_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image_container: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  thumb: {
    height: 120,
  },
  title_text: {
    width: width - 120 - (15 * 2 + 20),
    maxHeight: 50,
    margin: 5,
    fontWeight: "700",
  },
  subtitle_text: {
    marginTop: 5,
    marginLeft: 5,
    fontWeight: "700",
    // width: width - 120 - (15 * 2 + 20) - 50,
    width: "100%",
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
