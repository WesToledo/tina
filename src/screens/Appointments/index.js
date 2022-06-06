import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import {
  Icon,
  Layout,
  Input,
  TopNavigation,
  Text,
  Spinner,
  Avatar,
  Button,
  TopNavigationAction,
} from "@ui-kitten/components";

// import ModalCreateOcurrency from "./components/modal.create.component";

import Constants from "expo-constants";

import MainHeader from "src/components/MainHeader";

import useStore from "src/store";
import { useNavigation } from "@react-navigation/native";

import ListCards from "../Reminders/components/list.cards.component";

const AppointmenntIcon = (props) => <Icon {...props} name="person" />;
const ExamIcon = (props) => <Icon {...props} name="file-text" />;
const GearIcon = (props) => <Icon {...props} name="settings-2-outline" />;

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const AppointmentsScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  function handleAddNewExam() {
    navigation.navigate("CreateExam");
  }
  function handleAddNewAppointment() {
    navigation.navigate("CreateAppointment");
  }
  function handleNavigateConfigScreen() {
    navigation.navigate("RemindersConfig");
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  const { exams, appointment } = useStore();

  console.log("exams, appointment", [
    ...exams.map((exam) => {
      return { ...exam, type: "exam" };
    }),
    ...appointment.map((appoint) => {
      return { ...appoint, type: "appointment" };
    }),
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation
          alignment="left"
          accessoryLeft={BackAction}
          accessoryRight={() => (
            <TopNavigationAction
              icon={GearIcon}
              onPress={handleNavigateConfigScreen}
            />
          )}
        />
        {/* <TopNavigation
          style={styles.top}
          alignment="left"
          accessoryRight={() => (
            <Button
              accessoryLeft={ExamIcon}
              style={styles.button}
              appearance="filled"
              onPress={handleAddNewExam}
            >
              Marcar Exame
            </Button>
          )}
          accessoryLeft={() => (
            <Button
              accessoryLeft={AppointmenntIcon}
              style={styles.button}
              appearance="filled"
              onPress={handleAddNewAppointment}
            >
              Marcar Consulta
            </Button>
          )}
        /> */}

        <Text category="h4" style={styles.title}>
          Lembretes
        </Text>
        <ScrollView>
          {/* <Layout style={{ flex: 1 }}>
            <Input
              label=""
              autoComplete="off"
              placeholder="Procure por um podcast"
              accessoryLeft={SearchIcon}
              // onChangeText={(nextValue) => setValue(nextValue)}
              onChangeText={(text) => setSearchTerm(text)}
              style={styles.search_input}
            />
          </Layout> */}
          <ListCards
            reminders={
              exams || appointment
                ? [
                    ...exams.map((exam) => {
                      return { ...exam, type: "exam" };
                    }),
                    ...appointment.map((appoint) => {
                      return { ...appoint, type: "appointment" };
                    }),
                  ]
                : []
            }
          />
        </ScrollView>
      </Layout>
      {/* <ModalCreateOcurrency visible={visible} setVisible={setVisible} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    marginLeft: 15,
    marginVertical: 15,
    fontWeight: "bold",
  },
  search_input: {
    margin: 15,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
  top: {
    margin: 10,
  },
});
