import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  TopNavigationAction,
} from "@ui-kitten/components";

import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/core";
import useStore from "src/store";

const SettingsIcon = (props) => <Icon {...props} name="settings-2" />;
const LogOutIcon = (props) => <Icon {...props} name="log-out" />;
const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

export const ProfileScreen = () => {
  const navigation = useNavigation();

  const { signout, user } = useStore();

  function handleLogOut() {
    signout();
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopNavigation alignment="left" accessoryLeft={BackAction} />
      <Layout style={{ flex: 1 }}>
        <Text category="h4" style={styles.title}>
          {user.name}
        </Text>
        <Text category="s1" appearance="hint" style={styles.subtitle}>
          {user.email}
        </Text>
        <Divider />
        <Layout style={styles.list_container}>
          <Button
            status="primary"
            appearance="ghost"
            accessoryLeft={SettingsIcon}
            size="large"
            style={styles.button}
            onPress={() => navigation.navigate("Configuration")}
          >
            Configurações
          </Button>
          <Button
            status="primary"
            appearance="ghost"
            accessoryLeft={LogOutIcon}
            size="large"
            style={styles.button}
            onPress={handleLogOut}
          >
            Sair
          </Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    paddingLeft: 15,
    fontWeight: "bold",
  },
  subtitle: {
    paddingLeft: 15,
    fontWeight: "bold",
    paddingBottom: 15,
  },
  button: { width: "100%", justifyContent: "flex-start" },
  list_container: {
    marginHorizontal: 15,
    flexDirection: "column",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list_text: {
    fontWeight: "700",
  },
});
