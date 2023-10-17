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
import { colors } from "../../utils/colors";

function MyCalendar({ currentUser }) {
  const [selected, setSelected] = useState("");
  const { userData, tasks } = useUserData(currentUser.email);

  const handlePress = (taskTitle: string, changeTo: boolean) => {
    updateTask(currentUser.email, taskTitle, { isComplete: changeTo });
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={styles.calendarContainer}>
      <View style={styles.goalContainer}>
          <Text style={styles.goalText}>
            {userData
              ? `${userData.username}'s Sleep Goal: ${userData.sleepDurationGoal} Hours`
              : "Loading..."}
          </Text>
        </View>
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
  mainContainer:{
    backgroundColor: colors.background,
  },
  calendarContainer: {
    backgroundColor: colors.background,
    color: colors.textWhite,
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
    color: colors.textWhite,
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
    color: colors.textWhite,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.textWhite,
  },
  timeframeText: {
    fontSize: 14,
    color: colors.textWhite,
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
