import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import HomeDrawerNavigator from "../home/home-drawer.navigator";
import ManageGameScreen from "../../screens/manage-game/manage-game.screen";
// import MarketPlace from "../screens/Marketplace";

const Tab = createBottomTabNavigator();

const MarketPlace = () => {
  return <Text>Hello there! MarketPlace!</Text>;
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: ["EditPlay", "ViewPlayedGame"].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 5,
          right: 5,
          bottom: 0,
          elevation: 3,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: Dimensions.get("screen").height * 0.08,
          ...styles.shadow,
        },
      })}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../resources/pngs/profile.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  alignSelf: "center",
                  tintColor: focused ? "purple" : null,
                }}
              />
              <Text style={{ color: focused ? "purple" : null, fontSize: 12 }}>
                Home
              </Text>
            </View>
          ),
        }}
        name="Home"
        component={HomeDrawerNavigator}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../resources/pngs/add.png")}
                resizeMode="contain"
                style={{
                  top: -15,
                  width: 80,
                  height: 80,
                  justifyContent: "center",
                  alignSelf: "center",
                  tintColor: focused ? "purple" : null,
                }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
        name="ManageGame"
        component={ManageGameScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../resources/pngs/marketplace.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  justifyContent: "center",
                  alignSelf: "center",
                  tintColor: focused ? "purple" : null,
                }}
              />
              <Text style={{ color: focused ? "purple" : null, fontSize: 12 }}>
                Marketplace
              </Text>
            </View>
          ),
        }}
        name="Marketplace"
        component={MarketPlace}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      heightL: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
