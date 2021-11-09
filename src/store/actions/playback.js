export function instancePlayback(sound) {
  return {
    type: "INSTANCE_PLAYBACK",
    payload: {
      sound,
    },
  };
}

export function unloadPlayback() {
  return {
    type: "UNLOAD_PLAYBACK",
    payload: {},
  };
}
