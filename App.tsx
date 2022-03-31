import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { StackNavigator } from "./src/routes/app.routes";

import { BottomBar, BottomText } from "./src/bottomBar/styles";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <StackNavigator />
      <BottomBar>
        <BottomText> By Lorran Oliveira</BottomText>
      </BottomBar>
    </NavigationContainer>
  );
};

export default App;
