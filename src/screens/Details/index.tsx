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
          `https://librivox.org/api/feed/audiobooks/?id=${params.selectedBook}&format=json`
        ),
        axios.get(
          `https://librivox.org/api/feed/audiotracks/?id=${params.selectedBook}&format=json`
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
              : "https://archive.org/download/oneactplaycollection016_2202_librivox/one-act16_2202.jpg",
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
            thumbnailUrl={detailedData[0]?.thumbnail}
            handlePress={() =>
              Linking.openURL(
                audio?.sections?.listen_url ||
                  "https://ia601404.us.archive.org/35/items/oneactplaycollection016_2202_librivox/oneactplays016_01_various_128kb.mp3"
              )
            }
            playable
          />
        </View>
      )}
    </Container>
  );
}
