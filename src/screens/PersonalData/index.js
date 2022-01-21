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
} from "@ui-kitten/components";

import Constants from "expo-constants";
import api from "src/services/api";
import { login } from "actions/auth";

import { Cancer_1 } from "./Cancer/Cancer_1";
import { Cancer_2 } from "./Cancer/Cancer_2";
import { Cancer_3 } from "./Cancer/Cancer_3";
import { Cancer_4 } from "./Cancer/Cancer_4";
import { Cancer_5 } from "./Cancer/Cancer_5";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const PersonalDataScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [clinicalData, setClinicalData] = useState({
    cancer_cases_in_family: [
      // {
      //   parent_level: {
      //     type: String,
      //   },
      //   age: {
      //     type: Number,
      //   },
      // },
    ],
    mammography: [
      // {
      //   has_done_this_year: {
      //     type: Boolean,
      //     required: true,
      //   },
      //   year: {
      //     type: String,
      //     required: true,
      //   },
      // },
    ],
  });
  const screens = {
    // dados clinicos
    0: <Cancer_1 handleNextScreen={handleNextScreen} />,
    // graus de parentesco
    1: (
      <Cancer_2
        handleNextScreen={handleNextScreen}
        setClinicalData={setClinicalData}
        clinicalData={clinicalData}
      />
    ),
    // form idade parente
    2: (
      <Cancer_3
        handleNextScreen={handleNextScreen}
        setClinicalData={setClinicalData}
        clinicalData={clinicalData}
      />
    ),

    3: <Cancer_4 handleNextScreen={handleNextScreen} />,
    4: <Cancer_5 handleNextScreen={handleNextScreen} />,
  };

  useEffect(() => {
    if (screenIndex == 5) {
      navigation.navigate("Home");
    }
  }, [screenIndex]);

  async function handleSubmit() {
    setLoading(true);
    navigation.navigate("Home");
  }

  function handleNextScreen(index) {
    setScreenIndex(screenIndex + index);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>{screens[screenIndex]}</SafeAreaView>
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
  subtitle: {
    paddingHorizontal: 25,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "75%",
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
    padding: 25,
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
