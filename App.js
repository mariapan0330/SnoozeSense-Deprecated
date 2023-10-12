import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import OnboardingStep1 from "./app/screens/onboarding/OnboardingStep1.js";
import OnboardingStep2 from "./app/screens/onboarding/OnboardingStep2.js";
import OnboardingStep3 from "./app/screens/onboarding/OnboardingStep3.js";
import OnboardingStep4 from "./app/screens/onboarding/OnboardingStep4.js";
import OnboardingStep5 from "./app/screens/onboarding/OnboardingStep5.js";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./services/FirebaseConfig.js";
import Home from "./app/screens/Home.js";
import Tabs from "./app/navigation/tabs.js";
import useUserData from "./app/hooks/useUserData";
import { Text } from "react-native";

const AuthenticationStack = createNativeStackNavigator();

function AuthenticationLayout({ currentUser }) {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthenticationStack.Screen name="SignUp" options={{ headerShown: false }}>
        {(props) => <OnboardingStep1 {...props} {...{ currentUser: currentUser }} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="Step2">
        {(props) => <OnboardingStep2 {...props} {...{ currentUser: currentUser }} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="Step3">
        {(props) => <OnboardingStep3 {...props} {...{ currentUser: currentUser }} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="Step4">
        {(props) => <OnboardingStep4 {...props} {...{ currentUser: currentUser }} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="Step5">
        {(props) => <OnboardingStep5 {...props} {...{ currentUser: currentUser }} />}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserIsNew, setCurrentUserIsNew] = useState(true);
  const { userData } = useUserData(currentUser && currentUser.email);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("currentUser: ", user);
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser && userData != {}) {
      setCurrentUserIsNew(userData.userIsNew);
    }
  }, [currentUser, userData]);

  return (
    <NavigationContainer>
      {/* IF CURRENT USER EXISTS, TAKE THEM TO LANDING SCREEN (which uses tab navigation) */}
      {/* OTHERWISE THEY CHOOSE TO LOGIN OR SIGNUP */}
      {/* is there a current user? if not, authentication layout. */}
      {/* is the current user new? If not, home tabs. If yes, onboarding stack */}
      {currentUserIsNew ? (
        <Tabs currentUser={currentUser} currentUserIsNew={currentUserIsNew} />
      ) : (
        <AuthenticationLayout currentUser={currentUser} />
      )}
    </NavigationContainer>
  );
}
