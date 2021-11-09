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

var width = Dimensions.get("window").width;

const DownloadIcon = (props) => (
  <Icon {...props} name="cloud-download-outline" />
);

export const CardAlbum = ({
  _id,
  title,
  description,
  image_source,
  podcasts,
  author,
}) => {
  const navigation = useNavigation();
  const playback = useSelector((state) => state.playback);

  return (
    <View style={styles.content}>
      <TouchableHighlight
        style={styles.image_container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          navigation.navigate("AlbumDetails", {
            _id,
            title,
            description,
            author,
            image_source,
            podcasts,
          });
        }}
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
