import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, KeyboardAvoidingView } from "react-native";
import { Button, Text, Spinner, Input, Icon } from "@ui-kitten/components";
import { useDispatch } from "react-redux";

const tina1 = require("./tina1.png");

const InfoIcon = (props) => <Icon fill="#fff" {...props} name="info-outline" />;

export const Cancer_4 = ({ navigation, handleNextScreen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

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
          <Image source={tina1} style={styles.image} />
        </View>
      </View>
      <Button
        style={styles.button}
        status="control"
        size="medium"
        onPress={() => handleNextScreen(1)}
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
    width: 400,
    height: 340,
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
