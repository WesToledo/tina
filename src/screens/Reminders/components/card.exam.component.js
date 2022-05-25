import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Icon, Text, Button, Card } from "@ui-kitten/components";
import img from "src/assets/thumb.png";

var width = Dimensions.get("window").width;

import { default as theme } from "../../../../custom-theme.json";
// import { default as theme } from "./custom-theme.json";
function getFormatedDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${dt}/${month}/${year}`;
}

function getFormatedTime(date) {
  var hr = date.getHours();
  var min = date.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  return `${hr}h${min}`;
}
export const CardReminder = ({ reminder }) => {
  const now = new Date();

  const reminderDate = new Date(reminder.date);

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
        status={now > reminderDate ? "basic" : "primary"}
        style={styles.card}
        header={
          <View>
            <View style={styles.content}>
              <Icon
                fill={theme["color-primary-500"]}
                name={
                  reminder.type === "exam"
                    ? "file-text-outline"
                    : "person-outline"
                }
                style={styles.icon}
              />
              <View>
                <Text category="h6">
                  {reminder.type == "exam" ? reminder.name : reminder.specialty}
                </Text>
                <Text category="s1">{getFormatedDate(reminderDate)}</Text>
                <Text
                  category="s1"
                  status="primary"
                  style={{ fontWeight: "bold" }}
                >
                  {getFormatedTime(reminderDate)}
                </Text>
                <View style={styles.location}>
                  <Icon
                    style={styles.icon_inner}
                    fill="#8F9BB3"
                    name={
                      reminder.type == "exam" ? "pin-outline" : "person-outline"
                    }
                  />
                  <Text category="s2">
                    {reminder.type == "exam"
                      ? reminder.hospital_name
                      : reminder.doctor_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        }
      >
        <Text>Observações:</Text>
        {reminder.obs != "" && <Text>{reminder.obs}</Text>}
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
    flex: 1,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    width: "100%",
  },
  location: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 20,
    marginLeft: -10,
    width: 20,
    height: 20,
  },
  marker: {
    marginRight: 20,
    width: 32,
    height: 32,
  },
  icon_inner: {
    marginRight: 10,
    width: 20,
    height: 20,
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
