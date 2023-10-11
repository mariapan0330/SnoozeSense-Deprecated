import { View, Text, Button } from "react-native";
import React from "react";
import { updateUserFields } from "../../../services/handleFirestore";

const OnboardingStep5 = ({ currentUser }) => {
  const handleNavigateHome = () => {
    updateUserFields(currentUser.email, { userIsNew: false });
  };
  return (
    <View>
      <Text>OnboardingStep5{"\n\n"}</Text>
      <Button title="continue" onPress={handleNavigateHome} />
    </View>
  );
};

export default OnboardingStep5;
