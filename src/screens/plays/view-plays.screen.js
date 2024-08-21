import { useContext, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import {
  Text,
  Card,
  IconButton,
  Button,
  DataTable,
  Chip,
} from "react-native-paper";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import moment from "moment";

import AppContext from "../../contexts/app.context";
import PlayCardComponent from "./components/play-card.component";
import EditPlayModal from "../../components/modals/edit-play/edit-play-modal.component";

const ViewPlaysScreen = ({ navigation }) => {
  const { appState } = useContext(AppContext);
  const [editPlayModalVisible, setEditPlayModalVisible] = useState(false);
  const [playToEdit, setPlayToEdit] = useState({});
  const tabBarHeight = useBottomTabBarHeight();

  // determine if game is in collection
  const renderAddToCollectionButton = () => {};

  const toggleEditPlayModalVisibility = () =>
    setEditPlayModalVisible(!editPlayModalVisible);

  return (
    <View>
      <ScrollView style={{ marginBottom: tabBarHeight }}>
        {appState["Plays"].length > 0 ? (
          appState["Plays"].map((play, index) => {
            return (
              <View key={index}>
                <PlayCardComponent
                  play={play}
                  toggleEditPlayModalVisibility={toggleEditPlayModalVisibility}
                  setPlayToEdit={setPlayToEdit}
                />
              </View>
            );
          })
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Text
              onPress={() => {
                console.log(appState.Plays);
              }}
              variant="headlineLarge"
            >
              Play some games to see them appear here!
            </Text>
          </View>
        )}
      </ScrollView>
      <EditPlayModal
        visible={editPlayModalVisible}
        playToEdit={playToEdit}
        toggleEditPlayModalVisibility={toggleEditPlayModalVisibility}
      />
    </View>
  );
};

export default ViewPlaysScreen;
