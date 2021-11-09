import { combineReducers } from "redux";

//reducers
import authReducer from "./auth";
import controllerReducer from "./controller";
import playlistReducer from "./playlist";
import playbackReducer from "./playback";

const reducers = combineReducers({
  auth: authReducer,
  controller: controllerReducer,
  playlist: playlistReducer,
  playback: playbackReducer,
});

export default reducers;
