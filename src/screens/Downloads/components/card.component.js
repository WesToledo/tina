import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { Icon, Text, Button } from "@ui-kitten/components";

import img from "../../../assets/thumb.png";

var width = Dimensions.get("window").width;

const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;

export const Card = ({ navigation, name, description, imageSource }) => {
  return (
    <View style={styles.content}>
      <TouchableHighlight
        style={styles.container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => console.log("touch")}
      >
        <Image source={img} style={styles.thumb} />
      </TouchableHighlight>
      <View>
        <Text numberOfLines={3} style={styles.thumb_text} category="s1">
          {name}
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
          appearance="ghost"
          accessoryLeft={TrashIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    marginVertical: 5,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  button_container: {
    width: width - width * 0.5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
  thumb: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  thumb_text: {
    margin: 5,
    fontWeight: "700",
    width: width - width * 0.5,
  },
});
