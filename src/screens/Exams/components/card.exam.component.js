import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableHighlight,
} from "react-native";

import { default as theme } from "../../../../custom-theme.json";
import {
  Icon,
  Text,
  Button,
  Card,
  TopNavigation,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import ModalReminder from "./modal.reminder.component";

const EditIcon = (props) => <Icon {...props} name="edit-outline" />;
const TrashIcon = (props) => <Icon {...props} name="trash-outline" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const BellIcon = (props) => (
  <Icon {...props} fill={theme["color-primary-500"]} name="bell" />
);

const BellOutlineIcon = (props) => (
  <Icon {...props} fill="#8F9BB3" name="bell-outline" />
);


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
export const CardExam = ({ reminder, disabled }) => {
  const reminderDate = new Date(reminder.date);
  const [modalVisible, setModalVisible] = useState(false);

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
        status={disabled ? "basic" : "primary"}
        style={styles.card}
        header={
          <View>
            <View style={styles.content}>
              <Icon
                fill={disabled ? "#8F9BB3" : theme["color-primary-500"]}
                name={
                  reminder.type === "exam"
                    ? "file-text-outline"
                    : "person-outline"
                }
                style={styles.icon}
              />
              <View style={styles.info}>
                {!disabled ? (
                  <>
                    <Text category="h6">{reminder.name}</Text>
                    <Text category="s1">{getFormatedDate(reminderDate)}</Text>
                  </>
                ) : (
                  <>
                    <Text category="h6" appearance="hint">
                      {reminder.name}
                    </Text>
                    <Text category="s1" appearance="hint">
                      {getFormatedDate(reminderDate)}
                    </Text>
                  </>
                )}

                {!disabled ? (
                  <>
                    <Text
                      category="s1"
                      status={"primary"}
                      style={{ fontWeight: "bold" }}
                    >
                      {getFormatedTime(reminderDate)}
                    </Text>

                    <View style={styles.location}>
                      <Icon
                        style={styles.icon_inner}
                        fill="#8F9BB3"
                        name={
                          reminder.type == "exam"
                            ? "pin-outline"
                            : "person-outline"
                        }
                      />
                      <Text category="s2">
                        {reminder.type == "exam"
                          ? reminder.hospital_name
                          : reminder.doctor_name}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <Text
                      category="s1"
                      appearance="hint"
                      style={{ fontWeight: "bold" }}
                    >
                      {getFormatedTime(reminderDate)}
                    </Text>
                    <View style={styles.location}>
                      <Icon
                        style={styles.icon_inner}
                        fill="#8F9BB3"
                        name="pin-outline"
                      />
                      <Text category="s2" appearance="hint">
                        {reminder.hospital_name}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              {!disabled && (
                <View
                  style={{
                    height: "100%",
                    flexDirection: "row",
                  }}
                >
                  <TopNavigationAction
                    icon={disabled ? BellOutlineIcon : BellIcon}
                    onPress={() => {
                      setModalVisible(true);
                    }}
                  />
                  {/* <TopNavigationAction
                    icon={
                      <EditIcon
                        fill={disabled ? "#8F9BB3" : theme["color-primary-500"]}
                      />
                    }
                    onPress={() => {}}
                  /> */}
                </View>
              )}
            </View>
          </View>
        }
      >
        <View style={styles.footerContainer}>
          {reminder.obs !== "" && <Text>{reminder.obs}</Text>}
        </View>
        <ModalReminder visible={modalVisible} setVisible={setModalVisible} />
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
    justifyContent: "space-between",
  },
  info: {
    width: "100%",
    flex: 1,
    marginVertical: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
    marginRight: 30,
    marginLeft: 10,
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
  footerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#ccc",
    marginVertical: -10,
    marginRight: -20,
  },
  footerControl: {
    marginHorizontal: 2,
    marginVertical: 2,
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
