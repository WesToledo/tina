import React from "react";
import Constants from "expo-constants";
import {
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import {
  Text,
  Layout,
  TopNavigation,
  Divider,
  Icon,
  Button,
  Toggle,
  TopNavigationAction,
} from "@ui-kitten/components";

import { useNavigation } from "@react-navigation/core";
import useStore from "src/store";

const SettingsIcon = (props) => <Icon {...props} name="settings-2" />;
const LogOutIcon = (props) => <Icon {...props} name="log-out" />;

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const RemindersConfigScreen = () => {
  const navigation = useNavigation();

  const { user } = useStore();

  const useToggleState = (initialState = true) => {
    const [checked, setChecked] = React.useState(initialState);

    const onCheckedChange = (isChecked) => {
      setChecked(isChecked);
    };

    return { checked, onChange: onCheckedChange };
  };

  const anticoncepcionalState = useToggleState();
  const waterState = useToggleState();
  const appointmentsState = useToggleState();
  const examsState = useToggleState();
  const removeColectorState = useToggleState();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation alignment="left" accessoryLeft={BackAction} />
        <Text category="h4" style={styles.title}>
          Configurar Lembretes
        </Text>
        <Layout style={styles.list_container}>
          <Layout style={styles.item}>
            <Toggle {...anticoncepcionalState}>
              Lembrete Anticoncepcional
            </Toggle>
          </Layout>
          <Layout style={styles.item}>
            <Toggle {...waterState}>Lembrete Água</Toggle>
          </Layout>
          <Layout style={styles.item}>
            <Toggle {...appointmentsState}>Lembrete Consultas</Toggle>
          </Layout>
          <Layout style={styles.item}>
            <Toggle {...examsState}>Lembrete Exames</Toggle>
          </Layout>
          <Layout style={styles.item}>
            <Toggle {...removeColectorState}>Lembrete Remover Coletor</Toggle>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 15,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  subtitle: {
    paddingLeft: 15,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  item: { justifyContent: "flex-start", marginVertical: 10 },
  list_container: {
    marginHorizontal: 15,
    marginVertical: 15,
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list_text: {
    fontWeight: "700",
  },
});
