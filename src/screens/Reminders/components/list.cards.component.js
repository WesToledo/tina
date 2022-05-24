import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardReminder } from "./card.exam.component";

const ListCards = ({ reminders }) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout>
          {reminders.map((reminder, index) => (
            <>
              <CardReminder key={index} reminder={reminder} />
            </>
          ))}
        </Layout>
        {reminders.length == 0 && (
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

export default ListCards;
