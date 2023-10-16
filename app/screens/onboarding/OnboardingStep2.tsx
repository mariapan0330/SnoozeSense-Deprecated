import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { updateUserFields } from "../../../services/handleFirestore";
import { colors } from "../../../utils/colors";
import { text } from "../../../utils/text";
import OnboardingHeader from "./OnboardingHeader";
import ContinueButton from "./ContinueButton";
import { commonStyles } from "../../../utils/commonStyles";

const OnboardingStep2 = ({ navigation, currentUser }) => {
  /**
   * This is onboarding for BIRTHDAY
   */
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmitBirthday = async () => {
    if (birthMonth + birthYear !== "") {
      setLoading(true);
      try {
        // try to submit their birthday.
        // check that the month is between 0 and 12 (incl).
        if (parseInt(birthMonth) > 0 && parseInt(birthMonth) <= 12) {
          // check that the year is less than or equal to the current year and is 4 numbers long
          if (parseInt(birthYear) <= currentYear && /^\d{4}$/.test(birthYear)) {
            updateUserFields(currentUser.email, {
              birthday: `${
                // submit the birthday, and birthmonths
                parseInt(birthMonth) > 9 ? birthMonth : `0${birthMonth}`
              } ${birthYear}`,
            });
            // then navigate to step 3 with the necessary components
            navigation.navigate("Step3");
          } else throw { message: `${birthYear} is not a valid year.` };
        } else throw { message: `${birthMonth} is not a valid month.` };
      } catch (error) {
        console.warn("Error submitting birthday: ", error);
        alert("Yikes, we couldn't submit your birthday. " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setAllFieldsFilled(birthMonth !== "" && birthYear !== "");
  }, [birthMonth, birthYear]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      keyboardVerticalOffset={-50}
      style={{ flex: 1 }}
    >
      <View style={commonStyles.onboardingContainer}>
        {/* HEADER */}
        <OnboardingHeader
          page={"2"}
          navigation={navigation}
          progressPercent={(2 / 6) * 100}
          prevPageNavigation={"Step1"}
        />
        {/* BIRTHDAY FORM */}
        <View style={styles.formContainer}>
          <Text style={text.heroText}>{"\n"}Add Your Birthday</Text>
          <Text style={[text.subtitle]}>
            We use your age to estimate the amount of hours of sleep you need.{"\n"}
          </Text>

          {/* INPUT LABELS */}
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>{"\n"}Month</Text>
            <Text style={styles.inputLabel}>{"\n"}Year</Text>
          </View>
          {/* PILL SHAPED INPUT FORM FOR MONTH AND YEAR */}
          <View style={styles.pillShape}>
            <TextInput
              style={styles.input}
              placeholder="MM"
              autoCapitalize="none"
              value={birthMonth}
              keyboardType="numeric"
              onChangeText={(text) => {
                if (text.length <= 2 && (parseInt(text) <= 12 || text == "")) {
                  setBirthMonth(text);
                }
              }}
            />
            <Text style={{ color: colors.textWhite, fontSize: 14, fontWeight: "800" }}>
              /
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="YYYY"
              autoCapitalize="none"
              value={birthYear}
              onChangeText={(text) => {
                if (text.length <= 4) {
                  setBirthYear(text);
                }
              }}
            />
          </View>
        </View>
        <View style={commonStyles.onboardingContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={styles.buttonContainer}>
              <ContinueButton
                activeCondition={allFieldsFilled}
                onPressFn={handleSubmitBirthday}
              />
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 40,
  },
  input: {
    color: colors.textWhite,
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
  formContainer: {
    padding: 40,
  },
  pillShape: {
    alignSelf: "center",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-around",
    marginVertical: 4,
    width: "60%",
    height: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: colors.themeAccent4,
  },
});

export default OnboardingStep2;
