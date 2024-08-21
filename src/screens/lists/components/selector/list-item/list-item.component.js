import { View, Image, ScrollView } from "react-native";
import { Text, Card, Chip, IconButton } from "react-native-paper";

const ListItemComponent = ({ game }) => {
  return (
    <Card style={{ minHeight: 150, marginBottom: 10 }}>
      <Card.Title
        titleStyle={{ marginLeft: 25 }}
        titleVariant="headlineMedium"
        subtitleStyle={{ marginLeft: 25 }}
        title={game.name}
        left={() => (
          <Image
            style={{ width: 75, height: 75, top: 15, borderRadius: 10 }}
            source={{
              uri: `${game?.imageURI}`,
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
        {game.mechanics.length > 0 ? (
          <View>
            <Text style={{ marginTop: 25 }} variant="bodyLarge">
              Mechanics
            </Text>
            <ScrollView horizontal>
              {game.mechanics.map((mechanic, index) => (
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

        {game.categories.length > 0 ? (
          <View>
            <Text style={{ marginTop: 25 }} variant="bodyLarge">
              Categories
            </Text>
            <ScrollView horizontal>
              {game.categories.map((category, index) => (
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
      </Card.Content>
    </Card>
  );
};

export default ListItemComponent;
