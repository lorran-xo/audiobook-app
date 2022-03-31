import "react-native-gesture-handler";
import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { StackNavigator } from "./src/routes/app.routes";

import { BottomBar, BottomText } from "./src/bottomBar/styles";

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
        <StatusBar translucent={true} backgroundColor={"transparent"} />
      </SafeAreaView>

      <StackNavigator />
      <BottomBar>
        <BottomText> By Lorran Oliveira</BottomText>
      </BottomBar>
    </NavigationContainer>
  );
};

export default App;
