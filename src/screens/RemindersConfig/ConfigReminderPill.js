import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import {
  Text,
  Layout,
  TopNavigation,
  Divider,
  Icon,
  Button,
  TopNavigationAction,
} from "@ui-kitten/components";

import Constants from "expo-constants";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { useNavigation } from "@react-navigation/core";
import useStore from "src/store";

const SettingsIcon = (props) => <Icon {...props} name="settings-2" />;
const LogOutIcon = (props) => <Icon {...props} name="log-out" />;
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

function getFormatedTime(date) {
  var hr = date.getHours();
  var min = date.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  return `${hr}h${min}`;
}

export const ConfigReminderPillScreen = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const { signout, user } = useStore();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Layout style={{ flex: 1 }}>
      <Text category="h4" style={styles.title}>
        Configurar Horário Anticoncepcional
      </Text>
      <Text category="h6" style={styles.title}>
        Todos os dias as:
      </Text>

      <View style={styles.timeContainer}>
        <Button
          style={styles.timePicker}
          size="giant"
          appearance="outline"
          onPress={showTimepicker}
        >
          {getFormatedTime(date)}
        </Button>
      </View>

      <Text category="h6" style={styles.title}>
        a Tina vai te enviar uma notificação lembrando você.
      </Text>

      <Layout style={styles.footer}>
        <Button style={styles.save} size="large">
          Salvar
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  subtitle: {
    paddingLeft: 15,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  button: { width: "100%", justifyContent: "flex-start" },
  footer: {
    marginVertical: 30,
    marginHorizontal: 15,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  list_text: {
    fontWeight: "700",
  },
  timeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    width: "100%",
    height: 100,
  },
  timePicker: { width: "40%" },
});
