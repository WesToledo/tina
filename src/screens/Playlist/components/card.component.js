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

import { removeMusic } from "actions/playlist";
import { reset } from "actions/controller";
import { unloadPlayback } from "actions/playback";

var width = Dimensions.get("window").width;

const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;

export const Card = ({ title, description, imageSource, id }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const playback = useSelector((state) => state.playback);

  return (
    <View style={styles.content}>
      <TouchableHighlight
        style={styles.image_container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
      >
        <Image
          source={{
            uri:  imageSource,
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
      <View style={styles.button_container}>
        <Button
          style={styles.button}
          status="primary"
          size="giant"
          appearance="ghost"
          accessoryLeft={TrashIcon}
          onPress={() => dispatch(removeMusic(id))}
        />
      </View>
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
