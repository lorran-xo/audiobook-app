import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";

const Stack = createStackNavigator();

export type RootStackParamsList = {
  Home: undefined;
  Details?: { selectedBookId: number; selectedBookImage: string };
};

export function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}
