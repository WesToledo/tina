import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
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
  Layout,
  Select,
  SelectItem,
  IndexPath,
  Icon,
} from "@ui-kitten/components";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import api from "src/services/api";

import useStore from "src/store";
import { useNavigation } from "@react-navigation/native";

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

function getFormatedDateAndTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  var hr = date.getHours();
  var min = date.getMinutes();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `Exame programado para ${dt}/${month}/${year} - ${hr}h${min}min`;
}

const StarIcon = (props) => <Icon {...props} name="clock-outline" />;

export const EditExamScreen = ({ visible, setVisible }) => {
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState();
  const [hospitalName, setHospitalName] = useState();

  const { user, addExam } = useStore();

  const exams_types = [
    {
      label: "Mamografia",
    },
    {
      label: "Papa Nicolau",
    },
    {
      label: "Ultrassonografia",
    },
  ];

  useEffect(() => {
    console.log();
  }, [date]);

  async function handleSubmit() {
    setLoading(true);

    try {
      const exam = await api.post("/exam/create", {
        user: user._id,
        date: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes()
        ).toUTCString(),
        hospital_name: hospitalName,
        obs: description,
        name: exams_types[selectedIndex.row].label,
      });

      addExam(exam.data.exam);

      setLoading(false);
      navigation.navigate("Exam");
    } catch (err) {
      setLoading(false);
      console.log("Erro ao criar exame ", err);
    }
  }

  // const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView>
        <Layout style={styles.content}>
          <Text category="h4" style={styles.title}>
            Editar Exame
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 10,
              marginRight: "10%",
            }}
          >
            <Datepicker
              style={styles.datePicker}
              label="Data"
              date={date}
              onSelect={(nextDate) => setDate(nextDate)}
              // startView={CalendarViewModes.YEAR}
              min={new Date()}
            />
            <Button
              style={styles.timePicker}
              onPress={showTimepicker}
              accessoryLeft={StarIcon}
            />
          </View>

          <Text>{getFormatedDateAndTime(date)}</Text>
          <View
            style={{
              flexDirection: "column",
              alignContent: "center",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <Select
              label="Qual o exame ? "
              selectedIndex={selectedIndex}
              value={exams_types[selectedIndex.row].label}
              onSelect={(index) => setSelectedIndex(index)}
            >
              {exams_types.map(({ label }, index) => (
                <SelectItem title={label} />
              ))}
            </Select>
          </View>

          <Input
            label="Nome da Cl??nica / Hospital"
            value={hospitalName}
            style={styles.textarea}
            placeholder="Informe o nome da cl??nica / hospital"
            onChangeText={(text) => setHospitalName(text)}
          />
          <Input
            label="Observa????es"
            multiline={true}
            value={description}
            style={styles.textarea}
            textStyle={{ minHeight: 64 }}
            placeholder="Caso tenha alguma observa????o sobre o exame, detalhe aqui "
            onChangeText={(text) => setDescription(text)}
          />
          <View style={styles.footer}>
            <Button
              style={styles.button}
              appearance="outline"
              onPress={() =>
                navigation.navigate("Main", { screen: "Lembretes" })
              }
            >
              Cancelar
            </Button>
            {!loading ? (
              <Button style={styles.button} onPress={handleSubmit}>
                Salvar
              </Button>
            ) : (
              <Button style={styles.button} accessoryLeft={LoadingIndicator} />
            )}
          </View>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  datePicker: {
    width: "80%",
  },
  timePicker: {
    padding: 5,
  },
  content: {
    paddingHorizontal: 15,
    height: "100%",
  },
  title: {
    marginVertical: 15,
    fontWeight: "bold",
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
    marginBottom: 20,
  },
  button: {
    width: "45%",
  },
  textarea: {
    marginBottom: 20,
  },
});
