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
  Datepicker,
  CalendarViewModes,
} from "@ui-kitten/components";

import Constants from "expo-constants";

import api from "src/services/api";
import useStore from "src/store";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const SignUpScreen = ({ navigation }) => {
  const { signin } = useStore();

  const [form, setForm] = useState({
    email: null,
    password: null,
    name: null,
    password_confirm: null,
    date: new Date(),
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [shouldCaptionRender, setShouldCaptionRender] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const checkPassword = () => {
    if (form.password !== form.password_confirm) {
      setShouldCaptionRender(true);
      return false;
    }
    return true;
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        <Icon name="alert-circle-outline" style={styles.captionIcon} />
        <Text style={styles.captionText}>Senhas não coincidem</Text>
      </View>
    );
  };

  async function handleSubmit() {
    setLoading(true);
    if (checkPassword()) {
      try {
        const response = await api.post("/user/create", {
          email: form.email,
          password: form.password,
          name: form.name,
          birthday: form.date.toISOString(),
        });

        signin(response.data.user, false);

        navigation.navigate("PersonalData");
      } catch (err) {
        setLoading(false);
        console.log("ERRO AO criar usuario", err);
        console.log("SERVER", Constants.manifest.extra.SERVER_URL);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text category="h4" style={styles.title}>
        Buscar
      </Text>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <Layout style={styles.content}>
          <View style={styles.header}>
            <Text category="h4" style={styles.text}>
              Crie sua conta
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              style={styles.input}
              value={form.name}
              label="Nome"
              placeholder="Digite seu nome"
              onChangeText={(nextValue) =>
                setForm({ ...form, name: nextValue })
              }
            />
            <Input
              style={styles.input}
              value={form.email}
              label="Email"
              placeholder="Digite seu email"
              onChangeText={(nextValue) =>
                setForm({ ...form, email: nextValue })
              }
            />
            {/* <Text category="s2" style={{ color: "#8f9bb3" }}>
              Eu sou:
            </Text>
            <RadioGroup
              selectedIndex={selectedIndex}
              onChange={(index) => setSelectedIndex(index)}
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignContent: "center",
              }}
            >
              <Radio>Estudante</Radio>
              <Radio>Professor</Radio>
            </RadioGroup> */}

            <Datepicker
              style={styles.input}
              label="Data de nascimento"
              date={form.date}
              onSelect={(nextDate) => setForm({ ...form, date: nextDate })}
              startView={CalendarViewModes.YEAR}
              min={new Date(1900, 0, 0)}
            />
            <Input
              style={styles.input}
              value={form.password}
              label="Senha"
              placeholder="Digite sua senha"
              accessoryRight={renderIcon}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) =>
                setForm({ ...form, password: nextValue })
              }
            />
            <Input
              style={styles.input}
              value={form.password_confirm}
              label="Confirme sua senha"
              placeholder="Digite sua senha novamente"
              accessoryRight={renderIcon}
              status={shouldCaptionRender ? "danger" : "basic"}
              renderCaption={renderCaption}
              secureTextEntry={secureTextEntry}
              onChangeText={(nextValue) =>
                setForm({ ...form, password_confirm: nextValue })
              }
            />
            {!loading ? (
              <Button
                style={styles.button}
                size="medium"
                onPress={handleSubmit}
              >
                Criar conta
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
  title: {
    marginLeft: 15,
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
    padding: 25,
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
