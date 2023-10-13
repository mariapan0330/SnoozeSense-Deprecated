import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import React, { useState } from "react";
import useUserData from "../hooks/useUserData";
import { calculateTime } from "../../services/handleTime";
import { updateTask } from "../../services/handleFirestore";
import { Task } from "../../types/indexTypes";

function MyCalendar({ currentUser }) {
  const [selected, setSelected] = useState("");
  const { userData, tasks } = useUserData(currentUser.email);

  const handlePress = (taskTitle: string, changeTo: boolean) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "orange", // ts says "selectedDotColor" doesn't exist
            },
          }}
        />
        <View style={styles.goalContainer}>
          <Text style={styles.goalText}>
            {userData
              ? `${userData.username}'s Sleep Goal: ${userData.sleepDurationGoal} Hours`
              : "Loading..."}
          </Text>
        </View>
        <View>
          <Text>
            {tasks ? (tasks.length > 0 ? "Today's Tasks" : "Today's Task") : "Loading..."}{" "}
          </Text>
        </View>

        <View style={styles.container}>
          {tasks ? (
            tasks.length > 0 &&
            tasks.map((task: Task, index: number) => (
              <View style={styles.card} key={index}>
                <View style={styles.textContainer}>
                  <Text style={styles.taskText}>{task.taskTitle}</Text>
                  <Text style={styles.timeframeText}>
                    {calculateTime(task.taskStartTime)} -{" "}
                    {calculateTime(task.taskStartTime, 0, task.taskDuration)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => handlePress(task.taskTitle, !task.isComplete)}
                >
                  {task.isComplete && <Text style={styles.checkMark}>✔</Text>}
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  calendarContainer: {
    marginTop: 50,
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
    marginTop: 40,
  },
  goalText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
  },
  timeframeText: {
    fontSize: 14,
    color: "#666",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  checkMark: {
    fontSize: 20,
    color: "green",
  },
});

export default MyCalendar;
