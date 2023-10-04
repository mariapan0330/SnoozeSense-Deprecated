import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginOrSignUp = () => {
  /*
    LOGIN SCREEN: allows the user to enter their username and password and login.
    Currently this is also the place where they CREATE an account with the credentials they entered.
  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (err) {
      console.log(err);
      if (err.message === "Firebase: Error (auth/invalid-login-credentials).") {
        alert(
          'Invalid Login Credentials. Click "Create Account" if you are new!'
        );
      } else {
        alert("Sign In failed!" + err);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (err) {
      console.log(err);
      alert("Sign Up failed " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login!!</Text>
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
      {isCreatingAccount && (
        <TextInput
          style={styles.input}
          placeholder="Retype Password"
          autoCapitalize="none"
          value={retypePassword}
          secureTextEntry={true}
          onChangeText={(text) => setRetypePassword(text)}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Sign Up" onPress={signUp} />
        </>
      )}
    </View>
  );
};

export default Login;

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
    backgroundColor: "lightgray",
  },
});
