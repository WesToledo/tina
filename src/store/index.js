import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import produce from "immer";

const persistStore = {
  name: "state",
  getStorage: () => AsyncStorage, // (optional) by default the 'localStorage' is used
};

const INITIAL_USER = {
  name: null,
  email: null,
  birthday: null,
  password: null,
  clinical_data: {
    aswered: false,
    has_cancer_cases_in_family: null,
    cancer_cases_in_family: [],
    mammography: [
      //   {
      //   has_done_this_year: null,
      //   year: null,
      //   }
    ],
  },
  calendar: {
    events: [],
  },
};

const store = (set, get) => ({
  // CONFIG APP

  authenticated: false,
  jump_questions: false,

  alreadyFetch: false,

  // USER
  user: {
    ...INITIAL_USER,
  },

  mamma: [
    // {
    //   problem: "",
    //   date: new Date().toISOString(),
    //   description: "",
    // },
  ],

  genital: [
    // {
    //   problem: "",
    //   date: new Date().toISOString(),
    //   description: "",
    // },
  ],

  exams: [],
  appointment: [],
  pills: [],
  config: {
    notifications: {
      exam: {
        hourBack: 1,
      },
      appointment: {
        hourBack: 1,
      },
    },
  },

  signin: (user, authentication) =>
    set(
      produce((oldState) => {
        oldState.user = user;
        oldState.jump_questions = authentication;
      })
    ),
  setQuestionsAnswer: () =>
    set(
      produce((oldState) => {
        oldState.jump_questions = true;
      })
    ),

  signout: () =>
    set(
      produce((oldState) => {
        oldState.user = INITIAL_USER;
        oldState.authenticated = false;
        oldState.exams = [];
        oldState.appointment = [];
        oldState.pills = [];
      })
    ),
  authenticate: () =>
    set(
      produce((oldState) => {
        oldState.authenticated = true;
      })
    ),
  setFetch: (value) =>
    set(
      produce((oldState) => {
        oldState.alreadyFetch = value;
      })
    ),

  isCancerCasesInFamily: (value) =>
    set(
      produce((oldState) => {
        oldState.user.clinical_data.has_cancer_cases_in_family = value;
      })
    ),

  addCancerCaseInFamily: (cancerCases) =>
    set(
      produce((oldState) => {
        oldState.user.clinical_data.cancer_cases_in_family = [...cancerCases];
      })
    ),

  addMammographyData: (mammography_data) =>
    set(
      produce((oldState) => {
        oldState.user.clinical_data.mammography = mammography_data;
      })
    ),

  addClinicalData: (clinical_data) =>
    set(
      produce((oldState) => {
        oldState.user.clinical_data.cancer_cases_in_family = [
          ...oldState.user.clinical_data.cancer_cases_in_family,
          clinical_data.cancer_cases_in_family[0],
        ];
      })
    ),

  setMammaOcurrency: (mammaFacts) =>
    set(
      produce((oldState) => {
        oldState.mamma = mammaFacts;
      })
    ),

  addMammaOcurrency: (ocurrency) =>
    set(
      produce((oldState) => {
        oldState.mamma.push(ocurrency);
      })
    ),

  addGenitalOcurrency: (ocurrency) =>
    set(
      produce((oldState) => {
        oldState.genital.push(ocurrency);
      })
    ),

  setGenitalOcurrency: (genitalFacts) =>
    set(
      produce((oldState) => {
        oldState.genital = genitalFacts;
      })
    ),

  addExam: (exam) =>
    set(
      produce((oldState) => {
        oldState.exams.push(exam);
      })
    ),

  setExams: (exams) =>
    set(
      produce((oldState) => {
        oldState.exams = exams;
      })
    ),

  addAppointment: (appointment) =>
    set(
      produce((oldState) => {
        oldState.appointment.push(appointment);
      })
    ),

  setAppointment: (appointment) =>
    set(
      produce((oldState) => {
        oldState.appointment = appointment;
      })
    ),

  addPill: (pill) =>
    set(
      produce((oldState) => {
        oldState.pills.push(pill);
      })
    ),

  setPills: (pills) =>
    set(
      produce((oldState) => {
        oldState.pills = pills;
      })
    ),
});

const useStore = create(devtools(persist(store, persistStore)));

export default useStore;
