import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardAppointment } from "./card.appointment.component";
import { ExamsScreen } from "../../Exams";

const ListCards = ({ actives, disableds }) => {
  return (
    <Layout style={styles.container}>
      {actives.length == 0 ? (
        <Text appearance="hint" category="h6" style={styles.title}>
          Nenhuma consulta encontrada
        </Text>
      ) : (
        <ScrollView>
          <Layout>
            <Text category="h6">Lembretes ativos</Text>
            {actives.map((reminder, index) => (
              <>
                <CardAppointment key={index} reminder={reminder} />
              </>
            ))}

            {disableds.length != 0 && (
              <>
                <Text
                  appearance="hint"
                  category="h6"
                  style={{ marginVertical: 5 }}
                >
                  Exames passados
                </Text>
                {disableds.map((reminder, index) => (
                  <CardAppointment key={index} reminder={reminder} disabled />
                ))}
              </>
            )}
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
