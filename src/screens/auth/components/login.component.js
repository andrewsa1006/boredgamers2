import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import TextInputComponent from "../../../components/text-inputs/text-input.component";
import i18n from "../../../i18n";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View>
      <TextInputComponent
        label={i18n.t("auth__email_label")}
        value={email}
        onChange={setEmail}
      />

      <TextInputComponent
        label={i18n.t("auth__password_label")}
        value={password}
        onChange={setPassword}
      />

      <Button
        style={styles.marginBottom}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        {i18n.t("auth__login")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 15,
  },
});

export default LoginComponent;
