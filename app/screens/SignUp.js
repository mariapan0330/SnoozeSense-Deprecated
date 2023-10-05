import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
  Button,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigation }) => {
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
      } catch (err) {
        console.log(err);
        alert("Sign Up failed " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Passwords do not match!");
    }
  };
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Retype Password"
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
            <View title="Sign Up" style={[styles.button, styles.signUpButton]}>
              <Text style={{ color: "white" }}>Create Account</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <View title="Login" style={[styles.button, styles.loginButton]}>
              <Text>Go to Login</Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginVertical: 4,
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
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
  loginButton: {
    backgroundColor: "white",
  },
  signUpButton: {
    backgroundColor: "black",
  },
});

export default SignUp;
