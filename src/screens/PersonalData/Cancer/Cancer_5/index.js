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
import { useNavigation } from "@react-navigation/core";
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

const tina2 = require("./tina2.png");

const InfoIcon = (props) => <Icon fill="#fff" {...props} name="info-outline" />;

export const Cancer_5 = () => {
  const navigation = useNavigation();

  function handleNextScreen() {
    navigation.navigate("Mamografia");
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text category="h4" style={styles.text}>
            Dados Clínicos
          </Text>
          <Button
            status="primary"
            appearance="ghost"
            accessoryLeft={InfoIcon}
          />
        </View>
        <View style={styles.image_container}>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  image_container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  image: {
    width: 410,
    height: 320,
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
