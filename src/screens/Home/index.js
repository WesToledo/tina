import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Dimensions } from "react-native";
import Constants from "expo-constants";
import { Layout, Text, Icon, Avatar } from "@ui-kitten/components";

import { useNavigation } from "@react-navigation/core";

import { Calendar, CalendarList } from "react-native-calendars";

import MainHeader from "src/components/MainHeader";
import ModalAppointmentsList from "./components/modal.appointments.component";

import useStore from "src/store";

var height = Dimensions.get("window").height;

const PlaylistIcon = (props) => <Icon {...props} name="layers-outline" />;

import { format } from "date-fns";

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

export const HomeScreen = () => {
  const navigation = useNavigation();

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

    markedDatesArray[formatDate(baseDate)] = { selected: true };

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

    setMarkedDates(markedDates);

    console.warn("marked", markedDates);
  }, [exams, appointment, mamma, genital]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainHeader />

      <CalendarList
        markingType="multi-dot"
        // Collection of dates that have to be marked. Default = {}
        // markedDates={{
        //   "2022-05-16": {
        //     selected: true,
        //     marked: true,
        //     selectedColor: "blue",
        //   },
        //   "2022-05-17": { marked: true },
        //   "2022-05-18": { marked: true, dotColor: "red", activeOpacity: 0 },
        //   "2022-05-19": { disabled: true, disableTouchEvent: true },
        // }}
        // onLongPress={(day) => {
        //   console.log("selected day", day);
        // }}
        onDayPress={(day) => {
          console.log("selected day", day);

          if (markedDatesArray[day.dateString]) {
            setSelectedDay(day.dateString);
            setVisible(true);
          }
        }}
        markedDates={markedDates}
      />
      <ModalAppointmentsList
        visible={visible}
        setVisible={setVisible}
        markedDates={markedDatesArray}
        selectedDay={selectedDay}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
