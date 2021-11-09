import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { Icon, Text, Button } from "@ui-kitten/components";
import Constants from "expo-constants";

import { addToTop } from "actions/playlist";
import { reset } from "actions/controller";
import { unloadPlayback } from "actions/playback";

var width = Dimensions.get("window").width;

const DownloadIcon = (props) => (
  <Icon {...props} name="cloud-download-outline" />
);

export const CardPodcast = ({
  title,
  description,
  image_source,
  podcast,
  tags,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const playback = useSelector((state) => state.playback);
  var colors = [
    "#38DBA6",
    "#a61f77",
    "#01A891",
    "#018D87",
    "#006B71",
    "#004F5E",
    "#B3D83C",
    "#8EBF07",
    "#75A405",
    "#5E8903",
    "#486E02",
    "#395B01",
    "#4B9AFF",
    "#0F6FFF",
    "#0A55DB",
    "#073FB7",
    "#042C93",
    "#021F7A",
    "#FFD63F",
    "#FFC300",
    "#DBA200",
    "#B78300",
    "#936600",
    "#7A5100",
    "#FF677A",
    "#FF3561",
    "#DB265F",
    "#B71A5A",
    "#931053",
    "#7A0A4D",
  ];

  async function handleAddToPlaylist() {
    if (playback.sound != null) {
      await playback.sound.unloadAsync();
    }

    dispatch(reset()); // controller reset
    dispatch(unloadPlayback());
    dispatch(addToTop(podcast));
  }

  function Tags() {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];
    colors.splice(colorIndex, 1);
  }
  console.log("Card", tags);

  return (
    <View style={styles.content}>
      <TouchableHighlight
        style={styles.image_container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={handleAddToPlaylist}
      >
        <Image
          source={{
            uri: image_source,
          }}
          style={styles.thumb}
        />
      </TouchableHighlight>
      <View>
        <Text numberOfLines={3} style={styles.thumb_text} category="s1">
          {title}
        </Text>
        <Text
          numberOfLines={2}
          style={styles.thumb_text}
          category="s1"
          appearance="hint"
        >
          {description}
        </Text>
      </View>
      {/* <View style={styles.button_container}>
        <Button
          style={styles.button}
          status="primary"
          size='giant'
          appearance="ghost"
          accessoryLeft={DownloadIcon}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    marginVertical: 5,
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
});

// const styles = StyleSheet.create({
//   container: {
//     height: "auto",
//     marginVertical: 5,
//     flex: 1,
//     flexDirection: "row",
//     zIndex: 1000,
//   },
//   thumb: {
//     width: 90,
//     height: 90,
//     marginRight: 10,
//   },
//   thumb_text: {
//     fontWeight: "700",
//     width: width - 125,
//   },
// });
