import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  Button,
  Radio,
  RadioGroup,
  Layout,
  Text,
  Spinner,
  Input,
  CheckBox,
} from "@ui-kitten/components";
import { useDispatch } from "react-redux";

import Constants from "expo-constants";

import api from "src/services/api";

import { login } from "actions/auth";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const Cancer_2 = ({ navigation, handleNextScreen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Layout style={styles.content}>
        <View style={styles.header}>
          <Text category="h4" style={styles.text}>
            Dados Clínicos
          </Text>
        </View>
        <View style={styles.form}>
          <Text category="s1">Qual(is) grau(s) de parentesco ? </Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignContent: "center",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <CheckBox style={styles.checkbox}>Mãe</CheckBox>
            <CheckBox style={styles.checkbox}>Pai</CheckBox>
            <CheckBox style={styles.checkbox}>Irmã</CheckBox>
            <CheckBox style={styles.checkbox}>Filha</CheckBox>
            <CheckBox style={styles.checkbox}>Outro</CheckBox>
          </View>

          {!loading ? (
            <Button style={styles.button} size="medium" onPress={handleNextScreen}>
              Próximo
            </Button>
          ) : (
            <Button
              style={styles.button}
              size="medium"
              accessoryLeft={LoadingIndicator}
            />
          )}
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#670D73",
  },
  text: {
    padding: 10,
    fontWeight: "bold",
  },
  subtitle: {
    paddingHorizontal: 25,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "75%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 25,
    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  checkbox:{
    paddingVertical: 5
  }
});
