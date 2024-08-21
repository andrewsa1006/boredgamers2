import { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  Switch,
  Card,
  TextInput,
  Button,
  DataTable,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";

import AddPlayerModal from "../../../../components/modals/add-player/add-player-modal.component.js";
import AppContext from "../../../../contexts/app.context.js";
import GameInfoCard from "../../../../components/game-info-card/game-info-card.component.js";
import SwitchComponent from "../../../../components/switch/switch.component.js";
import TextInputComponent from "../../../../components/text-inputs/text-input.component.js";
import ViewGameDetailsModal from "../../../../components/modals/view-game-details/view-game-details-modal.component.js";
import EditPlayerModal from "../../../../components/modals/edit-player/edit-player-modal.component.js";

const AddPlayItemComponent = ({
  gameInfo,
  setGameInfo,
  setGameName,
  addType,
  gameName,
}) => {
  const navigation = useNavigation();
  const { appState, setPlays } = useContext(AppContext);
  const [addPlayerModalVisibility, setAddPlayerModalVisibility] =
    useState(false);
  const [editPlayerModalVisibility, setEditPlayerModalVisibility] =
    useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [pickDate, setPickDate] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [addPlayers, setAddPlayers] = useState(false);
  const [addGameInfo, setAddGameInfo] = useState(false);
  const [cooperative, setCooperative] = useState(false);
  const [teams, setTeams] = useState(false);
  const [recordPlaytime, setRecordPlaytime] = useState(false);
  const [playTimeHours, setPlayTimeHours] = useState("00");
  const [playTimeMins, setPlayTimeMins] = useState("00");
  const [recordLocation, setRecordLocation] = useState(false);
  const [playLocation, setPlayLocation] = useState("");
  const [numTeams, setNumTeams] = useState(2);
  const [takeNotes, setTakeNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [playerToEdit, setPlayerToEdit] = useState({});
  const [gameDetailsModalVisible, setGameDetailsModalVisible] = useState(false);
  const [focusedGame, setFocusedGame] = useState({});
  const [players, setPlayers] = useState([
    {
      username: appState.username,
      score: "0",
      victory: true,
    },
  ]);

  const toggleAddPlayers = () => setAddPlayers(!addPlayers);
  const toggleAddGameInfo = () => setAddGameInfo(!addGameInfo);
  const toggleCooperative = () => setCooperative(!cooperative);
  const toggleTeams = () => setTeams(!teams);
  const toggleRecordPlayTime = () => setRecordPlaytime(!recordPlaytime);
  const toggleRecordLocation = () => setRecordLocation(!recordLocation);
  const toggleTakeNotes = () => setTakeNotes(!takeNotes);
  const toggleGameDetailsModalVisible = () =>
    setGameDetailsModalVisible(!gameDetailsModalVisible);

  const intentionallySetDate = () => {
    setPickDate(true);
    setShowDate(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDate(false);
    setDate(currentDate);
  };

  const togglePlayerVictory = (username) => {
    let index = players.findIndex((player) => player.username === username);
    let newPlayerArr = [...players];
    newPlayerArr[index].victory = !newPlayerArr[index].victory;
    setPlayers(newPlayerArr);
  };

  const toggleAddPlayerModalVisibility = () =>
    setAddPlayerModalVisibility(!addPlayerModalVisibility);
  const toggleEditPlayerModalVisibility = () =>
    setEditPlayerModalVisibility(!editPlayerModalVisibility);

  const submitPlayerInfo = (player) => {
    let index = players.findIndex(
      (plyer) => plyer.username === player.username
    );
    let newPlayerArr = [...players];
    if (index > -1) {
      newPlayerArr[index] = player;
    } else {
      newPlayerArr.push(player);
    }
    setPlayers(newPlayerArr);
  };

  const editPlayer = (player) => {
    setPlayerToEdit(player);
    toggleEditPlayerModalVisibility();
  };

  const resetFields = () => {
    setGameInfo({});
    setPlayers({
      username: appState.username,
      score: "0",
      victory: true,
    });
    setAddGameInfo(false);
    setAddPlayers(false);
    setCooperative(false);
    setTeams(false);
    setNumTeams(2);
    setNotes(null);
    setGameName("");
    setPlayLocation("");
    setRecordLocation(false);
    setRecordPlaytime("");
    setPlayTimeHours("");
    setPlayTimeMins("");
  };

  const submitGameToPlays = () => {
    if (
      (addType === "search" && gameInfo.name) ||
      (addType === "custom" && gameName !== "")
    ) {
      let gameData = {};
      if (addType === "search") {
        gameData = { ...gameInfo };
      } else {
        gameData.name = gameName;
        gameData.imageURI = "../../../../../resources/pngs/question-mark.png";
      }
      gameData.id = uuidv4();
      if (addGameInfo) {
        cooperative ? (gameData.cooperative = true) : null;
        teams ? (gameData.teams = true) : null;
        teams ? (gameData.numTeams = numTeams) : null;
      }

      if (addPlayers) {
        gameData.players = players;
      }

      if (notes) {
        gameData.notes = notes;
      }

      if (pickDate) {
        gameData.date = date;
      }

      if (recordPlaytime && playTimeHours !== "" && playTimeMins !== "") {
        gameData.recordTime = true;
        gameData.playTimeHours = playTimeHours;
        gameData.playTimeMins = playTimeMins;
      }

      if (recordLocation) {
        gameData.location = playLocation;
      }

      console.log(gameData.id);

      let playsList = [...appState["Plays"]];
      playsList.unshift(gameData);
      setPlays(playsList);
      resetFields();
      navigation.navigate("Home");
    }
  };

  return (
    <View>
      <GameInfoCard
        gameInfo={gameInfo}
        setFocusedGame={setFocusedGame}
        toggleGameDetailsModalVisible={toggleGameDetailsModalVisible}
      />

      <Card style={{ marginBottom: 15 }}>
        <Card.Title
          title={"Game Options"}
          right={() => (
            <Switch value={addGameInfo} onValueChange={toggleAddGameInfo} />
          )}
        />
        {addGameInfo ? (
          <Card.Content>
            <View>
              <SwitchComponent
                label={"Cooperative?"}
                value={cooperative}
                setValue={toggleCooperative}
              />

              <SwitchComponent
                label={"Teams?"}
                value={teams}
                setValue={toggleTeams}
              />

              <SwitchComponent
                label={"Play Time"}
                value={recordPlaytime}
                setValue={toggleRecordPlayTime}
              />
              {recordPlaytime && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: 15,
                  }}
                >
                  <TextInputComponent
                    placeholder="Hours..."
                    keyboardType="number-pad"
                    onChange={setPlayTimeHours}
                    value={playTimeHours}
                  />
                  <TextInputComponent
                    placeholder="Mins..."
                    keyboardType="number-pad"
                    onChange={setPlayTimeMins}
                    value={playTimeMins}
                  />
                </View>
              )}

              <SwitchComponent
                label={"Location"}
                value={recordLocation}
                setValue={toggleRecordLocation}
              />

              {recordLocation && (
                <View style={{ marginBottom: 15 }}>
                  <TextInput
                    placeholder="Andrew's House"
                    onChangeText={setPlayLocation}
                  />
                </View>
              )}

              <View>
                <Button onPress={intentionallySetDate} mode="outlined">
                  Set Date
                </Button>
                {showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeDate}
                  />
                )}
              </View>

              {teams ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Text>Number of teams:</Text>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="2"
                    onChangeText={setNumTeams}
                  />
                </View>
              ) : null}
            </View>
          </Card.Content>
        ) : null}
      </Card>

      <Card style={{ marginBottom: 15 }}>
        <Card.Title
          title={"Player Data"}
          right={() => (
            <Switch value={addPlayers} onValueChange={toggleAddPlayers} />
          )}
        />
        {addPlayers ? (
          <Card.Content>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Player</DataTable.Title>
                <DataTable.Title numeric>Score</DataTable.Title>
                <DataTable.Title numeric>Victory</DataTable.Title>
                <DataTable.Title numeric></DataTable.Title>
              </DataTable.Header>

              {players.map((player) => (
                <DataTable.Row key={player.username + player.score}>
                  <DataTable.Cell>{player.username}</DataTable.Cell>
                  <DataTable.Cell numeric>{player.score}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {
                      <Switch
                        value={player.victory}
                        onValueChange={togglePlayerVictory.bind(
                          this,
                          player.username
                        )}
                      />
                    }
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Button onPress={editPlayer.bind(this, player)}>
                      Edit
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
              <Button
                onPress={toggleAddPlayerModalVisibility}
                style={{ marginBottom: 5 }}
                mode="contained"
              >
                Add New Player
              </Button>
            </DataTable>
          </Card.Content>
        ) : null}
      </Card>

      <Card style={{ marginBottom: 15 }}>
        <Card.Title
          title={"Notes"}
          right={() => (
            <Switch value={takeNotes} onValueChange={toggleTakeNotes} />
          )}
        />
        {takeNotes ? (
          <TextInput
            multiline
            placeholder="Notes..."
            value={notes}
            onChangeText={setNotes}
          />
        ) : null}
      </Card>

      <Button onPress={submitGameToPlays} mode="contained">
        Record Play
      </Button>

      <AddPlayerModal
        visible={addPlayerModalVisibility}
        toggleAddPlayerModalVisibility={toggleAddPlayerModalVisibility}
        togglePlayerVictory={togglePlayerVictory}
        submitPlayerInfo={submitPlayerInfo}
        teams={teams}
        numTeams={numTeams}
      />

      <EditPlayerModal
        visible={editPlayerModalVisibility}
        toggleEditPlayerModalVisibility={toggleEditPlayerModalVisibility}
        togglePlayerVictory={togglePlayerVictory}
        submitPlayerInfo={submitPlayerInfo}
        teams={teams}
        numTeams={numTeams}
        player={playerToEdit}
      />

      <ViewGameDetailsModal
        visible={gameDetailsModalVisible}
        toggleVisible={toggleGameDetailsModalVisible}
        gameInfo={focusedGame}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddPlayItemComponent;
