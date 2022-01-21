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
    cancer_cases_in_family: [],
    mammography: {
      has_done_this_year: null,
      year: null,
    },
  },
};

const store = (set, get) => ({
  // CONFIG APP

  authenticated: false,

  // USER
  user: {
    ...INITIAL_USER,
  },

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
});

const useStore = create(devtools(persist(store, persistStore)));

export default useStore;
