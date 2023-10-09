import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
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

  return (
    <View style={styles.container}>
      <Text>Login</Text>
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

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handleLogin()}>
            <View style={[styles.button, styles.loginButton]}>
              <Text>Login</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <View style={[styles.button, styles.signUpButton]}>
              <Text style={{ color: "white" }}>Go to Create Account</Text>
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

export default Login;
