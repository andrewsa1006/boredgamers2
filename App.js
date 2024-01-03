import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import AppProvider from "./src/contexts/app.provider";
import RootNavigator from "./src/navigators/root.navigator";

const App = () => {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </AppProvider>
  );
};

export default App;
