import { Pressable, Image } from "react-native";
import { Text, Card, IconButton } from "react-native-paper";

const SearchItemCard = ({ game, selectGame }) => {
  return (
    <Pressable key={game.objectId} onPress={selectGame.bind(this, game)}>
      <Card style={{ minHeight: 150, marginBottom: 10 }}>
        <Card.Title
          titleStyle={{ marginLeft: 25 }}
          subtitleStyle={{ marginLeft: 25 }}
          title={game.name}
          subtitle={`${game.minPlayers}-${game.maxPlayers} players`}
          left={(props) => (
            <Image
              style={{ width: 75, height: 75, top: 15 }}
              source={{
                uri: `${game.imageURI}`,
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
            {game.description.length > 200
              ? game.description.substring(0, 197) + "..."
              : game.description}
          </Text>
        </Card.Content>
      </Card>
    </Pressable>
  );
};

export default SearchItemCard;
