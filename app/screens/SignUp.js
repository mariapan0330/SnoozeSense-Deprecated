import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createNewUserWithDefaultValues } from "../../services/handleFirestore";
import ProgressBar from "./ProgressBar";
import { colors } from "../../utils/colors";

const SignUp = ({ navigation, currentUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    if (retypePassword === password) {
      setLoading(true);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate("PlaceholderOnboarding");
        console.log(res);
        createNewUserWithDefaultValues(username, email);
      } catch (err) {
        console.log(err);
        alert("Sign Up failed " + err.message);
      } finally {
        // setLoading(false);
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <>
      <View style={styles.progressView}>
        <ProgressBar progress={20} />
      </View>
      <View style={styles.container}>
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
            <Pressable onPress={handleSignUp}>
              <View
                title="Sign Up"
                style={[styles.button, styles.signUpButton]}
              >
                <Text style={{ color: colors.fontWhite }}>Create Account</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <View title="Login" style={[styles.button, styles.loginButton]}>
                <Text style={{ color: colors.fontWhite }}>Back to Login</Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "60%",
  },
  button: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 30,
    borderWidth: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 40,
  },
  heroText: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.fontWhite,
  },
  input: {
    marginVertical: 4,
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    borderColor: "transparent",
    backgroundColor: colors.fontWhite,
  },

  inputLabel: {
    alignSelf: "flex-start",
    color: colors.fontWhite,
  },
  loginButton: {
    backgroundColor: colors.mainButton,
  },
  progressView: {
    backgroundColor: colors.background,
    width: "100%",
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  signUpButton: {
    backgroundColor: colors.secondaryButton,
  },
});

export default SignUp;
