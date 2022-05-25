import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardReminder } from "./card.exam.component";
import { RemindersScreen } from "..";

const ListCards = ({ reminders }) => {
  const now = new Date();

  const aux = reminders.map((reminder) => {
    if (new Date(reminder.date) > now) {
      return {
        ...reminder,
        active: true,
      };
    } else {
      return {
        ...reminder,
        active: false,
      };
    }
  });

  return (
    <Layout style={styles.container}>
      {reminders.length == 0 ? (
        <Text appearance="hint" category="h6" style={styles.title}>
          Nenhum lembrete diponível
        </Text>
      ) : (
        <ScrollView>
          <Layout>
            <Text appearance="hint" category="h6">
              Lembretes ativos
            </Text>
            {aux
              .filter((reminder) => reminder.active)
              .map((reminder, index) => (
                <>
                  <CardReminder key={index} reminder={reminder} />
                </>
              ))}

            <Text appearance="hint" category="h6" style={{ marginVertical: 5 }}>
              Lembretes passados
            </Text>
            {aux
              .filter((reminder) => !reminder.active)
              .map((reminder, index) => (
                <>
                  <CardReminder key={index} reminder={reminder} />
                </>
              ))}
          </Layout>
        </ScrollView>
      )}
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
