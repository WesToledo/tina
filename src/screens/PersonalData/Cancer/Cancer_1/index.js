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

export const Cancer_1 = ({ navigation, handleNextScreen }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  const { authenticate } = useStore();

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Layout style={styles.content}>
        <View style={styles.header}>
          <Text category="h2" style={styles.text}>
            Dados Clínicos
          </Text>

          <Text category="h6" style={styles.subtitle}>
            Vamos fazer algumas perguntas sobre você nas próximas telas.
            Responda da maneira que achar mais confortável.
          </Text>
        </View>
        <View style={styles.form}>
          <Text category="h6">Há casos de câncer de mama na família ?</Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignContent: "center",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <Radio>
              {(evaProps) => (
                <Text {...evaProps} style={styles.checkbox}>
                  Sim
                </Text>
              )}
            </Radio>
            <Radio>
              {(evaProps) => (
                <Text {...evaProps} style={styles.checkbox}>
                  Não
                </Text>
              )}
            </Radio>
          </RadioGroup>

          {!loading ? (
            <Button
              style={styles.button}
              size="medium"
              onPress={() => {
                // se tem parentesco com câncer de mama
                if (selectedIndex == 0) handleNextScreen(1);
                else authenticate();
              }}
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
    paddingTop: 30,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  content: {
    // backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
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
  checkbox: {
    fontSize: 20,
    padding: 5,
  },
});
