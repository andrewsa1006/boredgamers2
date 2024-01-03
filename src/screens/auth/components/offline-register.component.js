import { useState, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, Banner } from "react-native-paper";

import i18n from "../../../i18n";
import AppContext from "../../../contexts/app.context";
import TextInputComponent from "../../../components/text-inputs/text-input.component";

const OfflineRegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const { createUser } = useContext(AppContext);

  const createOfflineUser = () => {
    if (username.length > 0) {
      createUser({
        username: username,
        id: "offlineUser_" + username,
        created: Date.now(),
        onboardingCompleted: true,
      });
    } else {
      setErrorVisible(true);
      setErrorMsg(i18n.t("auth__username_empty_error_message"));
      setTimeout(() => {
        setErrorVisible(false);
      }, 4000);
    }
  };

  return (
    <View>
      <Banner
        visible={errorVisible}
        actions={[
          {
            label: "Ok",
            onPress: () => setErrorVisible(false),
          },
        ]}
        style={{ marginBottom: 20, backgroundColor: "rgba(217,90,87,0.4)" }}
      >
        {errorMsg}
      </Banner>
      <TextInputComponent
        label={i18n.t("auth__username_label")}
        value={username}
        onChange={setUsername}
      />

      <Button
        style={styles.marginBottom}
        mode="contained"
        onPress={createOfflineUser}
      >
        {i18n.t("auth__register_offline")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 15,
  },
});

export default OfflineRegisterComponent;
