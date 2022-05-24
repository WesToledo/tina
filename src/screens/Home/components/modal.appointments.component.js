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
  Input,
  Spinner,
} from "@ui-kitten/components";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import api from "src/services/api";

import useStore from "src/store";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

function getFormatedTime(date) {
  var hr = date.getHours();
  var min = date.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  return `${hr}h${min}`;
}
const ModalAppointmentsList = ({
  visible,
  setVisible,
  markedDates,
  selectedDay,
}) => {
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const { user, addMammaOcurrency } = useStore();

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modal}
        visible={visible}
        backdropStyle={styles.backdrop}
      >
        <KeyboardAvoidingView behavior="position" style={styles.modal}>
          <Card disabled={true} style={styles.card}>
            <Text category="h6">Eventos</Text>

            <View style={styles.content}>
              {selectedDay &&
                markedDates[selectedDay].map(
                  ({ date, title, subtitle, obs, type }) => (
                    <Card
                      style={styles.card}
                      status={type == "fact" ? "danger" : "primary"}
                    >
                      <View>
                        <Text category="h6">{title}</Text>
                        <Text category="s1">{subtitle}</Text>
                        {type != "fact" && (
                          <Text
                            category="s1"
                            status="primary"
                            style={{ fontWeight: "bold" }}
                          >
                            {getFormatedTime(new Date(date))}
                          </Text>
                        )}
                      </View>
                    </Card>
                  )
                )}
            </View>

            <View style={styles.footer}>
              <Button
                style={styles.button}
                appearance="filled"
                onPress={() => setVisible(false)}
              >
                Voltar
              </Button>
            </View>
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
  content: {
    marginVertical: 15,
  },
  card: {
    width: "100%",
    marginVertical: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  footer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default ModalAppointmentsList;
