import { useState, useEffect, useContext } from "react";
import {
  Text,
  Button,
  List,
  Switch,
  Searchbar,
  SegmentedButtons,
} from "react-native-paper";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import i18n from "../../i18n/index.js";
import constants from "../../config/constants.js";
import { getGameIds, getGameList } from "../../utils/utils.js";
import AppContext from "../../contexts/app.context.js";
import TextInputComponent from "../../components/text-inputs/text-input.component";
import AddPlayItemComponent from "./components/play-item/add-play-item.component.js";
import AddListItemComponent from "./components/list-item/add-list-item.component.js";
import SearchFlatList from "./components/search/search-flatlist.component.js";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const ManageGameScreen = () => {
  const { appState } = useContext(AppContext);
  const tabBarHeight = useBottomTabBarHeight();

  const [listMap, setListMap] = useState(["Plays"]);
  const [addType, setAddType] = useState("search");
  const [gameName, setGameName] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [gameSearchList, setGameSearchList] = useState([]);
  const [includeExtraMaterial, setIncludeExtraMaterial] = useState(false);
  const [curatedGameList, setCuratedGameList] = useState([]);
  const [gameInfo, setGameInfo] = useState({});
  const [saveToSelection, setSaveToSelection] = useState("Plays");
  const [saveToAccordionExpanded, setSaveToAccordionExpanded] = useState(false);

  const searchGame = async () => {
    if (gameName.length > 0) {
      setSearchLoading(true);
      let idString = await getGameIds(
        `${constants.bggBaseURI}/search?search=${gameName}`
      );
      let tempGameArray = await getGameList(
        `${constants.bggBaseURI}/boardgame/${idString}`
      );
      let tempCuratedGameList = tempGameArray.filter((game) => {
        return !game.categories.includes("Expansion for Base-game");
      });
      setCuratedGameList(tempCuratedGameList);
      setGameSearchList(tempGameArray);
      setSearchLoading(false);
    }
  };

  const resetSearch = () => {
    setGameSearchList([]);
    setCuratedGameList([]);
    setGameInfo({});
  };

  const handleToggleSaveToAccordion = () =>
    setSaveToAccordionExpanded(!saveToAccordionExpanded);

  const handleChangeSaveToSelection = (list) => {
    setSaveToSelection(list);
    handleToggleSaveToAccordion();
  };

  const generateListMap = () => {
    let tempArr = [...listMap];
    for (const list in appState.lists) {
      tempArr.push(list);
    }
    setListMap(tempArr);
  };

  useEffect(() => {
    generateListMap();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SegmentedButtons
        style={{ marginBottom: 20 }}
        value={addType}
        onValueChange={setAddType}
        buttons={[
          {
            value: "search",
            label: "Search Game",
          },
          {
            value: "custom",
            label: "Custom",
          },
        ]}
      />
      <View style={{ marginBottom: 20 }}>
        <List.Section title="Save To...">
          <List.Accordion
            title={saveToSelection}
            left={(props) => <List.Icon {...props} icon="folder" />}
            expanded={saveToAccordionExpanded}
            onPress={handleToggleSaveToAccordion}
          >
            {listMap.map((list, index) => (
              <List.Item
                onPress={handleChangeSaveToSelection.bind(this, list)}
                key={index}
                left={
                  list === saveToSelection
                    ? (props) => <List.Icon {...props} icon="check" />
                    : null
                }
                title={list}
              />
            ))}
          </List.Accordion>
        </List.Section>
      </View>

      <View style={{ marginBottom: 20 }}>
        {addType === "search" ? (
          <View>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <Searchbar
                placeholder={"Search here.."}
                value={gameName}
                onChangeText={setGameName}
                loading={searchLoading}
                onSubmitEditing={searchGame}
                onClearIconPress={resetSearch}
              />
            </View>
            {gameSearchList.length > 0 || searchLoading ? (
              <SearchFlatList
                searchLoading={searchLoading}
                gameInfo={gameInfo}
                setGameInfo={setGameInfo}
                gameList={
                  includeExtraMaterial ? gameSearchList : curatedGameList
                }
                setGameSearchList={setGameSearchList}
                includeExtraMaterial={includeExtraMaterial}
                setIncludeExtraMaterial={setIncludeExtraMaterial}
              />
            ) : null}
          </View>
        ) : (
          <TextInputComponent
            label={"Game Name"}
            value={gameName}
            onChange={setGameName}
          />
        )}
      </View>

      <View>
        <Text style={{ fontSize: 13, marginLeft: 15 }}>Optional Data</Text>
      </View>

      <ScrollView style={{ marginBottom: 150 }}>
        {saveToSelection === "Plays" ? (
          <AddPlayItemComponent
            gameInfo={gameInfo}
            setGameInfo={setGameInfo}
            setGameName={setGameName}
            addType={addType}
            gameName={gameName}
          />
        ) : (
          <AddListItemComponent />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    alignContent: "center",
    alignSelf: "center",
    width: "90%",
  },
  createNewListStyle: {
    marginBottom: 50,
    marginTop: 50,
  },
  buttonStyle: {
    marginBottom: 15,
  },
  saveToAccordion: {
    width: "60%",
  },
});

export default ManageGameScreen;
