import { View, StyleSheet } from "react-native";
import { Text, Switch } from "react-native-paper";

const SwitchComponent = ({
  label,
  value,
  setValue,
  customLabelStyle,
  customSwitchStyle,
  customViewStyle,
}) => {
  return (
    <View style={[styles.baseViewStyle, { ...customViewStyle }]}>
      <Text style={[styles.baseLabelStyle, { ...customLabelStyle }]}>
        {label}
      </Text>
      <Switch
        style={[styles.baseSwitchStyle, { ...customSwitchStyle }]}
        value={value}
        onValueChange={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  baseViewStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },

  baseLabelStyle: {},

  baseSwitchStyle: {},
});

export default SwitchComponent;
