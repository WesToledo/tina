import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Dimensions } from "react-native";
import Constants from "expo-constants";
import {
  Layout,
  Text,
  Icon,
  Avatar,
  TopNavigation,
  Button,
  TopNavigationAction,
} from "@ui-kitten/components";
import { default as theme } from "../../../custom-theme.json";

import { useNavigation } from "@react-navigation/core";

import { Calendar, CalendarList } from "react-native-calendars";

import MainHeader from "src/components/MainHeader";
import ModalAppointmentsList from "./components/modal.appointments.component";

import { FloatingAction } from "react-native-floating-action";

import useStore from "src/store";

var height = Dimensions.get("window").height;

const GearIcon = (props) => <Icon {...props} name="settings-2-outline" />;
const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

import { format } from "date-fns";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

const actions = [
  {
    color: theme["color-primary-500"],
    text: "Exames",
    icon: require("src/assets/MAMAS.png"),
    name: "exams",
    position: 1,
  },
  {
    color: theme["color-primary-500"],
    text: "Consultas",
    icon: require("src/assets/MAMAS.png"),
    name: "appointments",
    position: 2,
  },
  {
    color: theme["color-primary-500"],
    text: "Mamas",
    icon: require("src/assets/MAMAS.png"),
    name: "mamma",
    position: 3,
  },
  {
    color: theme["color-primary-500"],
    text: "Genitais",
    icon: require("src/assets/MAMAS.png"),
    name: "genital",
    position: 4,
  },
];

const ExamIcon = (props) => <Icon {...props} name="file-text" />;

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [pill, setPill] = useState(false);
  const [visible, setVisible] = useState(false);
  const [markedDatesArray, setMarkedDatesArray] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const [selectedDay, setSelectedDay] = useState();

  const { exams, appointment, mamma, genital } = useStore();

  const factDot = { key: "fact", color: "red" };
  const examDot = { key: "exam", color: "blue" };
  const appointmentDot = { key: "appointment", color: "green" };

  const getDotByType = (type) => {
    const dots = {
      fact: factDot,
      exam: examDot,
      appointment: appointmentDot,
    };
    return dots[type];
  };

  useEffect(() => {
    const baseDate = new Date();
    const appointments = [
      ...exams.map(({ date, name, hospital_name, obs }) => {
        return {
          date,
          title: name,
          subtitle: hospital_name,
          obs,
          type: "exam",
        };
      }),
      ...appointment.map(({ date, specialty, doctor_name, obs }) => {
        return {
          date,
          title: specialty,
          subtitle: doctor_name,
          obs,
          type: "appointment",
        };
      }),
      ...mamma.map(({ date, problem, description }) => {
        return {
          date,
          title: problem,
          type: "fact",
          subtitle: "Saúde das Mamas",
          obs: description,
        };
      }),
      ...genital.map(({ date, problem, description }) => {
        return {
          date,
          title: problem,
          type: "fact",
          subtitle: "Saúde das Genitais",
          obs: description,
        };
      }),
    ];

    const markedDatesArray = {};
    const markedDates = {};

    appointments.forEach((appointment) => {
      const formattedDate = formatDate(new Date(appointment.date));

      if (markedDatesArray[formattedDate]?.length > 0) {
        markedDatesArray[formattedDate] = [
          ...markedDatesArray[formattedDate],
          {
            ...appointment,
            dot: getDotByType(appointment.type),
          },
        ];
      } else {
        markedDatesArray[formattedDate] = [
          {
            ...appointment,
            dot: getDotByType(appointment.type),
          },
        ];
      }
    });

    setMarkedDatesArray(markedDatesArray);

    for (const [key, value] of Object.entries(markedDatesArray)) {
      markedDates[key] = {
        dots: [...value.map((appointment) => appointment.dot)],
      };
    }

    // markedDates[formatDate(baseDate)] = { selected: true };

    setMarkedDates(markedDates);

    console.warn("marked", markedDates);
  }, [exams, appointment, mamma, genital]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <TopNavigation
          alignment="left"
          accessoryLeft={() => (
            <Avatar size="large" source={require("src/assets/LOGO.png")} />
          )}
          accessoryRight={() => (
            <>
              <TopNavigationAction
                icon={BellIcon}
                onPress={() => navigation.navigate("Lembretes")}
              />
              <TopNavigationAction
                icon={GearIcon}
                onPress={() => navigation.navigate("Configuration")}
                // onPress={handleNavigateConfigScreen}
              />
            </>
          )}
        />
        <Layout style={styles.container}>
          <Layout style={styles.header}>
            <Layout style={styles.left}>
              <Text category="h1" style={styles.text}>
                {new Date().getDate()}
              </Text>
              <Text category="h5" style={styles.text}>
                {"Maio"}
              </Text>
            </Layout>
            <Layout style={styles.right}>
              <Button
                accessoryLeft={ExamIcon}
                style={styles.button}
                appearance="filled"
              />
            </Layout>
          </Layout>

          <Calendar
            markingType="multi-dot"
            onDayPress={(day) => {
              console.log("selected day", day);

              if (markedDatesArray[day.dateString]) {
                setSelectedDay(day.dateString);
                setVisible(true);
              }
            }}
            markedDates={markedDates}
            theme={{
              todayTextColor: "#000",

              dayTextColor: "#000000",

              textDayFontWeight: "bold",
              textMonthFontWeight: "bold",
              dotStyle: { width: 6, height: 6 },
            }}
          />
        </Layout>
      </SafeAreaView>
      <FloatingAction
        actions={actions}
        color={theme["color-primary-500"]}
        onPressItem={(name) => {
          const navigations = {
            appointments: () => {
              navigation.navigate("CreateAppointment");
            },
            mamma: () => {
              navigation.navigate("CreateMamaReport");
            },
            genital: () => {
              navigation.navigate("CreateGenitalReport");
            },
            exams: () => {
              navigation.navigate("CreateExam");
            },
          };
          console.log(`selected button: ${name}`);
          navigations[name]();
        }}
      />

      <ModalAppointmentsList
        visible={visible}
        setVisible={setVisible}
        markedDates={markedDatesArray}
        selectedDay={selectedDay}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    marginTop: 30,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  right: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  button: {
    padding: 0,
    margin: 0,
  },
  text: {
    padding: 0,
    marginRight: 5,
  },
  title: {
    padding: 0,
    marginVertical: -5,
    marginHorizontal: 10,
  },
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  spinner: {
    height: height - 180,
    justifyContent: "center",
    alignItems: "center",
  },
});
