import { createContext } from "react";

const AppContext = createContext({
  appState: {
    id: null,
    email: null,
    username: null,
    created: 0,
    rated: false,
    secret: "",
    lists: {
      Collection: [],
      Plays: [],
      Wishlist: [],
    },
    editPlay: {},
    defaultList: "Plays",
    offlineOnly: false,
    onboardingCompleted: false,
  },
});

export default AppContext;
