import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../../services/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createNewUserWithDefaultValues } from "../../../services/handleFirestore";
import { colors } from "../../../utils/colors";
import OnboardingHeader from "./OnboardingHeader";
import ContinueButton from "./ContinueButton";

const OnboardingStep1 = ({ navigation, currentUser }) => {
  /**
   * This is onboarding for AUTHENTICATION CREDENTIALS
   */
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    if (username + email + password + retypePassword !== "") {
      if (retypePassword === password) {
        setLoading(true);
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          navigation.navigate("Step2", {
            navigation: navigation,
            currentUser: currentUser,
          });
          console.log(res);
          createNewUserWithDefaultValues(username, email);
        } catch (err) {
          console.log(err);
          alert("Sign Up failed " + err.message);
        } finally {
          setLoading(false);
        }
      } else {
        alert("Passwords do not match!");
      }
    }
  };

  useEffect(() => {
    setAllFieldsFilled(
      username !== "" && email !== "" && password !== "" && retypePassword !== ""
    );
  }, [username, email, password, retypePassword]);

  return (
    <>
      <View style={styles.container}>
        {/* HEADER */}
        <OnboardingHeader
          page={"1"}
          navigation={navigation}
          progressPercent={(1 / 6) * 100}
          prevPageNavigation="Login"
        />
        {/* LOGIN FORM */}
        <View style={styles.loginForm}>
          <Text style={styles.heroText}>Create An Account</Text>
          <Text style={styles.inputLabel}>{"\n"}Name</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.inputLabel}>{"\n"}Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@snooze.com"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.inputLabel}>{"\n"}Password</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            autoCapitalize="none"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <Text style={styles.inputLabel}>{"\n"}Retype Password</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            autoCapitalize="none"
            value={retypePassword}
            secureTextEntry={true}
            onChangeText={(text) => setRetypePassword(text)}
          />

          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View style={styles.buttonContainer}>
              <ContinueButton
                activeCondition={allFieldsFilled}
                onPressFn={handleSignUp}
              />
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.backToLogin}>{"\n<<"} Back to Login</Text>
              </Pressable>
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
  buttonContainer: {
    width: "100%",
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
  input: {
    marginVertical: 4,
    width: "100%",
    height: 40,
    borderRadius: 20,
    padding: 10,
    borderColor: "transparent",
    backgroundColor: colors.textWhite,
  },
  inputLabel: {
    alignSelf: "flex-start",
    color: colors.textWhite,
  },
  loginButton: {
    backgroundColor: colors.mainButton,
  },
  loginForm: {
    padding: 40,
  },
});

export default OnboardingStep1;
