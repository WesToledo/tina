import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardMamma } from "./card.mamma.component";

export const ListCards = ({ mamma }) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout>
          {mamma.map((fact, index) => (
            <>
              <CardMamma key={index} fact={fact} />
            </>
          ))}
        </Layout>
        {mamma.length == 0 && (
          <Text appearance="hint" category="h6" style={styles.title}>
            Nenhum problema reportado ainda
          </Text>
        )}
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 10,
    height: "auto",
  },
});
