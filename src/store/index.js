import { createStore, applyMiddleware } from "redux";

//Redux-persist
import { persistReducer, REHYDRATE } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import reducers from "./reducers";

const middlewares = [];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "playlist", "controller"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(persistedReducer);

export default store;
