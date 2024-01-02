import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/splash/splash.screen";
import MainTabNavigator from "./main/main-tab.navigator";
import AuthScreen from "../screens/auth/auth.screen";
import AppContext from "../contexts/app.context";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [loading, setLoading] = useState(false);
  const [hideSplash, setHideSplash] = useState(false);
  const { appState } = useContext(AppContext);

  useEffect(() => {
    if (appState?.id) {
      setLoading(false);
    }
  }, [appState?.id]);

  return (
    <NavigationContainer
      onReady={() => {
        setTimeout(() => {
          setHideSplash(true);
        }, 2500);
      }}
    >
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        {!hideSplash && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
        {!loading && appState.id === "0" && (
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
        )}
        {!loading && appState.id !== "0" && (
          <Stack.Screen name="Main Navigator" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
