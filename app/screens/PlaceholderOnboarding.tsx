import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";

const PlaceholderOnboarding = ({ navigation, currentUser }) => {
  return (
    <View style={styles.container}>
      <Text>Placeholder Onboarding</Text>
      <Button
        title="Skip"
        onPress={() => navigation.navigate("PlaceholderLanding")}
      />
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
