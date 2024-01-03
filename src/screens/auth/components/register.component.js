import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import TextInputComponent from "../../../components/text-inputs/text-input.component";
import i18n from "../../../i18n";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  return (
    <View>
      <TextInputComponent
        label={i18n.t("auth__email_label")}
        value={email}
        onChange={setEmail}
      />
      <TextInputComponent
        label={i18n.t("auth__username_label")}
        value={username}
        onChange={setUsername}
      />
      <TextInputComponent
        label={i18n.t("auth__password_label")}
        value={password}
        onChange={setPassword}
      />
      <TextInputComponent
        label={i18n.t("auth__confirm_password_label")}
        value={password2}
        onChange={setPassword2}
      />
      <Button
        style={styles.marginBottom}
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        {i18n.t("auth__register")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 15,
  },
});

export default RegisterComponent;
