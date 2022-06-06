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
import moment from "moment";
import ModalReminder from "./modal.reminder.component";

const BellIcon = (props) => (
  <Icon {...props} fill={theme["color-primary-500"]} name="bell" />
);

const BellOutlineIcon = (props) => (
  <Icon {...props} fill="#8F9BB3" name="bell-outline" />
);

function getFormatedDate(date) {
  return `${moment(date).format("DD/MM/YYYY")}`;
}

function getFormatedTime(date) {
  return `${moment(date).format("HH:mm")}`;
}
export const CardAppointment = ({ reminder, disabled }) => {
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
                name={"file-text-outline"}
                style={styles.icon}
              />
              <View style={styles.info}>
                {!disabled ? (
                  <>
                    <Text category="h6">{reminder.specialty}</Text>
                    <Text category="s1">{getFormatedDate(reminder.date)}</Text>
                  </>
                ) : (
                  <>
                    <Text category="h6" appearance="hint">
                      {reminder.specialty}
                    </Text>
                    <Text category="s1" appearance="hint">
                      {getFormatedDate(reminder.date)}
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
                      {getFormatedTime(reminder.date)}
                    </Text>

                    <View style={styles.location}>
                      <Icon
                        style={styles.icon_inner}
                        fill="#8F9BB3"
                        name={"person-outline"}
                      />
                      <Text category="s2">{reminder.doctor_name}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <Text
                      category="s1"
                      appearance="hint"
                      style={{ fontWeight: "bold" }}
                    >
                      {getFormatedTime(reminder.date)}
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
        <ModalReminder
          reminder={reminder}
          visible={modalVisible}
          setVisible={setModalVisible}
        />
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
