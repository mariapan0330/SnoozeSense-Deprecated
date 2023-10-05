import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PlaceholderOnboarding = () => {
  return (
    <View style={styles.container}>
      <Text>Placeholder Onboarding</Text>
    </View>
  );
};

export default PlaceholderOnboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
