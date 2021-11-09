const INITIAL = {
  sound: null,
};

export default function controller(state = INITIAL, action) {
  switch (action.type) {
    case "INSTANCE_PLAYBACK":
      return {
        sound: action.payload.sound,
      };
    case "UNLOAD_PLAYBACK": {
      return { sound: null };
    }

    default:
      return state;
  }
}
