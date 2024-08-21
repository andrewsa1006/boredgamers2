import { useState, useContext } from "react";
import { View, Image, ScrollView } from "react-native";
import {
  Text,
  Card,
  IconButton,
  Button,
  DataTable,
  Chip,
  Banner,
  Menu,
  Divider,
} from "react-native-paper";
import moment from "moment";
import AppContext from "../../../contexts/app.context";

const PlayCardComponent = ({
  play,
  toggleEditPlayModalVisibility,
  setPlayToEdit,
}) => {
  const [showFullNotes, setShowFullNotes] = useState(false);
  const [visible, setVisible] = useState(false);
  const { appState, setPlays, setLists } = useContext(AppContext);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const deletePlay = (game) => {
    let tempPlays = [...appState.Plays];
    tempPlays = tempPlays.filter((el) => el.id !== game.id);
    console.log(tempPlays);
    setPlays(tempPlays);
    closeMenu();
  };

  const editPlay = () => {
    closeMenu();
    toggleEditPlayModalVisibility();
    setPlayToEdit(play);
  };

  const addToList = (list) => {
    let gameItem = {};
    gameItem.name = play.name;
    gameItem.minPlayers = play.minPlayers;
    gameItem.maxPlayers = play.maxPlayers;
    gameItem.imageURI = play.imageURI;
    gameItem.minPlayTime = play.minPlayTime;
    gameItem.maxPlayTime = play.maxPlayTime;
    gameItem.description = play.description;
    gameItem.age = play.age;
    gameItem.mechanics = play.mechanics;
    gameItem.categories = play.categories;
    let tempList = [...appState.lists[list]];
    tempList.push(gameItem);
    setLists({ name: list, value: tempList });
  };

  return (
    <Card style={{ minHeight: 150, marginBottom: 10 }}>
      <Card.Title
        titleStyle={{ marginLeft: 25 }}
        titleVariant="headlineMedium"
        subtitleStyle={{ marginLeft: 25 }}
        title={play.name}
        subtitle={
          moment(play?.date?.toString()).format("YYYY-MM-DD") +
          (play?.location ? ` at ${play.location}` : "")
        }
        right={(props) => (
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <IconButton {...props} icon="dots-vertical" onPress={openMenu} />
            }
          >
            <Menu.Item onPress={editPlay.bind(this, play)} title="Edit Play" />
            <Menu.Item
              onPress={deletePlay.bind(this, play)}
              title="Delete Play"
            />
            <Divider />
            {Array.from(Object.keys(appState.lists)).map((list, index) => {
              let i = appState.lists[list].findIndex(
                (el) => el.name === play.name
              );
              if (i === -1) {
                return (
                  <Menu.Item
                    key={index}
                    onPress={addToList.bind(this, list)}
                    title={"Add To " + list}
                  />
                );
              }
            })}
          </Menu>
        )}
        left={() => (
          <Image
            style={{ width: 75, height: 75, top: 15, borderRadius: 10 }}
            source={{
              uri: `${play?.imageURI}`,
            }}
          />
        )}
      />
      <Card.Content>
        <ScrollView horizontal>
          {play?.recordTime ? (
            <Chip
              style={{ maxWidth: 100, marginTop: 25, marginRight: 15 }}
              icon="watch"
              onPress={() => console.log("Pressed")}
            >
              {play.playTimeHours + "h " + play.playTimeMins + "m"}
            </Chip>
          ) : null}
          {play?.cooperative ? (
            <Chip
              style={{ maxWidth: 100, marginTop: 25, marginRight: 15 }}
              icon="account-group"
              onPress={() => console.log("Pressed")}
            >
              Coop
            </Chip>
          ) : null}
        </ScrollView>
        {play?.players?.length ? (
          <View>
            <Text style={{ marginTop: 25 }} variant="titleMedium">
              Player Info
            </Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Player</DataTable.Title>
                <DataTable.Title numeric>Score</DataTable.Title>
                <DataTable.Title numeric>Victory</DataTable.Title>
                <DataTable.Title numeric>Team</DataTable.Title>
              </DataTable.Header>

              {play?.players?.map((player, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{player.username}</DataTable.Cell>
                  <DataTable.Cell numeric>{player.score}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {<IconButton icon={player?.victory ? "check" : "cancel"} />}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {play.teams ? player.team : index + 1}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        ) : null}
        {play?.notes ? (
          <Banner
            style={{ marginTop: 15 }}
            visible={true}
            actions={
              play.notes.length > 30
                ? [
                    {
                      label: showFullNotes ? "Show Less" : "Show More",
                      onPress: () => setShowFullNotes(!showFullNotes),
                    },
                  ]
                : []
            }
          >
            <Text style={{ fontWeight: "bold" }}>NOTES:</Text>{" "}
            {showFullNotes ? play.notes : play?.notes.substr(0, 30)}
          </Banner>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default PlayCardComponent;
