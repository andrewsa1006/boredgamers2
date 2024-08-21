import { useState } from "react";
import {
  Text,
  Card,
  IconButton,
  Button,
  Chip,
  Modal,
  Portal,
} from "react-native-paper";
import { View, Image, ScrollView } from "react-native";

const ViewGameDetailsModal = ({ gameInfo, visible, toggleVisible }) => {
  return (
    <Portal>
      <Modal
        onDismiss={toggleVisible}
        visible={visible}
        style={{ maxHeight: "95%" }}
      >
        <ScrollView>
          {gameInfo.name ? (
            <Card style={{ minHeight: 150, marginBottom: 10 }}>
              <Card.Title
                titleStyle={{ marginLeft: 25 }}
                titleVariant="headlineLarge"
                title={gameInfo.name}
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
                <View>
                  <Text style={{ marginTop: 25 }} variant="headlineMedium">
                    Details
                  </Text>

                  {gameInfo.minPlayers && gameInfo.maxPlayers ? (
                    <Text>
                      {gameInfo.minPlayers} - {gameInfo.maxPlayers} players
                    </Text>
                  ) : (
                    <Text variant="bodyLarge">No recommended player data</Text>
                  )}

                  {gameInfo.minPlayTime && gameInfo.maxPlayTime ? (
                    <Text>
                      {gameInfo.minPlayTime} - {gameInfo.maxPlayTime} mins
                    </Text>
                  ) : (
                    <Text variant="bodyLarge">
                      No recommended play time data
                    </Text>
                  )}

                  {gameInfo.age ? (
                    <Text>Recommended minimum age: {gameInfo.age} </Text>
                  ) : (
                    <Text variant="bodyLarge">No recommended age data</Text>
                  )}
                </View>

                {gameInfo.mechanics.length > 0 ? (
                  <View>
                    <Text style={{ marginTop: 25 }} variant="headlineSmall">
                      Mechanics
                    </Text>
                    <ScrollView horizontal>
                      {gameInfo.mechanics.map((mechanic, index) => (
                        <Chip
                          key={index}
                          style={{
                            marginRight: 15,
                            marginTop: 10,
                          }}
                          onPress={() => console.log(mechanic)}
                        >
                          {mechanic}
                        </Chip>
                      ))}
                    </ScrollView>
                  </View>
                ) : null}

                {gameInfo.categories.length > 0 ? (
                  <View>
                    <Text style={{ marginTop: 25 }} variant="headlineSmall">
                      Categories
                    </Text>
                    <ScrollView horizontal>
                      {gameInfo.categories.map((category, index) => (
                        <Chip
                          key={index}
                          style={{
                            marginRight: 15,
                            marginTop: 10,
                          }}
                          onPress={() => console.log(category)}
                        >
                          {category}
                        </Chip>
                      ))}
                    </ScrollView>
                  </View>
                ) : null}
                <Text style={{ marginTop: 25 }} variant="bodyMedium">
                  {gameInfo.description}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={toggleVisible}>Go Back</Button>
              </Card.Actions>
            </Card>
          ) : null}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default ViewGameDetailsModal;
