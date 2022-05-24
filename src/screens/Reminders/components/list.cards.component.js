import React from "react";
import { StyleSheet, Image, ScrollView, View } from "react-native";
import { Divider, Layout, Text } from "@ui-kitten/components";

import { CardExam } from "./card.exam.component";

const ListCards = ({ exams }) => {
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout>
          {exams.map((fact, index) => (
            <>
              <CardExam key={index} fact={fact} />
              <Divider />
            </>
          ))}
        </Layout>
        {exams.length == 0 && (
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
