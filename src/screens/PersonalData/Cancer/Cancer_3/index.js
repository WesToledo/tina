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
  CheckBox,
} from "@ui-kitten/components";
import useStore from "src/store";
import { useNavigation } from "@react-navigation/native";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const Cancer_3 = ({ handleNextScreen }) => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState(null);

  const navigation = useNavigation();

  const cancerCasesInFamilyArray = useStore(
    (state) => state.user.clinical_data.cancer_cases_in_family
  );

  const { addCancerCaseInFamily } = useStore();

  function handleSubmit() {
    if (years != null) {
      const cancerCase = {
        parent_level: cancerCasesInFamilyArray[0].parent_level,
        age: years,
      };
      addCancerCaseInFamily([cancerCase]);
    }

    handleNextScreen(1);
  }

  function handleCancel() {
    navigation.navigate("Splash");
  }

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Layout style={styles.content}>
        <View style={styles.header}>
          <Text category="h2" style={styles.text}>
            Dados Clínicos
          </Text>
        </View>
        <View style={styles.form}>
          <Text category="h6">
            Com quantos anos o câncer de mama se manifestou no seu familiar ?
          </Text>

          <Input
            style={styles.input}
            value={years}
            label="Anos"
            placeholder=""
            onChangeText={(nextValue) => setYears(nextValue)}
          />

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-around",
              alignContent: "center",
              marginTop: 15,
              marginBottom: 15,
            }}
          >
            <CheckBox
              checked={checked}
              style={styles.checkbox}
              onChange={() => {
                setChecked(!checked);
                setYears(null);
              }}
            >
              Não sei
            </CheckBox>
          </View>

          {!loading ? (
            <>
              <Button
                style={styles.button}
                size="medium"
                onPress={handleSubmit}
              >
                Próximo
              </Button>

              <Button
                style={styles.button_cancel}
                appearance="ghost"
                size="medium"
                onPress={handleCancel}
              >
                Responder depois
              </Button>
            </>
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
    paddingVertical: 5,
  },
});
