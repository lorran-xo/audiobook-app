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
  const [toBePlayed, setToBePlayed] = useState(audioUrl);
  const [decodingErrorOcurred, setDecodingErrorOcurred] = useState(false);
  const [audio, setAudio] = useState(
    new Sound(toBePlayed, null, (error) => {
      if (error) {
        console.log("failed to load the sound", error);

        return;
      }
      // if loaded successfully
      console.log(
        "duration (s): " +
          audio.getDuration() +
          " # channels: " +
          audio.getNumberOfChannels()
      );
    })
  );

  useEffect(() => {
    audio.setVolume(1);
    return () => {
      audio.release();
    };
  }, []);

  // useEffect(() => {
  //   console.log("decoding error PLAY");
  //   setToBePlayed(
  //     "https://ia800705.us.archive.org/7/items/careers_danger_daring_1011/careersdangerdaring_01_moffett.mp3"
  //   );
  //   audio.play((success) => {
  //     if (success) {
  //       setPlaying(false);
  //       console.log("successfully finished playing");
  //     }
  //   });
  // }, [decodingErrorOcurred]);

  function handleRetryPlaying(url: string) {
    console.log("decoding error PLAY");
    setToBePlayed(url);
    audio.play((success) => {
      if (success) {
        setPlaying(false);
        console.log("successfully finished playing");
      }
    });
  }

  function handlePlayAudio() {
    console.log("CLICK");
    audio.play((success) => {
      if (success) {
        setPlaying(false);
        console.log("successfully finished playing");
      } else {
        setPlaying(false);
        handleRetryPlaying(
          "https://ia800705.us.archive.org/7/items/careers_danger_daring_1011/careersdangerdaring_01_moffett.mp3"
        );
        console.log("playback failed due to audio decoding errors");
      }
    });
    setPlaying(true);
  }

  function handlePauseAudio() {
    console.log("PAUSE");
    audio.pause();
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
