import { View, Text, Button } from "react-native";
import React from "react";

const OnboardingStep4 = ({ navigation }) => {
  return (
    <View>
      <Text>OnboardingStep4{"\n\n"}</Text>
      <Button title="continue" onPress={() => navigation.navigate("Step5")} />
    </View>
  );
};

export default OnboardingStep4;
