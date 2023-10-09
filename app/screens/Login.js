import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../services/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { colors } from "../../utils/colors";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    if (email + password !== "") {
      setLoading(true);
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        console.log(res);
      } catch (err) {
        console.log(err);
        if (
          err.message === "Firebase: Error (auth/invalid-login-credentials)."
        ) {
          alert(
            'Invalid Login Credentials. Click "Create Account" if you are new!'
          );
        } else {
          alert("Sign In failed!" + err);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.icon} />
      <Text style={styles.heroText}>Welcome to SnoozeSense</Text>
      <Text style={styles.subtitle}>Helping you reach your sleep goals</Text>
      <Text style={styles.inputLabel}>{"\n\n"}Email</Text>
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

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable onPress={() => handleLogin()}>
            <View style={[styles.button, styles.loginButton]}>
              <Text>Sign In</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <View style={styles.signUpContainer}>
              <Text style={styles.text}>
                {"\n\n"}Don't have an account?{" "}
                <Text style={{ textDecorationLine: "underline" }}>Sign Up</Text>
              </Text>
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
    paddingHorizontal: 40,
    backgroundColor: colors.background,
  },
  buttonContainer: {
    // width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    margin: 5,
    borderRadius: 30,
    borderWidth: 2,
    width: "300%",
  },
  heroText: {
    fontWeight: "bold",
    color: colors.fontWhite,
    fontSize: 20,
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 10,
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
  signUpButton: {
    backgroundColor: colors.secondaryButton,
  },
  signUpContainer: {
    flexDirection: "row",
    width: "100%",
  },
  subtitle: {
    fontSize: 16,
    color: colors.fontWhite,
  },
  text: {
    alignSelf: "center",
    color: colors.fontWhite,
  },
});

export default Login;
