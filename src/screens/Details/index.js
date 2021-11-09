import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import { Layout, Spinner } from "@ui-kitten/components";

import api from "src/services/api";

import {
  beginPlaying,
  playPauseMusic,
  updateSeekCurrentPosition,
  reset as controllerNextMusic,
  setLoading,
} from "actions/controller";
import { instancePlayback, unloadPlayback } from "actions/playback";
import { nextMusic as playlistNextMusic } from "actions/playlist";

import { SeekBar } from "./seekbar.component";
import { Header } from "./header.component";
import { PlayBackControls } from "./playback.component";
import { AlbumArt } from "./albumart.component";
import { TrackDetails } from "./trackdetails.component";
import { useDispatch, useSelector } from "react-redux";

export function TrackDetailsScreen({ navigation }) {
  const dispatch = useDispatch();

  const controller = useSelector((state) => state.controller);
  const playback = useSelector((state) => state.playback);
  const { podcasts, currentIndex } = useSelector((state) => state.playlist);

  const { title, author, description, image_source } = podcasts[currentIndex];

  async function onSeek(time) {
    time = Math.round(time);

    await playback.sound.setPositionAsync(time * 1000);
    console.warn("onSeek");

    dispatch(updateSeekCurrentPosition(time));
    dispatch(playPauseMusic(true));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.container}>
        <Header />
        <AlbumArt image={image_source} />
        {!controller.loading ? (
          <View style={styles.footer}>
            <TrackDetails title={title} description={description} />

            <SeekBar
              trackLength={controller.trackLength}
              currentPosition={
                controller.seek.currentPosition
                  ? controller.seek.currentPosition
                  : 0
              }
              onSeek={onSeek}
              onSlidingStart={() => dispatch(playPauseMusic(false))}
            />
            <PlayBackControls />
          </View>
        ) : (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
        )}
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: { flex: 1, justifyContent: "space-between" },
  footer: { height: "30%" },

  track_details: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  spinner: {
    height: "30%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
