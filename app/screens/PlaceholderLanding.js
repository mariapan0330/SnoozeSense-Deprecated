import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
// import { getUserData, updateUserData } from "../../services/handleFirestore";
import useUserData from "../hooks/useUserData";

const PlaceholderLanding = ({ navigation }) => {
  const TEST_USER = "user6@gmail.com";
  const { userData } = useUserData("user6@gmail.com");

  return (
    <View style={styles.container}>
      <Text>Welcome, {userData.username}!</Text>
      <Text>Sleep Streak: {userData.sleepStreak} days</Text>
      <Text>Sleep Duration Goal: {userData.sleepDurationGoal} hours</Text>
      <Text>
        Tasks:
        {userData.tasks &&
          userData.tasks.map((t) => (
            <Text key={t.taskTitle}>
              {t.taskTitle}
              {"\n"}
            </Text>
          ))}
      </Text>
      <Button
        title="test button"
        onPress={() => {
          console.log(userData.tasks);
        }}
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
