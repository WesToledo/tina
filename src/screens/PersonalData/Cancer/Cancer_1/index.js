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
  Icon,
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

export const Cancer_1 = ({ navigation, handleNextScreen }) => {
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

          <Text category="s1" style={styles.subtitle}>
            A seguir preencha corretamente o que se pede, para ter uma melhor
            experiência ao usar o TINA
          </Text>
        </View>
        <View style={styles.form}>
          <Text category="s1">Há casos de câncer de mama na família ?</Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignContent: "center",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Radio>Sim</Radio>
            <Radio>Não</Radio>
          </RadioGroup>

          {!loading ? (
            <Button
              style={styles.button}
              size="medium"
              onPress={handleNextScreen}
            >
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
  button: {
    // marginVertical: 15,
    // marginBottom: 15,
  },
});
