import { DataTable, Button, Switch } from "react-native-paper";

const PlayerDataTable = ({
  players,
  togglePlayerVictory,
  toggleEditPlayerModalVisibility,
  loadRight,
  rightIcon,
}) => {
  return (
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
                onValueChange={togglePlayerVictory.bind(this, player.username)}
              />
            }
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {loadRight ? { rightIcon } : null}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
      <Button
        onPress={toggleEditPlayerModalVisibility}
        style={{ marginBottom: 5 }}
        mode="contained"
      >
        Add New Player
      </Button>
    </DataTable>
  );
};

export default PlayerDataTable;
