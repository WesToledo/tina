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
  Icon,
  CheckBox,
} from "@ui-kitten/components";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

const BackIcon = (props) => <Icon {...props} name="arrow-back-outline" />;

export const Cancer_2 = ({
  navigation,
  handleNextScreen,
  setClinicalData,
  clinicalData,
}) => {
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(false);

  function handleBackButton() {
    handleNextScreen(-1);
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Layout style={styles.content}>
        <Button
          style={styles.back_button}
          status={"primary"}
          accessoryRight={BackIcon}
          appearance="ghost"
          size="giant"
          onPress={handleBackButton}
        ></Button>
        {/* <View style={styles.header}>
          <Text category="h2" style={styles.text}>
            Dados Clínicos
          </Text>
        </View> */}
        <View style={styles.form}>
          <Text category="h6">Qual o grau de parentesco com essa pessoa ?</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignContent: "center",
              flexWrap: "wrap",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <CheckBox
              checked={checked === "Mãe"}
              style={styles.checkbox}
              onChange={() => setChecked("Mãe")}
            >
              {(evaProps) => (
                <Text {...evaProps} style={styles.checkbox}>
                  Mãe
                </Text>
              )}
            </CheckBox>

            <CheckBox
              checked={checked === "Pai"}
              style={styles.checkbox}
              onChange={() => setChecked("Pai")}
            >
              {(evaProps) => (
                <Text {...evaProps} style={styles.checkbox}>
                  Pai
                </Text>
              )}
            </CheckBox>

            <CheckBox
              checked={checked === "Irmão/Irmã"}
              style={styles.checkbox}
              onChange={() => setChecked("Irmão/Irmã")}
            >
              {(evaProps) => (
                <Text {...evaProps} style={styles.checkbox}>
                  Irmão/Irmã
                </Text>
              )}
            </CheckBox>

            <CheckBox
              checked={checked === "Filha/Filho"}
              style={styles.checkbox}
              onChange={() => setChecked("Filha/Filho")}
            >
              {(evaProps) => (
                <Text {...evaProps} style={styles.checkbox}>
                  Filha/Filho
                </Text>
              )}
            </CheckBox>
            <CheckBox
              checked={checked === "Outro"}
              style={styles.checkbox}
              onChange={() => setChecked("Outro")}
            >
              {(evaProps) => (
                <Text {...evaProps} style={styles.checkbox}>
                  Outro
                </Text>
              )}
            </CheckBox>
          </View>

          {!loading ? (
            <Button
              style={styles.button}
              size="medium"
              onPress={() => {
                handleNextScreen(1);
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
  back_button: {
    width: "5%",
    margin: 0,
    padding: 0,
  },
  text: {
    // paddingTop: 30,
    fontWeight: "bold",
  },
  subtitle: {
    paddingHorizontal: 25,
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
    paddingHorizontal: 30,
    paddingBottom: 30,

    width: "100%",
  },
  input: {
    marginVertical: 8,
  },
  checkbox: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 20,
  },
});
