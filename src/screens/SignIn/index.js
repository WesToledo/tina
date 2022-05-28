import React, { useState } from "react";
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
  Divider,
  Layout,
  Text,
  Input,
  Spinner,
  Icon,
} from "@ui-kitten/components";

import api from "src/services/api";
import useStore from "src/store";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const avatarImg = require("src/assets/LOGO.png");

var width = Dimensions.get("window").width;

export const SignInScreen = ({ navigation }) => {
  const [form, setForm] = React.useState({
    email: null,
    password: null,
  });
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const { signin, authenticate } = useStore();

  async function handleSubmit() {
    setLoading(true);
    try {
      console.warn("form.email", form.email);
      console.warn("form.password", form.password);

      const response = await api.post("/login", {
        email: form.email,
        password: form.password,
      });

      console.warn("awsdasdasdas", response.data.user);

      signin(response.data.user, response.data.user.clinical_data.answered);

      authenticate();

      setLoading(false);
      navigation.navigate("PersonalData");
    } catch (err) {
      setLoading(false);
      console.log("ERRO AO LOGAR", err);
    }
  }

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" status="basic" />
    </View>
  );
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        {/* <Text style={styles.captionText}>
        Deve conter pelo menos 8 caracteres
      </Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <KeyboardAvoidingView behavior="height" style={styles.content}>
          <View style={styles.header}>
            <Image source={avatarImg} style={styles.avatar} />
            <Text category="h4" style={styles.text}>
              Bem-vinda ao Tina
            </Text>
            <Text
              category="s1"
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              Novo por aqui? Crie sua conta
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
            <Input
              style={styles.input}
              value={form.password}
              label="Senha"
              placeholder="Digite sua senha"
              caption={renderCaption}
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) =>
                setForm({ ...form, password: nextValue })
              }
            />
            <Text
              category="s1"
              style={styles.singup}
              onPress={() => {
                navigation.navigate("Recover");
              }}
            >
              Esqueceu sua senha ?
            </Text>

            {!loading ? (
              <Button
                style={styles.button}
                size="medium"
                onPress={handleSubmit}
              >
                Entrar
              </Button>
            ) : (
              <Button style={styles.button} accessoryLeft={LoadingIndicator} />
            )}
          </View>
        </KeyboardAvoidingView>
      </Layout>
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
    minHeight: 350,
    height: "auto",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    marginTop: "-20%",
    borderRadius: 100,
    backgroundColor: "#fff",
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
    color: "#fff",
  },
  form: {
    padding: 25,
    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  singup: {
    alignSelf: "flex-end",
  },
  button: {
    marginTop: 15,
    // marginBottom: 15,
  },
  spinner: {
    marginVertical: 5,
  },
});
