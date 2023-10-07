import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
import { getUserData, updateUserData } from "../../services/handleFirestore";

const PlaceholderLanding = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const TEST_USER = "user6@gmail.com";

  useEffect(() => {
    (async () => {
      let data = await getUserData(TEST_USER);
      setUserData(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome, {userData.username}!</Text>
      <Text>Sleep Streak: {userData.sleepStreak} days</Text>
      <Text>Sleep Duration Goal: {userData.sleepDurationGoal} hours</Text>
      <Button
        title="Increase sleep sleep goal hours"
        onPress={() =>
          // technically works (as in, it does update the db), but doesn't update the locally recognized sleep duration, so you can only do it once per load.
          updateUserData(TEST_USER, {
            sleepDurationGoal: userData.sleepDurationGoal + 1,
          })
        }
      />
      <Button title="Log Out" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PlaceholderLanding;
