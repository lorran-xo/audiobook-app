import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

import { Container, ClickableElement } from "./styles";

const Sound = require("react-native-sound");
Sound.setCategory("Playback");

interface AudioProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioProps) {
  const [playing, setPlaying] = useState(false);
  const [toBePlayed] = useState(audioUrl);

  const audio = new Sound(toBePlayed, null, (error) => {
    if (error) {
      console.log("failed to load the sound", error);

      return;
    }
    // if loaded successfully
    console.log(
      "duration in seconds: " +
        audio.getDuration() +
        " number of channels: " +
        audio.getNumberOfChannels()
    );
  });

  useEffect(() => {
    audio.setVolume(1);
    return () => {
      audio.release();
    };
  }, []);

  async function handlePlayAudio() {
    await audio.play((success) => {
      if (success) {
        setPlaying(false);
        console.log("successfully finished playing");
      } else {
        setPlaying(false);
        console.log("playback failed due to audio decoding errors");
      }
    });
    setPlaying(true);
  }

  async function handlePauseAudio() {
    console.log("paused");
    await audio.pause();
    setPlaying(false);
  }

  return (
    <Container testID="audio-player-comp">
      {playing ? (
        <ClickableElement onPress={() => handlePauseAudio()}>
          <Icon name="pausecircle" size={20} color="#000" />
        </ClickableElement>
      ) : (
        <ClickableElement onPress={() => handlePlayAudio()}>
          <Icon name="play" size={20} color="#000" />
        </ClickableElement>
      )}
    </Container>
  );
}
