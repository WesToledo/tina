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
} from "@ui-kitten/components";
import { useDispatch } from "react-redux";

import Constants from "expo-constants";

import api from "src/services/api";

import { login } from "actions/auth";

const tina2 = require("./tina2.png");

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const Cancer_5 = ({ navigation, handleNextScreen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text category="h4" style={styles.text}>
            Dados Clínicos
          </Text>
        </View>
        <View>
          <Image source={tina2} style={styles.image} />
        </View>
      </View>
      <Button
        style={styles.button}
        status="control"
        size="medium"
        onPress={handleNextScreen}
      >
        Próximo
      </Button>
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
    color: "#fff",
    padding: 10,
    fontWeight: "bold",
  },
  subtitle: {
    paddingHorizontal: 25,
  },
  content: {
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // width: "100%",
  },
  form: {
    padding: 25,
    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 20,

    width: "75%",
  },
  checkbox: {
    paddingVertical: 5,
  },
});
