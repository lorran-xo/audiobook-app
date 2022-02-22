import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, ActivityIndicator, FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Container, TitleContainer, TitleText} from './styles';
import {AudioBookItem} from '../../components/AudioBookItem';

import {RootStackParamsList} from '../../routes/app.routes';

type homeScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Home'>;

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
    thumbnail: {archiveImage: string};
  };

  async function getBookList() {
    try {
      const response = await axios.get(
        'https://librivox.org/api/feed/audiobooks/search?primary_key=0&search_category=title&search_page=1&format=json&search_form=get_results',
      );

      const reducedInfos = response.data.books.map(
        (item: BookProps, index: number) => {
          return {
            id: index,
            bookId: item.id,
            title: item.title,
            thumbnail: item.archiveImage
              ? item.archiveImage
              : 'https://archive.org/download/oneactplaycollection016_2202_librivox/one-act16_2202.jpg',
          };
        },
      );

      setData(reducedInfos);
    } catch (error) {
      console.log('An error ocurred', error);
    } finally {
      setIsLoading(false);
    }
  }

  function renderFlatList() {
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => renderEachItem(item)}
        showsVerticalScrollIndicator={true}
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
            navigation.navigate('Details', {selectedBook: bookData.bookId})
          }
        />
      </View>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <TitleText>Audiobook app</TitleText>
      </TitleContainer>

      {isLoading ? <ActivityIndicator size="large" /> : renderFlatList()}
    </Container>
  );
}
