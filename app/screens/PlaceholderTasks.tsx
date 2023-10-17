import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import useUserData from "../hooks/useUserData";
import { addTask, updateTask } from "../../services/handleFirestore";
import { Task } from "../../types/indexTypes";

const PlaceholderTasks = ({ currentUser }) => {
  const { tasks } = useUserData(currentUser.email);

  const handleAddATask = () => {
    // TODO: this is how you add a task. Change out hardcoded vals for some input form vals maybe?
    addTask(currentUser.email, {
      taskTitle: "abcd",
      taskDuration: 20,
      isComplete: false,
      taskStartTime: "10 00 PM", // times must be string of HH MM AA where AA is AM or PM
      enableNotification: true,
    });
  };

  const handleToggleTaskComplete = (taskTitle: string, changeTo: boolean) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tasktext}>
  {tasks && tasks.length > 0
    ? tasks.map((item: Task, i: number) => (
        <Text key={`task-${i}`}>
          {item.taskTitle}
          <Button
            title={item.isComplete.toString()}
            onPress={() =>
              handleToggleTaskComplete(item.taskTitle, !item.isComplete)
            }
          />
          {"\n"}
        </Text>
      ))
    : "You currently have no tasks"}
</Text>

      <Text style={styles.message}></Text>
      <TouchableOpacity style={styles.button} onPress={handleAddATask}>
        <Text style={styles.buttonText}>Add a Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceholderTasks;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#9174D0",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 240,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    color: "white",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "gray",
  },
  tasktext:{
    color: "white",
  }
});
