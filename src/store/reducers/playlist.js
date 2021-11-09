import produce from "immer";

const INITIAL = {
  currentIndex: 0,
  podcasts: [],
};

export default function playlist(state = INITIAL, action) {
  switch (action.type) {
    case "ADD_ONE_TO_TOP":
      return produce(state, (draft) => {
        const { _id } = action.payload.podcast;
        const podcastIndex = draft.podcasts.findIndex(
          (podcast) => podcast._id == _id
        );

        if (podcastIndex != -1) {
          draft.podcasts.splice(podcastIndex, 1);
          draft.currentIndex = 0;
        }
        draft.podcasts.unshift(action.payload.podcast);
      });
    case "ADD_ONE":
      return {
        ...state,
        podcasts: [...state.podcasts, action.payload.podcast],
      };
    case "ADD_MANY":
      return {
        ...state,
        podcasts: [...state.podcasts, ...action.payload.podcast],
      };
    case "PLAYLIST_NEXT_MUSIC":
      return {
        ...state,
        currentIndex: action.payload.newIndex,
      };
    case "REMOVE_MUSIC":
      return produce(state, (draft) => {
        const { id } = action.payload;
        draft.podcasts.splice(
          draft.podcasts.findIndex((podcast) => podcast._id == id),
          1
        );
      });

    default:
      return state;
  }
}
