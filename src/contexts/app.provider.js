import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, memo, useEffect } from "react";

import AppContext from "./app.context";

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    id: null,
    email: null,
    username: null,
    created: 0,
    secret: "",
    rated: false,
    lists: {
      Collection: [],
      Plays: [],
      Wishlist: [],
    },
    editPlay: {},
    defaultList: "Plays",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const setLists = (listData) => {
    let newLists = { ...appState.lists };
    let listDataValue = listData.value;
    newLists[listData.name] = listDataValue;
    setAppState((value) => ({ ...value, lists: newLists }));
  };

  const setEditPlay = (play) => {
    setAppState((value) => ({ ...value, editPlay: play }));
  };

  const setDefaultList = (list) => {
    setAppState((value) => ({ ...value, defaultList: list }));
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
    setLists,
    setEditPlay,
    setDefaultList,
    setOfflineOnly,
    setOnboardingCompleted,
  };

  return <AppContext.Provider {...{ value }}>{children}</AppContext.Provider>;
};

export default memo(AppProvider);
