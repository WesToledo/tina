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
import useStore from "src/store";
import {
  Button,
  Radio,
  RadioGroup,
  Layout,
  Text,
  Spinner,
  Input,
} from "@ui-kitten/components";

const tina2 = require("./tina2.png");

export const Mamografia_3 = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { authenticate } = useStore();

  const navigation = useNavigation();

  function handleNextScreen() {
    authenticate();
    navigation.navigate("Home");
  }

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
