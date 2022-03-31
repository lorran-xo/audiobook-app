import styled from "styled-components";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  margin: 5px;
`;

export const TitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 18px;
`;

export const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`;

export const TitleText = styled(Text)`
  font-size: 20px;
  color: #808080;
`;

export const BackContainer = styled(TouchableOpacity)`
  color: #808080;
`;
