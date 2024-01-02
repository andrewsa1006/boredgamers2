import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, memo, useEffect } from "react";

import AppContext from "./app.context";

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    id: null,
    email: null,
    username: null,
    created: 0,
    rated: false,
    secret: "",
    plays: [],
    lists: {
      Collection: [],
      Wishlist: [],
    },
    editPlay: {},
    defaultView: "Plays",
    offlineOnly: false,
    onboardingCompleted: false,
  });

  useEffect(() => {
    AsyncStorage.getItem("appState").then((asValue) => {
      if (asValue) {
        const state = JSON.parse(asValue);

        setAppState(state);
      } else {
        setAppState((value) => ({ ...value, id: "0" }));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  const createUser = (user) => {
    setUserId(user.id);
    setUserCreated(user.created);
    setUserSecret(user.secret);
    setOnboardingCompleted(user.onboardingCompleted);
    setUsername(user.username);
  };

  const setUserId = (userId) => {
    setAppState((value) => ({ ...value, id: userId }));
  };

  const setUserEmail = (email) => {
    setAppState((value) => ({ ...value, email: email }));
  };

  const setUsername = (username) => {
    setAppState((value) => ({ ...value, username: username }));
  };

  const setUserCreated = (created) => {
    setAppState((value) => ({ ...value, created: created }));
  };

  const setUserSecret = (secret) => {
    setAppState((value) => ({ ...value, secret: secret }));
  };

  const setRated = (rated) => {
    setAppState((value) => ({ ...value, rated: rated }));
  };

  const setPlays = (plays) => {
    setAppState((value) => ({ ...value, plays: plays }));
  };

  const setLists = (listData) => {
    let newLists = { ...appState.lists };
    let listDataValue = listData.value;
    newLists[listData.name] = listDataValue;
    setAppState((value) => ({ ...value, lists: newLists }));
  };

  const setEditPlay = (play) => {
    setAppState((value) => ({ ...value, editPlay: play }));
  };

  const setDefaultView = (view) => {
    setAppState((value) => ({ ...value, defaultView: view }));
  };

  const setOfflineOnly = (offlineOnly) => {
    setAppState((value) => ({ ...value, offlineOnly: offlineOnly }));
  };

  const setOnboardingCompleted = (bool) => {
    setAppState((value) => ({ ...value, onboardingCompleted: bool }));
  };

  const value = {
    appState,
    createUser,
    setUserId,
    setUserSecret,
    setUsername,
    setRated,
    setUserEmail,
    setPlays,
    setLists,
    setEditPlay,
    setDefaultView,
    setOfflineOnly,
    setOnboardingCompleted,
  };

  return <AppContext.Provider {...{ value }}>{children}</AppContext.Provider>;
};

export default memo(AppProvider);
