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
  TopNavigationAction,
  Radio,
  RadioGroup,
  Layout,
  Text,
  Spinner,
  Input,
  Icon,
  TopNavigation,
} from "@ui-kitten/components";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";

import useStore from "src/store";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const BackAction = () => {
  const navigation = useNavigation();
  return (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );
};

export const ConfigurationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { user } = useStore();

  const [form, setForm] = useState({
    email: user.email,
    name: user.name,
  });

  async function handleSubmit() {
    // setLoading(true);
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
    //   }
    // }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <Text category="h4" style={styles.title}>
            Editar Perfil
          </Text>
          <Layout style={styles.content}>
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

              {!loading ? (
                <Button
                  style={styles.button}
                  size="medium"
                  onPress={handleSubmit}
                >
                  Salvar Alterações
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
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: "100%",
  },
  text: {
    padding: 10,
    fontWeight: "bold",
  },
  content: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
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
    paddingHorizontal: 15,
    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 15,
    // marginBottom: 15,
  },
  title: {
    marginLeft: 15,
    marginVertical: 15,
    fontWeight: "bold",
  },
});
