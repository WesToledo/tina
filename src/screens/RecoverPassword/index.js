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

export const RecoverPasswordScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: null,
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    // if (checkPassword()) {
    //   try {
    //     const response = await api.post("/user/create", {
    //       email: form.email,
    //       password: form.password,
    //       name: form.name,
    //       type: selectedIndex === 0 ? "Student" : "Teacher",
    //     });

    //     dispatch(
    //       login({
    //         ...response.data.user,
    //       })
    //     );
    //   } catch (err) {
    //     setLoading(false);
    //     console.log("ERRO AO criar usuario", err);
    //     console.log("SERVER", Constants.manifest.extra.SERVER_URL);

    //   }
    // }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Layout style={styles.content}>
          <View style={styles.header}>
            <Text category="h4" style={styles.text}>
              Recuperar senha
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              style={styles.input}
              value={form.email}
              label="Email"
              placeholder="Digite seu email"
              onChangeText={(nextValue) =>
                setForm({ ...form, email: nextValue })
              }
            />
            {!loading ? (
              <Button
                style={styles.button}
                size="medium"
                onPress={handleSubmit}
              >
                Enviar email de confirmação
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
    </SafeAreaView>
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
  content: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "red",
  },
  form: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 15,
    // marginBottom: 15,
  },
});
