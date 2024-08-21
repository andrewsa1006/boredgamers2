import { useContext, useState } from "react";
import { List } from "react-native-paper";
import AppContext from "../../../../contexts/app.context";

const ListSelector = ({ selectedList, setSelectedList }) => {
  const { appState } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);
  const handleSelectList = (list) => {
    setSelectedList(list);
    setExpanded(false);
  };
  return (
    <List.Accordion
      title={selectedList}
      left={(props) => <List.Icon {...props} icon="folder" />}
      expanded={expanded}
      onPress={handlePress}
    >
      {Array.from(Object.keys(appState.lists)).map((list, index) => (
        <List.Item
          onPress={handleSelectList.bind(this, list)}
          key={index}
          title={list}
        />
      ))}
    </List.Accordion>
  );
};

export default ListSelector;
