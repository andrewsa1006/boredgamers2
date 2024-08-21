import { createContext } from "react";

const AppContext = createContext({
  appState: {
    id: null,
    email: null,
    username: null,
    created: 0,
    rated: false,
    secret: "",
    Plays: [],
    lists: {
      Collection: [],
      Wishlist: [],
    },
    editPlay: {},
    defaultView: "Plays",
    offlineOnly: false,
    onboardingCompleted: false,
  },
});

export default AppContext;
