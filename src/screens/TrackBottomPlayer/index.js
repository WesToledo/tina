import React, { useEffect } from "react";
import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { Audio } from "expo-av";

import { Spinner, Icon, Layout, Text } from "@ui-kitten/components";

import {
  beginPlaying,
  playPauseMusic,
  updateSeekCurrentPosition,
  reset as controllerNextMusic,
  setLoading,
} from "actions/controller";
import { instancePlayback, unloadPlayback } from "actions/playback";
import { nextMusic as playlistNextMusic } from "actions/playlist";

import img from "../../assets/thumb.png";
var width = Dimensions.get("window").width;

export function TrackPlayer({}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const controller = useSelector((state) => state.controller);
  const playlist = useSelector((state) => state.playlist);
  const playback = useSelector((state) => state.playback);

  const { title, author, description } =
    playlist.podcasts[playlist.currentIndex];

  async function handlePlayPause() {
    if (!controller.isPlaying) {
      await playback.sound.playAsync();
    } else {
      await playback.sound.pauseAsync();
    }
    dispatch(playPauseMusic(!controller.isPlaying));
  }

  async function loadAudio({ fromStart, shouldPlay = true }) {
    const { isPlaying, volume } = controller;
    console.log("AUDIO", playlist.podcasts[playlist.currentIndex]);

    dispatch(setLoading());

    if (!shouldPlay) dispatch(playPauseMusic(false));

    if (playback.sound != null) await playback.sound.unloadAsync();

    try {
      const source = {
        uri: playlist.podcasts[playlist.currentIndex].audio_source,
      };
      const initialStatus = {
        shouldPlay: shouldPlay ? isPlaying : false,
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

  function onPlaybackStatusUpdate(status) {
    if (status.isPlaying) {
      dispatch(
        updateSeekCurrentPosition(Math.floor(status.positionMillis / 1000))
      );
    }
  }

  async function changeTrack() {
    dispatch(controllerNextMusic());
    loadAudio({ fromStart: true });
  }

  useEffect(() => {
    async function setAudio() {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true,
        });

        loadAudio({ fromStart: false, shouldPlay: false });
      } catch (e) {
        console.log(e);
      }
    }

    if (playback.sound == null) setAudio();
  }, []);

  useEffect(() => {
    changeTrack();
  }, [playlist]);

  return (
    <Layout style={styles.container} level="2">
      {!controller.loading ? (
        <>
          <Layout style={styles.image_container} level="2">
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#0a0a0a"
              onPress={() => navigation.navigate("Details")}
            >
              <Image
                source={{
                  uri: playlist.podcasts[playlist.currentIndex].image_source,
                }}
                style={styles.image}
              />
            </TouchableHighlight>
          </Layout>
          <Layout style={styles.content} level="2">
            <Layout style={styles.text_container} level="2">
              <Text category="h6" style={{ fontWeight: "bold" }}>
                {title}
              </Text>
              <Text
                category="s1"
                appearance="hint"
                style={{ fontWeight: "bold" }}
              >
                {description}
              </Text>
            </Layout>
            {!controller.isPlaying ? (
              <TouchableHighlight
                style={styles.icon_container}
                activeOpacity={0.6}
                underlayColor="#0a0a0a"
                onPress={handlePlayPause}
              >
                <Icon
                  style={{ width: 40, height: 40 }}
                  fill="#a61f77"
                  name="play-circle"
                />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={styles.icon_container}
                activeOpacity={0.6}
                underlayColor="#0a0a0a"
                onPress={handlePlayPause}
              >
                <Icon
                  style={{ width: 40, height: 40 }}
                  fill="#a61f77"
                  name="pause-circle"
                />
              </TouchableHighlight>
            )}
          </Layout>
        </>
      ) : (
        <Layout style={styles.spinner} level="2">
          <Spinner size="giant" />
        </Layout>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: width,
    position: "absolute",
    zIndex: 50,
    elevation: Platform.OS === "android" ? 50 : 0,
    bottom: 55,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image_container: {
    width: 70,
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: "center",
  },
  text_container: {
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  icon_container: {
    padding: 15,
  },
  spinner: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
