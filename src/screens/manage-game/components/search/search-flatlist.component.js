import { FlatList, View } from "react-native";
import { useState } from "react";
import SearchItemCard from "./search-item-card.component";
import { Text } from "react-native-paper";
import SwitchComponent from "../../../../components/switch/switch.component";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const SearchFlatList = ({
  gameList,
  setGameSearchList,
  setGameInfo,
  includeExtraMaterial,
  setIncludeExtraMaterial,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

  const selectGame = (game) => {
    setGameInfo(game);
    setGameSearchList([]);
  };
  return (
    <View style={{ marginBottom: 200 }}>
      <View>
        <SwitchComponent
          label={"Include Extra Material:"}
          value={includeExtraMaterial}
          setValue={setIncludeExtraMaterial}
        />
      </View>
      <FlatList
        style={{ marginBottom: 450 }}
        data={gameList}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <SearchItemCard game={item} selectGame={selectGame} />
        )}
      />
    </View>
  );
};

export default SearchFlatList;
