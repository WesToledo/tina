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
} from "@ui-kitten/components";

// import ModalCreateOcurrency from "./components/modal.create.component";

import Constants from "expo-constants";

import MainHeader from "src/components/MainHeader";

import useStore from "src/store";
import { useNavigation } from "@react-navigation/native";

import ListCards from "./components/list.cards.component";

const StarIcon = (props) => <Icon {...props} name="star" />;

export const RemindersScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  function handleAddNewExam() {
    navigation.navigate("CreateExam");
  }

  const { exams, appointments } = useStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <MainHeader />
        <TopNavigation
          alignment="left"
          accessoryRight={() => (
            <Button
              accessoryLeft={StarIcon}
              style={styles.button}
              appearance="ghost"
              onPress={handleAddNewExam}
            >
              Marcar Exame
            </Button>
          )}
          accessoryLeft={() => (
            <Button
              accessoryLeft={StarIcon}
              style={styles.button}
              appearance="ghost"
              onPress={handleAddNewExam}
            >
              Marcar Consulta
            </Button>
          )}
        />

        <ScrollView>
          <Text category="h4" style={styles.title}>
            Lembretes ativos
          </Text>
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
            exams={
              exams
                ? exams
                : [
                    {
                      user: 123,
                      date: new Date(),
                      hospital_name: "Clinica X",
                      name: "Mamografia",
                      obs: "Ir em jejum de 12 horas",
                    },
                  ]
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
});
