import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import {
  Button,
  Card,
  Modal,
  Text,
  CheckBox,
  CalendarViewModes,
  Datepicker,
  Icon,
  Spinner,
  TopNavigation,
  Toggle,
} from "@ui-kitten/components";
import { Dimensions } from "react-native";
import { default as theme } from "../../../../custom-theme.json";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { schedulePushNotification } from "src/services/notifications";

import useStore from "src/store";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

function getFormatedTime(date) {
  var hr = date.getHours();
  var min = date.getMinutes();

  if (hr < 10) {
    hr = "0" + hr;
  }
  if (min < 10) {
    min = "0" + min;
  }

  return `${hr}:${min}`;
}

const ModalReminder = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [checked, setChecked] = useState(true);

  async function handleSubmit() {
    setLoading(true);

    const callbackNotification = (notification) => {
      console.log(notification);
    };

    schedulePushNotification(
      date,
      "Exame",
      "Você tem um exame marcado as ",
      {},
      callbackNotification
    );
  }

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
    <View style={styles.container}>
      <Modal
        style={styles.modal}
        visible={visible}
        backdropStyle={styles.backdrop}
      >
        <KeyboardAvoidingView behavior="position" style={styles.modal}>
          <Card disabled={true} style={styles.card}>
            <TopNavigation
              accessoryRight={() => (
                <>
                  <Toggle
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                </>
              )}
              title={() => <Text category="h6">Configurar Lembrete</Text>}
            />
            {checked ? (
              <>
                <View style={styles.content}>
                  <Text category="h6">A TINA deve te avisar as:</Text>
                  <Button style={styles.timePicker} onPress={showTimepicker}>
                    {getFormatedTime(date)}
                  </Button>
                </View>
                <View style={styles.footer}>
                  <Button
                    style={styles.button}
                    appearance="outline"
                    onPress={() => setVisible(false)}
                  >
                    Cancelar
                  </Button>
                  {!loading ? (
                    <Button style={styles.button} onPress={handleSubmit}>
                      Salvar
                    </Button>
                  ) : (
                    <Button
                      style={styles.button}
                      accessoryLeft={LoadingIndicator}
                    />
                  )}
                </View>
              </>
            ) : (
              <>
                <View style={styles.content}>
                  <Text category="h6" appearance="hint">
                    Lembrete desativado para esse exame
                  </Text>
                </View>
                {/* <View style={styles.footer}> */}
                <Button
                  style={styles.button}
                  appearance="outline"
                  onPress={() => setVisible(false)}
                >
                  Cancelar
                </Button>
                {/* </View> */}
              </>
            )}
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  modal: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  card: {
    width: "90%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    margin: 10,
    marginBottom: 20,
  },
  footer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    width: "45%",
  },
  timePicker: {
    marginVertical: 20,
  },
});

export default ModalReminder;
