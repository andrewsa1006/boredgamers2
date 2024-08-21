import { useState } from "react";
import { Text, Card, IconButton, Button } from "react-native-paper";
import { View, Image } from "react-native";

const GameInfoCard = ({
  gameInfo,
  setFocusedGame,
  toggleGameDetailsModalVisible,
}) => {
  const viewGameDetails = () => {
    setFocusedGame(gameInfo);
    toggleGameDetailsModalVisible(!toggleGameDetailsModalVisible);
  };

  return (
    <View>
      {gameInfo.name ? (
        <Card style={{ minHeight: 150, marginBottom: 10 }}>
          <Card.Title
            titleStyle={{ marginLeft: 25 }}
            subtitleStyle={{ marginLeft: 25 }}
            title={gameInfo.name}
            subtitle={`${gameInfo.minPlayers}-${gameInfo.maxPlayers} players`}
            left={() => (
              <Image
                style={{ width: 75, height: 75, top: 15 }}
                source={{
                  uri: `${gameInfo?.imageURI}`,
                }}
              />
            )}
            right={(props) => (
              <IconButton
                {...props}
                icon="dots-vertical"
                onPress={() => {
                  console.log("iconbutton");
                }}
              />
            )}
          />
          <Card.Content>
            <Text style={{ marginTop: 25 }} variant="bodyMedium">
              {gameInfo.description.length > 200
                ? gameInfo.description.substring(0, 197) + "..."
                : gameInfo.description}
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={viewGameDetails}>See More</Button>
          </Card.Actions>
        </Card>
      ) : null}
    </View>
  );
};

export default GameInfoCard;
