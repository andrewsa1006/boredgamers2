import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

import i18n from "../../i18n";
import LoginComponent from "./components/login.component";
import RegisterComponent from "./components/register.component";
import OfflineRegisterComponent from "./components/offline-register.component";

const AuthScreen = () => {
  const [offlineOnly, setOfflineOnly] = useState(false);
  const [register, setRegister] = useState(false);

  const toggleAuthMode = () => {
    setRegister((prevState) => !prevState);
  };

  const toggleOfflineMode = () => {
    setOfflineOnly((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      {offlineOnly ? (
        <OfflineRegisterComponent />
      ) : register ? (
        <RegisterComponent />
      ) : (
        <LoginComponent />
      )}

      {offlineOnly ? null : (
        <Button
          style={styles.marginBottom}
          mode="outlined"
          onPress={toggleAuthMode}
        >
          {register
            ? i18n.t("auth__switch_to_login_message")
            : i18n.t("auth__switch_to_register_message")}
        </Button>
      )}

      {offlineOnly ? (
        <Text>
          {i18n.t("auth__switch_to_online_message_part_1")}{" "}
          <Text style={styles.hereText} onPress={toggleOfflineMode}>
            {i18n.t("auth__here")}
          </Text>{" "}
          {i18n.t("auth__instead")}
        </Text>
      ) : (
        <Text>
          {i18n.t("auth__switch_to_offline_message_part_1")}{" "}
          <Text style={styles.hereText} onPress={toggleOfflineMode}>
            {i18n.t("auth__here")}
          </Text>{" "}
          {i18n.t("auth__instead")}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "80%",
  },
  marginBottom: {
    marginBottom: 15,
  },
  hereText: {
    textDecorationLine: "underline",
    color: "purple",
  },
});

export default AuthScreen;
