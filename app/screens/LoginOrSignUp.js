import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

const LoginOrSignUp = ({ navigation }) => {
  /*
    LOGIN SCREEN: allows the user to enter their username and password and login.
    Currently this is also the place where they CREATE an account with the credentials they entered.
  */

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <View title="Login" style={[styles.button, styles.loginButton]}>
            <Text style={{ color: "black" }}>Login</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <View title="Sign Up" style={[styles.button, styles.signUpButton]}>
            <Text style={{ color: "white" }}>Create Account</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginOrSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
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
