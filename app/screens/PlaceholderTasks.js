import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import useUserData from "../hooks/useUserData";
import { addTask, updateTask } from "../../services/handleFirestore";

const PlaceholderTasks = ({ currentUser }) => {
  const { userData, tasks } = useUserData(currentUser.email);

  const handleAddATask = () => {
    // TODO: this is how you add a task. Change out hardcoded vals for some input form vals maybe?
    addTask(currentUser.email, {
      taskTitle: "aaabc",
      taskDuration: 20,
      isComplete: false,
      taskStartTime: "2200", // times must be string of exactly 4 numbers in military time
      enableNotification: true,
    });
  };

  const handleToggleTaskComplete = (taskTitle, changeTo) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };

  return (
    <View style={styles.container}>
      <Text>
        {tasks.length > 0
          ? tasks.map((item, i) => (
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
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
    color: "gray",
  },
});
