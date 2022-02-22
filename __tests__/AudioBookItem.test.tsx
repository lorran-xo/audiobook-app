import React from 'react';
import {render} from '@testing-library/react-native';
import {AudioBookItem} from '../src/components/AudioBookItem';

describe('Component AudioBookItem', () => {
  it('should render the component correctly', () => {
    const {getByTestId} = render(
      <AudioBookItem
        title="This is the book title for this audiobook"
        thumbnailUrl="https://archive.org/download/oneactplaycollection016_2202_librivox/one-act16_2202.jpg"
        handlePress={() => console.log('testing')}
      />,
    );

    const element = getByTestId('audio-book-comp');

    expect(element).toBeTruthy();
  });
});
