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
} from "@ui-kitten/components";

import { logout } from "actions/auth";
import { useNavigation } from "@react-navigation/core";

const SettingsIcon = (props) => <Icon {...props} name="settings-2" />;
const LogOutIcon = (props) => <Icon {...props} name="log-out" />;

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  function handleLogOut() {
    dispatch(logout());
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <TopNavigation title="Perfil" alignment="center" />
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
  title: {
    paddingTop: 15,
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
