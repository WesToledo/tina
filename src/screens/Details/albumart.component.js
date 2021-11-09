import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Constants from "expo-constants";

var width = Dimensions.get("window").width;

import img from "../../assets/thumb.png";

export const AlbumArt = ({ image }) => {
  return (
    <View style={styles.album_art}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  album_art: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 30,
    height: width - 30,
    alignSelf: "center",
  },
});
