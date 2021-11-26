import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import Constants from "expo-constants";

import img from "../../../assets/thumb.png";

export const Section = ({ title, albums }) => {
  const navigation = useNavigation();
  return (
    <Layout style={styles.container}>
      <Text category="h4" style={styles.title}>
        {title}
      </Text>

      <ScrollView horizontal={true} style={styles.cards}>
        {albums.map(
          (
            { _id, title, description, author, image_source, podcasts },
            index
          ) => (
            <View key={index}>
              <TouchableHighlight
                key={_id}
                style={{ width: 120, marginRight: 10 }}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() =>
                  navigation.navigate("AlbumDetails", {
                    _id,
                    title,
                    description,
                    author,
                    image_source,
                    podcasts,
                  })
                }
              >
                <Image
                  source={{
                    uri: image_source,
                  }}
                  style={styles.thumb}
                />
              </TouchableHighlight>
              <Text numberOfLines={2} style={styles.thumb_text} category="s2">
                {title}
              </Text>
            </View>
          )
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    height: "auto",
  },
  title: {
    fontWeight: "bold",
  },
  cards: {
    marginTop: 5,
  },
  thumb: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  thumb_text: {
    width: 120,
    fontWeight: "700",
  },
});
