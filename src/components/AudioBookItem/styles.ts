import styled, { css } from "styled-components";
import {
  TouchableOpacityProps,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";

interface PlayableModeProps {
  playable?: boolean;
}

export const Container = styled(ScrollView)<PlayableModeProps>`
  padding: 0 15px 0 15px;

  ${(props) =>
    props.playable &&
    css`
      margin-bottom: 130px;
    `}
`;

export const Wrapper = styled(View)<PlayableModeProps>`
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.playable &&
    css`
      margin-bottom: 20px;
    `}
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

export const ClickableElement = styled(
  TouchableOpacity
)<TouchableOpacityProps>``;

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
  min-width: 70px;
  max-width: 70px;

  min-height: 70px;
  max-height: 70px;
  justify-content: center;
`;

export const ReadMoreText = styled(Text)`
  font-weight: 600;
  color: #000;
  font-size: 12px;
`;

export const DescriptionWrapper = styled(View)`
  margin-bottom: 80px;
`;
