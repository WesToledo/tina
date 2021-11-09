import React from "react";
import { StyleSheet } from "react-native";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const DownIcon = (props) => (
  <Icon {...props} name="arrow-ios-downward-outline" />
);

export function Header() {
  const navigation = useNavigation();
  return (
    <Layout style={styles.header}>
      <Button
        style={styles.button}
        appearance="ghost"
        status="primary"
        accessoryLeft={DownIcon}
        size="giant"
        onPress={() => navigation.goBack()}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    justifyContent: "center",
  },
  button: {
    width: "15%",
    padding: 15,
  },
});
