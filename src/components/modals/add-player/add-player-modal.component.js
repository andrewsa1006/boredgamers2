import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Text, Button, Switch, Portal, Modal, List } from "react-native-paper";
import { useEffect, useState } from "react";

import TextInputComponent from "../../text-inputs/text-input.component";
import SwitchComponent from "../../switch/switch.component";

const AddPlayerModal = ({
  visible,
  toggleAddPlayerModalVisibility,
  submitPlayerInfo,
  teams,
  numTeams,
}) => {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");
  const [victory, setVictory] = useState(false);
  const [numTeamsExpanded, setNumTeamsExpanded] = useState(false);
  const [currTeam, setCurrTeam] = useState(1);

  const toggleVictory = () => setVictory(!victory);
  const toggleNumTeamsExpanded = () => setNumTeamsExpanded(!numTeamsExpanded);

  const updateCurrTeam = (team) => {
    setCurrTeam(team);
    toggleNumTeamsExpanded();
  };

  const onClose = () => {
    if (username.length > 1) {
      submitPlayerInfo({
        username: username,
        score: score.toString(),
        victory: victory,
        team: currTeam,
      });
    }
    setUsername("");
    setScore("");
    setVictory(false);
    toggleAddPlayerModalVisibility();
  };

  return (
    <Portal>
      <Modal onDismiss={onClose} visible={visible}>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            backgroundColor: "white",
            padding: 30,
            borderRadius: 15,
          }}
        >
          <Text>Player Information</Text>
          <TextInputComponent
            label={"Username"}
            value={username}
            onChange={setUsername}
            placeholder={"Username"}
          />
          <View>
            <TextInputComponent
              label={"Score"}
              value={score}
              onChange={setScore}
              keyboardType="number-pad"
              placeholder={"Score"}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <SwitchComponent
              label={"Victory?"}
              value={victory}
              onValueChange={toggleVictory}
            />
          </View>
          {teams ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text>Team:</Text>
              <ScrollView style={{ maxHeight: 350 }}>
                <List.Accordion
                  title={`Team ` + currTeam}
                  expanded={numTeamsExpanded}
                  onPress={toggleNumTeamsExpanded}
                >
                  {Array.from({ length: numTeams }, (_, i) => i + 1).map(
                    (team, index) => (
                      <Pressable
                        key={index}
                        onPress={updateCurrTeam.bind(this, team)}
                      >
                        <List.Item title={team.toString()} />
                      </Pressable>
                    )
                  )}
                </List.Accordion>
              </ScrollView>
            </View>
          ) : null}
          <View>
            <Button onPress={onClose} mode="contained">
              Add Player
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddPlayerModal;

const styles = StyleSheet.create({});
