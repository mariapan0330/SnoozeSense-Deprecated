import { View, Text, Button } from "react-native";
import React from "react";

const OnboardingStep2 = ({ navigation }) => {
  return (
    <View>
      <Text>OnboardingStep2{"\n\n"}</Text>
      <Button title="continue" onPress={() => navigation.navigate("Step3")} />
    </View>
  );
};

export default OnboardingStep2;
