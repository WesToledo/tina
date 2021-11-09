export function nextMusic(newIndex) {
  return {
    type: "PLAYLIST_NEXT_MUSIC",
    payload: {
      newIndex,
    },
  };
}

export function addToTop(podcast) {
  return {
    type: "ADD_ONE_TO_TOP",
    payload: {
      podcast,
    },
  };
}

export function removeMusic(id) {
  return {
    type: "REMOVE_MUSIC",
    payload: {
      id,
    },
  };
}
