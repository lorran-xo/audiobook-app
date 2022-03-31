import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, ActivityIndicator, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Container, TitleContainer, TitleText, Separator } from "./styles";
import { AudioBookItem } from "../../components/AudioBookItem";
import { RootStackParamsList } from "../../routes/app.routes";
import { IMAGE_LIST } from "./../mockData";

type homeScreenProps = NativeStackNavigationProp<RootStackParamsList, "Home">;

// mocking images and audio since LibriVox api is buggy and not storing all of them anymore.

export function Home() {
  const navigation = useNavigation<homeScreenProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getBookList();
  }, []);

  type BookProps = {
    id: number;
    bookId: number;
    title: string;
    thumbnail: { archiveImage: string };
  };

  async function getBookList() {
    try {
      const response = await axios.get(
        "https://librivox.org/api/feed/audiobooks/search?primary_key=0&search_category=title&search_page=5&format=json&search_form=get_results"
      );

      const reducedInfos = response.data.books.map(
        (item: BookProps, index: number) => {
          return {
            id: index,
            bookId: item.id,
            title: item.title,
            thumbnail: item.archiveImage
              ? item.archiveImage
              : IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)],
          };
        }
      );

      setData(reducedInfos);
    } catch (error) {
      console.log("An error ocurred", error);
    } finally {
      setIsLoading(false);
    }
  }

  function renderSeparator() {
    return <Separator />;
  }

  function renderFlatList() {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => renderEachItem(item)}
        showsVerticalScrollIndicator={true}
        ListHeaderComponent={renderSeparator}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    );
  }

  function renderEachItem(bookData: any) {
    return (
      <View>
        <AudioBookItem
          title={bookData.title}
          thumbnailUrl={bookData.thumbnail}
          handlePress={() =>
            navigation.navigate("Details", {
              selectedBookId: bookData.bookId,
              selectedBookImage: bookData.thumbnail,
            })
          }
          loading={(loading) => setIsLoading(loading)}
        />
      </View>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <TitleText>Audiobook Stories</TitleText>
      </TitleContainer>

      {isLoading ? <ActivityIndicator size="large" /> : renderFlatList()}
    </Container>
  );
}
