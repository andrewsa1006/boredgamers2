import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const TextInputComponent = ({
  label,
  value,
  onChange,
  customStyle,
  keyboardType,
  multiline,
  placeholder,
}) => {
  return (
    <View>
      <TextInput
        label={label}
        value={value}
        onChangeText={(text) => onChange(text)}
        style={[styles.marginBottom, { ...customStyle }]}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 15,
  },
});

export default TextInputComponent;
