import { View, Text, Button } from "react-native";
import React from "react";

const OnboardingStep3 = ({ navigation }) => {
  return (
    <View>
      <Text>OnboardingStep3{"\n\n"}</Text>
      <Button title="continue" onPress={() => navigation.navigate("Step4")} />
    </View>
  );
};

export default OnboardingStep3;
