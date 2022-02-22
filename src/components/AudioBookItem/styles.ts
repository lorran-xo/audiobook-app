import styled from 'styled-components';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

export const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const BookDataContainer = styled(View)`
  flex: 1;
  margin-left: 8px;
`;

export const BookWrapper = styled(TouchableOpacity)<TouchableOpacityProps>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;

  width: 90%;
`;

export const TextBookTitle = styled(Text)`
  font-weight: 700;
  color: #000000;
  font-size: 17px;
`;

export const TextBookDescription = styled(Text)`
  font-weight: 400;
  color: #808080;
  font-size: 15px;
`;

export const ThumbnailWrapper = styled(TouchableOpacity)<TouchableOpacityProps>`
  justify-content: center;
`;
