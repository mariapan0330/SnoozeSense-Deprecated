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
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUserData(currentUser.email);

  const handleSubmitSleepSchedule = async () => {
    if (goalTime !== "") {
      setLoading(true);
      try {
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
          <Text style={[text.subtitle, { textAlign: "left", fontWeight: "bold" }]}>
            1. Select One {"\n"}
          </Text>
          <View style={styles.bedOrWakeSelector}>
            <Pressable
              style={[
                styles.bedOrWakeBox,
                bedTimeSelected ? styles.bedOrWakeTrue : styles.bedOrWakeFalse,
              ]}
              onPress={() => setBedTimeSelected((prev) => !prev)}
            >
              <Image source={require("../../images/night.png")} style={styles.icon} />
              <Text style={{ color: colors.textWhite }}>Bedtime</Text>
            </Pressable>
            <Pressable
              style={[
                styles.bedOrWakeBox,
                bedTimeSelected ? styles.bedOrWakeFalse : styles.bedOrWakeTrue,
              ]}
              onPress={() => setBedTimeSelected((prev) => !prev)}
            >
              <Image source={require("../../images/sun.png")} style={styles.icon} />
              <Text style={{ color: colors.textWhite }}>Wake Up</Text>
            </Pressable>
          </View>

          {/* TOGGLE TIME */}
          <Text style={[text.subtitle, { textAlign: "left", fontWeight: "bold" }]}>
            {"\n\n"}2. Select Time {"\n"}
          </Text>
          <View style={styles.timeSelectorContainer}></View>
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
    padding: 40,
  },
  tapToEditContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timeSelectorContainer: {
    backgroundColor: colors.themeWhite,
    height: 10,
    borderRadius: 20,
  },
});

export default OnboardingStep4;
