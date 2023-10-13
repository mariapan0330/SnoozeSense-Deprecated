import { View, Text, Button } from "react-native";
import React from "react";
import { updateUserFields } from "../../../services/handleFirestore";

const OnboardingStep5 = ({ currentUser, setCurrentUserIsNew }) => {
  const handleNavigateHome = () => {
    updateUserFields(currentUser.email, { userIsNew: false })
      .then(() => {
        console.log("Successfully updated DB");
        setCurrentUserIsNew(false);  // Update the state
      })
      .catch((error) => {
        console.error("Error updating user onboarding status:", error);
      });
  };
  return (
    <View>
      <Text>OnboardingStep5{"\n\n"}</Text>
      <Button title="continue" onPress={handleNavigateHome} />
    </View>
  );
};

export default OnboardingStep5;
