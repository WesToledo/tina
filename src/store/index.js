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
  appointments: [
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    // doctor_name: {
    //   type: String,
    //   required: true,
    // },
    // specialty: {
    //   // especialidade
    //   type: String,
    //   required: true,
    // },
    // obs: {
    //   type: String,
    // },
  ],
  exams: [
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    // hospital_name: {
    //   type: String,
    //   required: true,
    // },
    // name: { // especialidade
    //   type: String,
    //   required: true,
    // },
    // obs: {
    //   type: String,
    // },
    // address ?
  ],
};

const store = (set, get) => ({
  // CONFIG APP

  authenticated: false,

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

  signin: (user, authentication) =>
    set(
      produce((oldState) => {
        oldState.user = user;
        oldState.authenticated = authentication;
      })
    ),
  signout: () =>
    set(
      produce((oldState) => {
        oldState.user = INITIAL_USER;
        oldState.authenticated = false;
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
});

const useStore = create(devtools(persist(store, persistStore)));

export default useStore;
