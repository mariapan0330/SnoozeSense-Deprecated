import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
// import { getUserData, updateUserData } from "../../services/handleFirestore";
import useUserData from "../hooks/useUserData";
import {
  addTask,
  updateTask,
  updateUserFields,
} from "../../services/handleFirestore";

const PlaceholderLanding = ({ navigation, currentUser }) => {
  const { userData, tasks } = useUserData(currentUser.email);

  return (
    <View style={styles.container}>
      <Text>PLACEHOLDER LANDING</Text>
      <Text>Welcome, {userData.username}!</Text>
      <Text>Birthday: {userData.birthday}</Text>
      <Text>Sleep Streak: {userData.sleepStreak} days</Text>
      <Text>Sleep Duration Goal: {userData.sleepDurationGoal} hours</Text>
      {/* <Text>Tasks attempt: {tasks[1].taskTitle}</Text> */}
      <Text>
        Tasks:{"\n"}
        {tasks &&
          tasks?.map((t, i) => (
            <Text key={`task-${i}`}>
              {i + 1}.{t.taskTitle}
              <Button
                title={t.isComplete ? "√" : "☓"}
                onPress={() => {
                  updateTask(currentUser.email, t.taskTitle, {
                    isComplete: false,
                  });
                }}
              />
              {"\n"}
            </Text>
          ))}
      </Text>
      <Button
        title="Update user birthday"
        onPress={() => {
          updateUserFields(currentUser.email, { birthday: "06.20.2000" });
        }}
      />
      <Button
        title="Add task"
        onPress={() => {
          addTask(currentUser.email, {
            taskTitle: "eat soup",
            taskDuration: 15,
            isComplete: true,
            taskStartTime: "2200",
            enableNotification: false,
          });
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
