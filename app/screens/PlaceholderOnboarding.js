import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { getUserData } from "../../services/handleFirestore";

const PlaceholderOnboarding = () => {
  return (
    <View style={styles.container}>
      <Text>Placeholder Onboarding</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PlaceholderOnboarding;
