import React, { useEffect, useState } from "react";
import { Linking, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/AntDesign";

import {
  Container,
  BackContainer,
  TitleContainer,
  HeaderContainer,
  TitleText,
} from "./styles";
import { AudioBookItem } from "../../components/AudioBookItem";
import { RootStackParamsList } from "../../routes/app.routes";
import { AUDIO_LIST } from "./../mockData";

type detailScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  "Details"
>;

type DetailsProps = {
  id: number;
  title: string;
  description: string;
  thumbnail: { archiveImage: string };
};

export function Details() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [detailedData, setDetailedData] = useState([]);
  const [audio, setAudio] = useState([]);

  const navigation = useNavigation<detailScreenProps>();
  const route = useRoute();

  const params = route.params;

  useEffect(() => {
    if (params) {
      getSelectedDetails();
    }
  }, []);

  async function getSelectedDetails() {
    try {
      const [descriptionData, audioData] = await axios.all([
        axios.get(
          `https://librivox.org/api/feed/audiobooks/?id=${params?.selectedBookId}&format=json`
        ),
        axios.get(
          `https://librivox.org/api/feed/audiotracks/?id=${params?.selectedBookId}&format=json`
        ),
      ]);

      const reducedDetailedData = descriptionData.data.books.map(
        (item: DetailsProps, index: number) => {
          return {
            id: index,
            title: item.title,
            description: item.description,
            thumbnail: item.archiveImage
              ? item.archiveImage
              : params?.selectedBookImage,
          };
        }
      );

      setDetailedData(reducedDetailedData);
      setAudio(audioData.data);
    } catch (error) {
      console.log("An error ocurred", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <HeaderContainer>
            <BackContainer onPress={() => navigation.navigate("Home")}>
              <Icon name="doubleleft" size={20} color="#000" />
            </BackContainer>
            <TitleContainer>
              <TitleText> Audiobook Details </TitleText>
            </TitleContainer>
          </HeaderContainer>

          <AudioBookItem
            title={detailedData[0]?.title}
            description={detailedData[0]?.description}
            playableUrl={
              AUDIO_LIST[Math.floor(Math.random() * AUDIO_LIST.length)]
            }
            thumbnailUrl={detailedData[0]?.thumbnail}
            playable
          />
        </View>
      )}
    </Container>
  );
}
