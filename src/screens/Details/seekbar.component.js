import React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Slider from "@react-native-community/slider";

function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
  pad(Math.floor(position / 60), 2),
  pad(position % 60, 2),
];

export function SeekBar({
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart,
}) {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <Layout style={styles.seek_bar}>
      <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
        <Text style={styles.text}> {elapsed[0] + ":" + elapsed[1]}</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.text}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <Slider
        style={{ width: "100%", height: 40 }}
        maximumValue={trackLength}
        minimumValue={0}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor="#a61f77"
        maximumTrackTintColor="rgba(0, 0, 0, 0.40)"
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  seek_bar: {},
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});
