import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const PlaceholderLanding = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Placeholder Landing</Text>
      <Button title="Log Out" />
    </View>
  );
};

export default PlaceholderLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
