import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import {
  Button,
  Card,
  Modal,
  Text,
  CheckBox,
  CalendarViewModes,
  Datepicker,
  Input,
  Spinner,
} from "@ui-kitten/components";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import api from "src/services/api";

import useStore from "src/store";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export const ModalCreateGenitalOcurrency = ({ visible, setVisible }) => {
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const { user, addGenitalOcurrency } = useStore();

  const possibleOcurrencys = [
    {
      label: "Caroço Único e Duro",
    },
    {
      label: "Caroço Móvel",
    },
    {
      label: "Coceira",
    },
    {
      label: "Dor",
    },
    {
      label: "Sensibilidade",
    },
    {
      label: "Inchaço",
    },
    {
      label: "Endurecimento",
    },
    {
      label: "Retração do mamilo",
    },
    {
      label: "Alteração da pele",
    },
    {
      label: "Secreção",
    },
  ];

  async function handleSubmit() {
    setLoading(true);

    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    // type: {
    //   // genital / genital
    //   type: String,
    //   required: true,
    // },
    // problem: {
    //   type: String,
    //   required: true,
    // },
    // description: {
    //   type: String,
    // },

    try {
      const fact = await api.post("/fact/create", {
        user: user._id,
        date: date.toISOString(),
        type: "genital",
        problem: checked,
        description,
      });

      addGenitalOcurrency(fact);

      setLoading(false);
      setVisible(false);
    } catch (err) {
      setLoading(false);
      console.log("Erro ao criar fato ", err);
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modal}
        visible={visible}
        backdropStyle={styles.backdrop}
      >
        <KeyboardAvoidingView behavior="position" style={styles.modal}>
          <Card disabled={true} style={styles.card}>
            <Text category="h6"> Qual a ocorrência ?</Text>
            <Datepicker
              style={styles.input}
              label="Data"
              date={date}
              onSelect={(nextDate) => setDate(nextDate)}
              startView={CalendarViewModes.YEAR}
              min={new Date(2000, 0, 0)}
            />
            <View
              style={{
                flexDirection: "column",
                alignContent: "center",
                marginTop: 20,
                marginBottom: 10,
              }}
            >
              {possibleOcurrencys.map(({ label }, index) => (
                <CheckBox
                  checked={checked === label}
                  style={styles.checkbox}
                  onChange={() => setChecked(label)}
                  key={index}
                >
                  {(evaProps) => (
                    <Text {...evaProps} style={styles.checkbox}>
                      {label}
                    </Text>
                  )}
                </CheckBox>
              ))}
            </View>
            <Input
              label="Descrição"
              multiline={true}
              value={description}
              style={styles.textarea}
              textStyle={{ minHeight: 64 }}
              placeholder="Detalhe o problema"
              onChangeText={(text) => setDescription(text)}
            />
            <View style={styles.footer}>
              <Button
                style={styles.button}
                appearance="outline"
                onPress={() => setVisible(false)}
              >
                Cancelar
              </Button>
              {!loading ? (
                <Button
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={checked === 0}
                >
                  Salvar
                </Button>
              ) : (
                <Button
                  style={styles.button}
                  accessoryLeft={LoadingIndicator}
                />
              )}
            </View>
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  modal: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  card: {
    width: "90%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  checkbox: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 15,
  },
  footer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: "45%",
  },
  input: {
    marginTop: 20,
  },
  textarea: {
    marginBottom: 20,
  },
});
