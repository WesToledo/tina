import React from "react";
import { StyleSheet, Dimensions, TouchableHighlight } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Icon } from "@ui-kitten/components";

import {
  beginPlaying,
  playPauseMusic,
  updateSeekCurrentPosition,
  reset as controllerNextMusic,
  setLoading,
} from "actions/controller";
import { instancePlayback, unloadPlayback } from "actions/playback";
import { nextMusic as playlistNextMusic } from "actions/playlist";

var width = Dimensions.get("window").width;

export function PlayBackControls() {
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.controller);
  const playlist = useSelector((state) => state.playlist);
  const playback = useSelector((state) => state.playback);

  async function handlePlayPause() {
    if (!controller.isPlaying) {
      await playback.sound.playAsync();
    } else {
      await playback.sound.pauseAsync();
    }
    dispatch(playPauseMusic(!controller.isPlaying));
  }

  const handlePreviousTrack = async () => {};

  async function handleNextTrack() {
    const { podcasts, currentIndex } = playlist;

    await playback.sound.pauseAsync();

    if (playback.sound != null) {
      await playback.sound.unloadAsync();
    }

    var index = currentIndex;
    index < podcasts.length - 1 ? (index += 1) : (index = 0);

    await dispatch(controllerNextMusic());
    await dispatch(playlistNextMusic(index));
    loadAudio({ fromStart: true });
  }

  async function loadAudio({ fromStart }) {
    const { isPlaying, volume } = controller;

    dispatch(setLoading());

    try {
      const source = {
        uri:
          Constants.manifest.extra.SERVER_URL +
          "/ftp/" +
          playlist.podcasts[playlist.currentIndex].uri,
      };
      const initialStatus = {
        shouldPlay: isPlaying,
        volume,
        positionMillis: fromStart
          ? 0
          : Math.floor(controller.seek.currentPosition * 1000),
      };
      const { sound, status } = await Audio.Sound.createAsync(
        source,
        initialStatus
      );

      const trackLength = Math.floor(status.durationMillis / 1000);
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      dispatch(instancePlayback(sound));
      dispatch(
        beginPlaying({
          trackLength,
        })
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Layout style={styles.playback_controls}>
      <TouchableHighlight
        style={styles.icon_container}
        activeOpacity={0.9}
        underlayColor="#DDDDDD"
        onPress={() => console.log("touch")}
      >
        <Icon style={styles.icon} fill="#a61f77" name="rewind-left" />
      </TouchableHighlight>
      {controller.isPlaying ? (
        <TouchableHighlight
          style={styles.icon_container}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={handlePlayPause}
        >
          <Icon
            style={{ width: 90, height: 90 }}
            fill="#a61f77"
            name="pause-circle"
          />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={styles.icon_container}
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={handlePlayPause}
        >
          <Icon
            style={{ width: 90, height: 90 }}
            fill="#a61f77"
            name="play-circle"
          />
        </TouchableHighlight>
      )}
      <TouchableHighlight
        style={styles.icon_container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={handleNextTrack}
      >
        <Icon style={styles.icon} fill="#a61f77" name="rewind-right" />
      </TouchableHighlight>
    </Layout>
  );
}

const styles = StyleSheet.create({
  playback_controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginBottom: 30,
  },
  icon_container: {
    borderRadius: 100,
    margin: 10,
  },
  icon: {
    width: 60,
    height: 60,
  },
});
