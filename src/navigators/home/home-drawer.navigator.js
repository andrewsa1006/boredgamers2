import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native-paper";

import ViewPlaysScreen from "../../screens/plays/view-plays.screen";
import ListViewScreen from "../../screens/lists/list-view.screen";

const Drawer = createDrawerNavigator();

const Settings = () => {
  return <Text>Hello there! Settings</Text>;
};

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Plays" component={ViewPlaysScreen} />
      <Drawer.Screen name="My Lists" component={ListViewScreen} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
