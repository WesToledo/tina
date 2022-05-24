import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Icon, Text, Button, Card, CardH } from "@ui-kitten/components";
import img from "src/assets/thumb.png";

var width = Dimensions.get("window").width;

const DownloadIcon = (props) => (
  <Icon {...props} name="cloud-download-outline" />
);

function getFormatedDate(ISODate) {
  var date = new Date(ISODate);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return dt + "/" + month + "/" + year;
}

export const CardGenital = ({ fact }) => {
  const navigation = useNavigation();

  const { date, problem, description } = fact;

  return (
    <View style={styles.content}>
      {/* <TouchableHighlight
        style={styles.image_container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
      >
        <Image source={img} style={styles.thumb} />
      </TouchableHighlight> */}

      <Card
        status="primary"
        style={styles.card}
        header={
          description != "" && (
            <View>
              <Text category="h6">{problem}</Text>
              <Text category="s1">{getFormatedDate(date)}</Text>
            </View>
          )
        }
      >
        {description == "" ? (
          <View>
            <Text category="h6">{problem}</Text>
            <Text category="s1">{getFormatedDate(date)}</Text>
          </View>
        ) : (
          <Text>{description}</Text>
        )}
      </Card>

      {/* <View>
        <Text numberOfLines={3} style={styles.thumb_text} category="s1">
          tituloo
        </Text>
        <Text
          numberOfLines={2}
          style={styles.thumb_text}
          category="s1"
          appearance="hint"
        >
          descricao
        </Text>
      </View> */}
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
    width: "100%",
    marginVertical: 5,
    flexDirection: "row",
  },
  card: {
    width: "100%",
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
