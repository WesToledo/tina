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
import { Spinner } from "@ui-kitten/components";

import { Cancer_1 } from "./Cancer_1";
import { Cancer_2 } from "./Cancer_2";
import { Cancer_3 } from "./Cancer_3";
import { Cancer_4 } from "./Cancer_4";
import { Cancer_5 } from "./Cancer_5";

export const CancerQuestionsScreen = ({ navigation }) => {
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
        clinicalData={clinicalData}
      />
    ),

    3: <Cancer_4 handleNextScreen={handleNextScreen} />,
    4: <Cancer_5 />,
  };

  function handleNextScreen(index) {
    setScreenIndex(screenIndex + index);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>{screens[screenIndex]}</SafeAreaView>
  );
};
