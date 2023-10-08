import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
// import { getUserData, updateUserData } from "../../services/handleFirestore";
import useUserData from "../hooks/useUserData";

const PlaceholderLanding = ({ navigation, currentUser }) => {
  const { userData } = useUserData(currentUser.email);

  return (
    <View style={styles.container}>
      <Text>PLACEHOLDER LANDING</Text>
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
      <Button title="Log Out" onPress={() => FIREBASE_AUTH.signOut()} />
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
