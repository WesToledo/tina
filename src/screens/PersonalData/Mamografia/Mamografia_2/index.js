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

import api from "src/services/api";
import useStore from "src/store";

const tina1 = require("./tina3.png");

const InfoIcon = (props) => <Icon fill="#fff" {...props} name="info-outline" />;

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const Mamografia_2 = () => {
  const [loading, setLoading] = useState(false);

  const clinicalData = useStore((state) => state.user.clinical_data);
  const { user, setQuestionsAnswer } = useStore();

  async function handleSubmit() {
    setLoading(true);

    try {
      await api.post("/user/clinical-data/set/" + user._id, {
        clinical_data: clinicalData,
      });
      setQuestionsAnswer();
    } catch (err) {
      setLoading(false);
      console.log("Erro ao enviar dados clínicos ", err);
    }
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
        <View>
          <Image source={tina1} style={styles.image} />
        </View>
      </View>

      {!loading ? (
        <Button
          style={styles.button}
          size="medium"
          onPress={handleSubmit}
          status="control"
        >
          Próximo
        </Button>
      ) : (
        <Button
          style={styles.button}
          size="medium"
          status="control"
          accessoryLeft={LoadingIndicator}
        />
      )}
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
