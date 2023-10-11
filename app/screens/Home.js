import React, { useEffect, useState } from "react";
import {
  View,
  Switch,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
import { addTask } from "../../services/handleFirestore";
import useUserData from "../hooks/useUserData";
import { calculateTime } from "../../services/handleTime";
import PlaceholderTasks from "./PlaceholderTasks";

const getNext14Days = () => {
  const abbreviatedDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const today = new Date();
  return Array.from({ length: 14 }).map((_, index) => {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + index);
    return {
      day: abbreviatedDays[nextDate.getDay()],
      date: nextDate.getDate(), // Gets the day of the month
    };
  });
};

const Home = ({ navigation, currentUser }) => {
  const { userData } = useUserData(currentUser.email);
  const dayRef = ["sun", "mon", "tues", "wednes", "thurs", "fri", "satur"];
  const today = new Date();
  const dayOfWeek = dayRef[today.getDay()];

  const [isBedtimeEnabled, setIsBedtimeEnabled] = useState(false);
  const [bedtime, setBedtime] = useState("");

  const [isWakeUpEnabled, setIsWakeUpEnabled] = useState(false);
  const [wakeUpTime, setWakeUpTime] = useState("7:00 AM");
  const days = getNext14Days();

  useEffect(() => {
    if (userData) {
      let time = userData[`${dayOfWeek}daySleepTime`];
      // calls calculateTime which converts the time stored in db to human readable 12H format
      // also accepts argument for # hours to add to the given time
      setBedtime(calculateTime(time));
      setWakeUpTime(calculateTime(time, userData.sleepDurationGoal));
    }
  }, [userData]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <FlatList
        data={days}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dayContainer}>
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
      />
      <View style={styles.mainContainer}>
        <View style={styles.goalContainer}>
          {/* <Image source={require('./moonicon.png')} style={styles.icon} /> */}
          <Text styles={styles.goalText}>
            {userData.username}'s Sleep Goal: {userData.sleepDurationGoal} hours
          </Text>
        </View>
        <View style={styles.container}>
          <View style={[styles.switchContainer, styles.bedtimeContainer]}>
            {/* <Image source={require('./moonicon.png')} style={styles.icon} /> */}
            <Text style={styles.timeText}>{bedtime}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isBedtimeEnabled ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => setIsBedtimeEnabled((prev) => !prev)}
              value={isBedtimeEnabled}
            />
            <Text>Bedtime</Text>
          </View>
          <View style={[styles.switchContainer, styles.wakeUpContainer]}>
            {/* <Image source={require('./sunicon.png')} style={styles.icon} /> */}
            <Text style={styles.timeText}>{wakeUpTime}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#ffd700" }}
              thumbColor={isWakeUpEnabled ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => setIsWakeUpEnabled((prev) => !prev)}
              value={isWakeUpEnabled}
            />
            <Text>Wake Up</Text>
          </View>
        </View>
        <View style={styles.challengesContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Challenges</Text>
            {/* <Image source={require("./moonicon.png")} style={styles.icon} /> */}
          </View>
          <Text style={styles.message}>You currently have no challenges</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Challenges");
            }}
          >
            <Text style={styles.buttonText}>Add a Challenge</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.challengesContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Night Routine</Text>
            {/* <Image source={require('./moonicon.png')} style={styles.icon} /> */}
          </View>

          {/* TASKS COMPONENT */}
          <PlaceholderTasks currentUser={currentUser} />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => FIREBASE_AUTH.signOut()}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  challengesContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  switchContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  bedtimeContainer: {
    backgroundColor: "#f1f1f1",
  },
  wakeUpContainer: {
    backgroundColor: "#f1f1f1",
  },
  timeText: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },

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
  dayContainer: {
    padding: 10,
    marginTop: 50,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  dayText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
});

export default Home;
