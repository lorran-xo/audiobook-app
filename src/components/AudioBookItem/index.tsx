import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacityProps } from "react-native";

import {
  Container,
  Wrapper,
  BookDataContainer,
  BookWrapper,
  TextBookTitle,
  TextBookDescription,
  DescriptionWrapper,
  ThumbnailWrapper,
  ClickableElement,
  ReadMoreText,
} from "./styles";

import { AudioPlayer } from "./../AudioPlayer";

interface Props extends TouchableOpacityProps {
  title: string;
  description?: string;
  playable?: boolean;
  loading?: (state: boolean) => void;
  playableUrl?: string;
  thumbnailUrl: string;
  handlePress?: () => void;
}

export function AudioBookItem({
  title,
  description,
  playable = false,
  playableUrl = "",
  thumbnailUrl,
  loading = () => true,
  handlePress = () => ({}),
}: Props) {
  const [textLines, setTextLines] = useState<number>(15);

  return (
    <Container testID="audio-book-comp" playable={playable}>
      <Wrapper playable={playable}>
        <ThumbnailWrapper onPress={() => (playable ? {} : handlePress())}>
          <Image
            style={playable ? styles.playableLogo : styles.tinyLogo}
            source={{
              uri: thumbnailUrl,
            }}
            onLoad={() => loading(false)}
          />
        </ThumbnailWrapper>

        <BookDataContainer>
          <BookWrapper onPress={() => (playable ? {} : handlePress())}>
            <TextBookTitle numberOfLines={2} ellipsizeMode="tail">
              {title}
            </TextBookTitle>
          </BookWrapper>
        </BookDataContainer>

        {playable && <AudioPlayer audioUrl={playableUrl} />}
      </Wrapper>

      {playable && (
        <DescriptionWrapper>
          {description && (
            <TextBookDescription numberOfLines={textLines} ellipsizeMode="tail">
              {/* regex that removes any tags on the string  */}

              {description.replace(/<\/?[^>]+(>|$)/g, "")}
            </TextBookDescription>
          )}
          {description && description?.length >= 500 && textLines === 15 && (
            <ClickableElement onPress={() => setTextLines(70)}>
              <ReadMoreText> Read More</ReadMoreText>
            </ClickableElement>
          )}

          {description && description?.length >= 500 && textLines === 70 && (
            <ClickableElement onPress={() => setTextLines(15)}>
              <ReadMoreText> Read Less</ReadMoreText>
            </ClickableElement>
          )}
        </DescriptionWrapper>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    margin: 2,
  },
  playableLogo: {
    width: 70,
    height: 70,
    margin: 2,
  },
});
