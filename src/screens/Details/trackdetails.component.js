import React from "react";
import { StyleSheet } from "react-native";

import { Layout, Text } from "@ui-kitten/components";

export const TrackDetails = ({ title, description }) => {
  return (
    <Layout style={styles.track_details}>
      <Text style={{ fontWeight: "bold" }} category="h4">
        {title}
      </Text>
      <Text category="h6" style={{ fontWeight: "bold" }} appearance="hint">
        {description}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  track_details: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});
