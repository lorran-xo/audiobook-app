import React from "react";
import { render } from "@testing-library/react-native";
import { AudioPlayer } from "../src/components/AudioPlayer";

describe("Component AudioPlayer", () => {
  it("should render the component correctly", () => {
    const { getByTestId } = render(
      <AudioPlayer audioUrl="https://ia800204.us.archive.org/20/items/brothers_valiant_rm_librivox/allbrotherswerevaliant_01_williams_64kb.mp3" />
    );

    const element = getByTestId("audio-player-comp");

    expect(element).toBeTruthy();
  });
});
