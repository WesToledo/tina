import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
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

import api from "src/services/api";

import useStore from "src/store";

function getFormatedTime(date) {
  var hr = date.getHours();
  var min = date.getMinutes();

  if (min < 10) {
    min = "0" + min;
  }

  return `${hr}h${min}`;
}
const EventsList = ({ visible, setVisible, markedDates, selectedDay }) => {
  const types = {
    fact: "danger",
    exam: "info",
    appointment: "success",
    pill: "primary",
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {markedDates[selectedDay] && (
          <Card disabled={true} style={styles.card}>
            <Text category="h6">Eventos</Text>

            <View style={styles.content}>
              {selectedDay &&
                markedDates[selectedDay]?.map(
                  ({ date, title, subtitle, obs, type }) => (
                    <Card style={styles.card} status={types[type]}>
                      {type !== "pill" ? (
                        <View>
                          <Text category="h6">{title}</Text>
                          <Text category="s1">{subtitle}</Text>
                          {type != "fact" && (
                            <Text
                              category="s1"
                              // status="primary"
                              style={{ fontWeight: "bold" }}
                            >
                              {getFormatedTime(new Date(date))}
                            </Text>
                          )}
                        </View>
                      ) : (
                        <View>
                          <Text category="h6">Pílula Tomada</Text>
                          <Text category="s1" appearance="hint">
                            {getFormatedTime(new Date(date))}
                          </Text>
                        </View>
                      )}
                    </Card>
                  )
                )}
            </View>
          </Card>
        )}
      </ScrollView>
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

export default EventsList;
