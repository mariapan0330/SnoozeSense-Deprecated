import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { updateUserFields } from "../../../services/handleFirestore";
import { colors } from "../../../utils/colors";
import { text } from "../../../utils/text";
import OnboardingHeader from "./OnboardingHeader";
import ContinueButton from "./ContinueButton";
import useUserData from "../../hooks/useUserData";
import { Switch } from "react-native-gesture-handler";

// START COMPONENT
const OnboardingStep4 = ({ navigation, currentUser }) => {
  /**
   * This is onboarding for SLEEP SCHEDULE
   */
  const [goalTime, setGoalTime] = useState<string>();
  // if bedTimeSelected is false, defaults to wake time is selected
  const [bedTimeSelected, setBedTimeSelected] = useState<boolean>(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState<boolean>(false);
  const [hours, setHours] = useState<string>("09");
  const [minutes, setMinutes] = useState<string>("00");
  const [AMOrPM, setAMOrPM] = useState<string>("PM");
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUserData(currentUser.email);

  const handleSubmitSleepSchedule = async () => {
    if (goalTime !== "") {
      setLoading(true);
      try {
        navigation.navigate("Step5");
      } catch (error) {
        console.error("Error submitting sleep schedule: ", error);
        alert("Whoa, " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setAllFieldsFilled(goalTime !== "");
  }, [goalTime]);

  return (
    <>
      <View style={styles.container}>
        {/* HEADER */}
        <OnboardingHeader
          page={"4"}
          navigation={navigation}
          progressPercent={(4 / 6) * 100}
          prevPageNavigation={"Step3"}
        />
        {/* LOGIN FORM */}
        <View style={styles.loginForm}>
          <Text style={text.heroText}>{"\n"}Create Sleep Schedule</Text>
          <View style={styles.hoursRecommendation}>
            <Image source={require("../../images/clock.png")} style={styles.icon} />
            <Text style={text.subtitle}>
              {"\t"}
              {userData && userData.sleepDurationGoal} Hours
            </Text>
          </View>

          {/* BED TIME OR WAKE UP TIME SELECTOR */}
          <Text
            style={[
              text.subtitle,
              { textAlign: "left", fontWeight: "bold", paddingTop: 20 },
            ]}
          >
            1. Select One {"\n"}
          </Text>
          <View style={styles.bedOrWakeSelector}>
            {/* Bedtime Box: */}
            <Pressable
              style={[
                styles.bedOrWakeBox,
                bedTimeSelected ? styles.bedOrWakeTrue : styles.bedOrWakeFalse,
              ]}
              onPress={() => setBedTimeSelected((prev) => !prev)}
            >
              <Image source={require("../../images/night.png")} style={styles.icon} />
              <Text style={{ color: colors.textWhite }}>Bed Time At</Text>
            </Pressable>

            {/* Wake Up Box: */}
            <Pressable
              style={[
                styles.bedOrWakeBox,
                bedTimeSelected ? styles.bedOrWakeFalse : styles.bedOrWakeTrue,
              ]}
              onPress={() => setBedTimeSelected((prev) => !prev)}
            >
              <Image source={require("../../images/sun.png")} style={styles.icon} />
              <Text style={{ color: colors.textWhite }}>Wake Up At</Text>
            </Pressable>
          </View>

          {/* TOGGLE TIME */}
          <Text style={[text.subtitle, { textAlign: "left", fontWeight: "bold" }]}>
            {"\n\n"}2. Select Time {"\n"}
          </Text>
          <View style={styles.timeSelectorContainer}>
            {/* 4 columns: HOURS, colon, MINUTES, AM/PM */}

            {/* COL 1: HOURS (rows: inc, hours, dec) */}
            <View style={styles.timeCol}>
              <Pressable
                onPress={() => setHours((h) => ((parseInt(h) + 1) % 12).toString())}
              >
                <Text style={styles.arrowToggle}>^</Text>
              </Pressable>
              <Text style={styles.timeDisplay}>{hours}</Text>
              <Pressable
                onPress={() => setHours((h) => ((parseInt(h) - 1) % 12).toString())}
              >
                <Text style={styles.arrowToggle}>v</Text>
              </Pressable>
            </View>

            {/* COL 2: colon :) */}
            <Text
              style={[
                styles.timeCol,
                { justifyContent: "center", alignContent: "center" },
              ]}
            >
              :
            </Text>

            {/* COL 3: MINUTES (rows: inc, minutes, dec) */}
            <View style={styles.timeCol}>
              <Pressable
                onPress={() => setMinutes((m) => ((parseInt(m) + 1) % 60).toString())}
              >
                <Text style={styles.arrowToggle}>^</Text>
              </Pressable>
              <Text style={styles.timeDisplay}>{minutes}</Text>
              <Pressable
                onPress={() => setMinutes((m) => ((parseInt(m) - 1) % 60).toString())}
              >
                <Text style={styles.arrowToggle}>v</Text>
              </Pressable>
            </View>
            <Text> </Text>

            {/* COL 4: AM/PM (rows: toggle, AM/PM, toggle) */}
            <View style={styles.timeCol}>
              <Pressable onPress={() => setAMOrPM((a) => (a === "AM" ? "PM" : "AM"))}>
                <Text style={styles.arrowToggle}>^</Text>
              </Pressable>
              <Text style={styles.timeDisplay}>{AMOrPM}</Text>
              <Pressable onPress={() => setAMOrPM((a) => (a === "AM" ? "PM" : "AM"))}>
                <Text style={styles.arrowToggle}>v</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* CONTINUE BUTTON OR LOADING INDICATOR */}
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={styles.buttonContainer}>
              <ContinueButton
                activeCondition={allFieldsFilled}
                onPressFn={handleSubmitSleepSchedule}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  arrowToggle: {
    fontSize: 20,
    padding: 10,
  },
  backToLogin: {
    alignSelf: "center",
    color: colors.textWhite,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  bedOrWakeBox: {
    display: "flex",
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  bedOrWakeTrue: {
    backgroundColor: colors.secondaryButton,
    borderWidth: 5,
    borderColor: colors.themeCTAColor,
  },
  bedOrWakeFalse: {
    backgroundColor: colors.themeAccent1,
    borderWidth: 0,
    borderColor: "transparent",
  },
  bedOrWakeSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    padding: 40,
  },
  button: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  heroText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 20,
    color: colors.textWhite,
  },
  hoursRecommendation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 30,
    width: 30,
    backgroundColor: "magenta",
  },
  input: {
    color: colors.textWhite,
    alignSelf: "center",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    marginVertical: 4,
    height: 40,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 50,
    marginHorizontal: 10,
    backgroundColor: colors.themeAccent4,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  inputLabelContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "60%",
    alignSelf: "center",
  },
  inputLabel: {
    color: colors.textWhite,
  },
  loginButton: {
    backgroundColor: colors.mainButton,
  },
  loginForm: {
    paddingHorizontal: 40,
  },
  tapToEditContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  timeDisplay: {
    fontSize: 20,
    fontWeight: "bold",
  },
  timeSelectorContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.themeWhite,
    borderRadius: 20,
    padding: 20,
  },
});

export default OnboardingStep4;
