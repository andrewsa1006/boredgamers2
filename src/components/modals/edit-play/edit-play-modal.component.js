import { useState, useContext, useEffect } from "react";
import {
  Text,
  Card,
  IconButton,
  Button,
  Chip,
  Modal,
  Portal,
  DataTable,
} from "react-native-paper";
import { View, Image, ScrollView, Switch } from "react-native";
import SwitchComponent from "../../switch/switch.component";
import AppContext from "../../../contexts/app.context";
import TextInputComponent from "../../text-inputs/text-input.component";
import DateTimePicker from "@react-native-community/datetimepicker";
import PlayerDataTable from "../../data-tables/player-data-table.component";

const EditPlayModal = ({
  visible,
  playToEdit,
  toggleEditPlayModalVisibility,
}) => {
  const { appState, setPlays } = useContext(AppContext);
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
  const [editPlayerModalVisibility, setEditPlayerModalVisibility] =
    useState(false);
  const [addPlayerModalVisibility, setAddPlayerModalVisibility] =
    useState(false);

  const toggleAddPlayers = () => setAddPlayers(!addPlayers);
  const toggleAddGameInfo = () => setAddGameInfo(!addGameInfo);
  const toggleCooperative = () => setCooperative(!cooperative);
  const toggleTeams = () => setTeams(!teams);
  const toggleRecordPlayTime = () => setRecordPlaytime(!recordPlaytime);
  const toggleRecordLocation = () => setRecordLocation(!recordLocation);
  const toggleTakeNotes = () => setTakeNotes(!takeNotes);
  const toggleGameDetailsModalVisible = () =>
    setGameDetailsModalVisible(!gameDetailsModalVisible);
  const toggleEditPlayerModalVisibility = () =>
    setEditPlayerModalVisibility(!editPlayerModalVisibility);
  const toggleAddPlayerModalVisibility = () =>
    setAddPlayerModalVisibility(!addPlayerModalVisibility);

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

  const updatePlay = () => {
    const tempPlays = [...appState.Plays];
    let tempPlay = {
      ...appState.Plays[
        appState.Plays.findIndex((play) => play.id === playToEdit.id)
      ],
    };

    tempPlay.date = date;
    tempPlay.cooperative = cooperative;
    tempPlay.teams = teams;
    tempPlay.numTeams = numTeams;
    tempPlay.recordPlaytime = recordPlaytime;
    tempPlay.playTimeHours = playTimeHours;
    tempPlay.playTimeMins = playTimeMins;
    tempPlay.recordLocation = recordLocation;
    tempPlay.playLocation = playLocation;
    tempPlay.notes = notes;
    tempPlay.takeNotes = takeNotes;
    tempPlay.addPlayers = addPlayers;
    addPlayers ? (tempPlay.players = players) : (tempPlay.players = []);

    tempPlays[tempPlays.findIndex((play) => play.id === playToEdit.id)] =
      tempPlay;

    setPlays(tempPlays);
    toggleEditPlayModalVisibility();
  };

  const editPlayer = (player) => {
    setPlayerToEdit(player);
    toggleEditPlayerModalVisibility();
  };

  useEffect(() => {
    const loadData = () => {
      if (playToEdit) {
        console.log(playToEdit);
        playToEdit.date
          ? setDate(new Date(playToEdit.date))
          : setDate(new Date(Date.now()));
        setTakeNotes(playToEdit.takeNotes);
        setNotes(playToEdit.notes);
        setCooperative(playToEdit.cooperative);
        setTeams(playToEdit.teams);
        setNumTeams(playToEdit.numTeams);
        setRecordLocation(playToEdit.recordLocation);
        setPlayLocation(playToEdit.playLocation);
        setRecordPlaytime(playToEdit.recordPlaytime);
        setPlayTimeHours(playToEdit.playTimeHours);
        setPlayTimeMins(playToEdit.playTimeMins);
        setAddPlayers(playToEdit.addPlayers);
        playToEdit?.players?.length > 0
          ? setAddPlayers(true)
          : setAddPlayers(false);
        playToEdit?.players?.length > 0
          ? setPlayers(playToEdit.players)
          : setPlayers([]);
      }
    };

    loadData();
  }, [visible]);
  return (
    <Portal>
      <Modal
        onDismiss={toggleEditPlayModalVisibility}
        visible={visible}
        style={{ maxHeight: "95%" }}
      >
        <ScrollView>
          {playToEdit.name ? (
            <Card style={{ minHeight: 150, marginBottom: 10 }}>
              <Card.Title
                titleStyle={{ marginLeft: 25 }}
                titleVariant="headlineSmall"
                title={playToEdit.name}
                left={() => (
                  <Image
                    style={{ width: 75, height: 75, top: 15, borderRadius: 10 }}
                    source={{
                      uri: `${playToEdit?.imageURI}`,
                    }}
                  />
                )}
              />
              <Card.Content>
                <View style={{ marginTop: 25 }}>
                  <SwitchComponent
                    label={"Cooperative"}
                    value={cooperative}
                    setValue={toggleCooperative}
                  />

                  <SwitchComponent
                    label={"Teams"}
                    value={teams}
                    setValue={toggleTeams}
                  />
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
                      <TextInputComponent
                        keyboardType="number-pad"
                        placeholder="2"
                        onChangeText={setNumTeams}
                      />
                    </View>
                  ) : null}

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
                      <TextInputComponent
                        placeholder="Andrew's House"
                        onChangeText={setPlayLocation}
                      />
                    </View>
                  )}

                  <Card style={{ marginBottom: 15 }}>
                    <Card.Title
                      title={"Player Data"}
                      right={() => (
                        <Switch
                          value={addPlayers}
                          onValueChange={toggleAddPlayers}
                        />
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
                              <DataTable.Cell numeric>
                                {player.score}
                              </DataTable.Cell>
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
                </View>
              </Card.Content>
              <Card.Actions>
                <Button onPress={updatePlay}>Finish</Button>
              </Card.Actions>
            </Card>
          ) : null}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default EditPlayModal;
