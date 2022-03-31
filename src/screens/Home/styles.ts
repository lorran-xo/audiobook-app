import styled from "styled-components";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  margin: 3px;
`;

export const TitleContainer = styled(View)`
  margin: 18px;
`;

export const TitleText = styled(Text)`
  font-size: 20px;
  color: #808080;
  font-style: italic;
`;

export const Separator = styled(View)`
  border: 2px solid;
  border-color: #cccccc;
  margin: 0 12px;
`;
