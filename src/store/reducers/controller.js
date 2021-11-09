const INITIAL = {
  isPlaying: true,
  loading: true,
  volume: 1.0,
  isBuffering: false,
  trackLength: 1,
  seek: { currentPosition: 0 },
};

export default function controller(state = INITIAL, action) {
  switch (action.type) {
    case "BEGIN_PLAYING":
      return {
        ...state,
        loading: false,
        sound: action.payload.sound,
        trackLength: action.payload.trackLength,
      };

    case "PLAY_PAUSE_MUSIC":
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };
    case "UPDATE_SEEK_CURRENT_POSITION":
      return {
        ...state,
        seek: { currentPosition: action.payload.currentPosition },
      };
    case "RESET":
      return {
        isPlaying: true,
        loading: true,
        volume: 1.0,
        isBuffering: false,
        trackLength: 1,
        seek: { currentPosition: 0 },
      };

    case "SET_LOADING":
      return { ...state, loading: true };

    default:
      return state;
  }
}
