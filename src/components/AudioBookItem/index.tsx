import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacityProps} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {
  Container,
  BookDataContainer,
  BookWrapper,
  TextBookTitle,
  TextBookDescription,
  ThumbnailWrapper,
} from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  description?: string;
  playable?: boolean;
  thumbnailUrl: string;
  handlePress: () => void;
}

export function AudioBookItem({
  title,
  description,
  playable = false,
  thumbnailUrl,
  handlePress = () => ({}),
}: Props) {
  return (
    <Container testID="audio-book-comp">
      <BookDataContainer>
        <BookWrapper onPress={() => handlePress()}>
          <TextBookTitle numberOfLines={2} ellipsizeMode="tail">
            {title}
          </TextBookTitle>
        </BookWrapper>

        {description && (
          <ScrollView>
            <TextBookDescription numberOfLines={20} ellipsizeMode="tail">
              {/* regex that removes any tags on the string  */}

              {description.replace(/<\/?[^>]+(>|$)/g, '')}
            </TextBookDescription>
          </ScrollView>
        )}
      </BookDataContainer>

      <ThumbnailWrapper onPress={() => handlePress()}>
        <Image
          style={playable ? styles.playableLogo : styles.tinyLogo}
          source={{
            uri: thumbnailUrl,
          }}
        />
      </ThumbnailWrapper>
    </Container>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
    margin: 5,
  },
  playableLogo: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
