import React, { useCallback, useEffect } from "react";
import { StyleSheet, ToastAndroid } from "react-native";

//components
import { Layout, Spinner, Text } from "@ui-kitten/components";

import api from "src/services/api";
import useStore from "src/store";
import { useNavigation } from "@react-navigation/core";

function SplashScreen() {
  const {
    setGenitalOcurrency,
    setMammaOcurrency,
    setFetch,
    setExams,
    setAppointment,
  } = useStore();

  const navigation = useNavigation();

  async function getFacts() {
    try {
      const { data } = await api.get("/fact");

      setMammaOcurrency(data.facts.filter(({ type }) => type === "mamma"));
      setGenitalOcurrency(data.facts.filter(({ type }) => type === "genital"));
      return;
    } catch (err) {
      console.log("Erro ao buscar fatos ", err);
    }
  }

  async function getExams() {
    try {
      const { data } = await api.get("/exam");

      setExams(data.exams);

      return;
    } catch (err) {
      console.log("Erro ao buscar exames ", err);
    }
  }

  async function getAppointments() {
    try {
      const { data } = await api.get("/appointment");

      setAppointment(data.appointments);

      return;
    } catch (err) {
      console.log("Erro ao buscar exames ", err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      await Promise.all([getFacts(), getExams(), getAppointments()]).then(
        () => {
          navigation.navigate("Main");
        }
      );
    }
    fetchData();
  }, []);

  return (
    <Layout style={styles.container}>
      <Spinner size="giant" />
      <Text>Conversando com a TINA sobre seu perfil ...</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
