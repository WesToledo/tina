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

import { Mamografia_1 } from "./Mamografia_1";
import { Mamografia_2 } from "./Mamografia_2";
import { Mamografia_3 } from "./Mamografia_3";

export const MamografiaQuestionsScreen = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const screens = {
    0: <Mamografia_1 handleNextScreen={handleNextScreen} />,
    1: <Mamografia_2 handleNextScreen={handleNextScreen} />,
    2: <Mamografia_3 handleNextScreen={handleNextScreen} />,
  };

  function handleNextScreen(index) {
    setScreenIndex(screenIndex + index);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>{screens[screenIndex]}</SafeAreaView>
  );
};
