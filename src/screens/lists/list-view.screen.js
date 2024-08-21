import { useState, useContext } from "react";
import { View } from "react-native";
import AppContext from "../../contexts/app.context";

import ListSelector from "./components/selector/list-selector.component";
import ListItemComponent from "./components/selector/list-item/list-item.component";

const ListViewScreen = () => {
  const { appState } = useContext(AppContext);
  const [selectedList, setSelectedList] = useState(
    Array.from(Object.keys(appState.lists))[0]
  );

  return (
    <View>
      <ListSelector
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
      {appState.lists[selectedList].map((game, index) => (
        <ListItemComponent key={index} game={game} />
      ))}
    </View>
  );
};

export default ListViewScreen;
