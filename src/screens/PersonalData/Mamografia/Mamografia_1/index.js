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
import useStore from "src/store";
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

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const Mamografia_1 = ({ handleNextScreen }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const { addMammographyData } = useStore();

  function handleNextButton() {
    addMammographyData([
      {
        has_done_this_year: selectedIndex === 0,
        year: new Date().getFullYear(),
      },
    ]);
    handleNextScreen(1);
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Layout style={styles.content}>
        <View style={styles.header}>
          <Text category="h4" style={styles.text}>
            Dados Clínicos
          </Text>

          <Text category="h6" style={styles.subtitle}>
            A seguir preencha corretamente o que se pede, para ter uma melhor
            experiência ao usar o TINA
          </Text>
        </View>
        <View style={styles.form}>
          <Text category="h6">Já fez mamografia esse ano ?</Text>
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
              onPress={handleNextButton}
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
    padding: 30,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    fontWeight: "normal",
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 30,
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
