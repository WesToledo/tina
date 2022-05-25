import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import {
  Layout,
  Text,
  Icon,
  Avatar,
  TopNavigation,
  Button,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";
import { default as theme } from "../../../custom-theme.json";

import { useNavigation } from "@react-navigation/core";

import { Calendar, CalendarList } from "react-native-calendars";

import MainHeader from "src/components/MainHeader";
import EventsList from "./components/modal.appointments.component";

import { FloatingAction } from "react-native-floating-action";

import useStore from "src/store";
import api from "src/services/api";

var height = Dimensions.get("window").height;

const GearIcon = (props) => <Icon {...props} name="settings-2-outline" />;
const BellIcon = (props) => <Icon {...props} name="bell-outline" />;

const LoadingIndicator = (props) => (
  <View>
    <Spinner size="small" status="primary" />
  </View>
);

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

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const ExamIcon = (props) => <Icon {...props} name="file-text" />;

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [pill, setPill] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [markedDatesArray, setMarkedDatesArray] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  const [selectedDay, setSelectedDay] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const { exams, appointment, mamma, genital, addPill, user, pills } =
    useStore();

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

  async function takePill() {
    if (pill) {
      ToastAndroid.show("Pílula já tomada hoje!", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      const pill = await api.post("/pill/create", {
        user: user._id,
        date: new Date().toUTCString(),
      });

      addPill(pill.data.pill);

      setLoading(false);
      setPill(true);
    } catch (err) {
      setLoading(false);
      console.log("Erro ao criar pilula ", err);
    }
  }

  useEffect(() => {
    const today = new Date().getDate();
    const aux = pills.filter(({ date }) => new Date(date).getDate() === today);
    if (aux.length > 0) {
      setPill(true);
    }
  }, []);

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

    if (!markedDates[selectedDay]) {
      markedDates[selectedDay] = {
        selected: true,
      };
    }

    for (const [key, value] of Object.entries(markedDatesArray)) {
      markedDates[key] = {
        selected: key == selectedDay,

        customStyles: key == selectedDay && {
          container: {
            backgroundColor: "green",
          },
          text: {
            color: "black",
            fontWeight: "bold",
          },
        },

        textColor: "white",
        marked: true,
        dotColor: "white",
        dots:
          key != selectedDay
            ? [...value.map((appointment) => appointment.dot)]
            : [
                ...value.map((appointment) => {
                  return { ...appointment.dot, color: "white" };
                }),
              ],
      };
    }

    // markedDates[key] = {
    //   customStyles: {
    //     container: {
    //       backgroundColor: "green",
    //     },
    //     text: {
    //       color: "black",
    //       fontWeight: "bold",
    //     },
    //   },
    //   dots: [...value.map((appointment) => appointment.dot)],
    // };

    // markedDates[formatDate(baseDate)] = { selected: true };

    setMarkedDates(markedDates);

    console.warn("marked", markedDates);
  }, [exams, appointment, mamma, genital, selectedDay]);

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
                onPress={() =>
                  navigation.navigate("Main", { screen: "Profile" })
                }
                // onPress={handleNavigateConfigScreen}
              />
            </>
          )}
        />
        <ScrollView style={styles.container}>
          <Layout>
            <Layout style={styles.header}>
              <Layout style={styles.left}>
                <Text category="h1" style={styles.text}>
                  {new Date(selectedDay).getDate() + 1}
                </Text>
                <Text category="h5" style={styles.text}>
                  {monthNames[new Date(selectedDay).getMonth()]}
                </Text>
              </Layout>
              <Layout style={styles.right}>
                {!loading ? (
                  <Button
                    accessoryLeft={ExamIcon}
                    style={styles.button}
                    appearance={pill ? "ghost" : "filled"}
                    onPress={takePill}
                  />
                ) : (
                  <Button
                    accessoryLeft={LoadingIndicator}
                    style={styles.button}
                    appearance="ghost"
                  />
                )}
              </Layout>
            </Layout>

            <Calendar
              markingType="multi-dot"
              onDayPress={(day) => {
                console.log("selected day", day);

                setSelectedDay(day.dateString);
              }}
              markedDates={markedDates}
              theme={{
                todayTextColor: "#000",

                dayTextColor: "#000000",

                textDayFontWeight: "bold",
                textMonthFontWeight: "bold",
                selectedDayBackgroundColor: "purple",
                // dotStyle: { width: 6, height: 6 },
              }}
            />

            <EventsList
              visible={visible}
              setVisible={setVisible}
              markedDates={markedDatesArray}
              selectedDay={selectedDay}
            />
          </Layout>
        </ScrollView>
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
