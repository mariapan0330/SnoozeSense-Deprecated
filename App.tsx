import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import OnboardingStep1 from "./app/screens/onboarding/OnboardingStep1";
import OnboardingStep2 from "./app/screens/onboarding/OnboardingStep2";
import OnboardingStep3 from "./app/screens/onboarding/OnboardingStep3";
import OnboardingStep4 from "./app/screens/onboarding/OnboardingStep4";
import OnboardingStep5 from "./app/screens/onboarding/OnboardingStep5";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "./services/FirebaseConfig";
import Tabs from "./app/navigation/tabs";
import { Text } from "react-native";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import { AppNavProps } from "./types/indexTypes";

const db = getFirestore();

const AuthenticationStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

function OnboardingLayout({ currentUser, setCurrentUserIsNew }: AppNavProps) {
  return (
    <OnboardingStack.Navigator initialRouteName="Step2">
      <OnboardingStack.Screen name="Step2" options={{ headerShown: false }}>
        {(props) => <OnboardingStep2 {...props} {...{ currentUser: currentUser }} />}
      </OnboardingStack.Screen>
      <OnboardingStack.Screen name="Step3" options={{ headerShown: false }}>
        {(props) => <OnboardingStep3 {...props} {...{ currentUser: currentUser }} />}
      </OnboardingStack.Screen>
      <OnboardingStack.Screen name="Step4" options={{ headerShown: false }}>
        {(props) => <OnboardingStep4 {...props} {...{ currentUser: currentUser }} />}
      </OnboardingStack.Screen>
      <OnboardingStack.Screen name="Step5" options={{ headerShown: false }}>
        {(props) => (
          <OnboardingStep5
            {...props}
            currentUser={currentUser}
            setCurrentUserIsNew={setCurrentUserIsNew}
          />
        )}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  );
}

function AuthenticationLayout({ currentUser, setCurrentUserIsNew }: AppNavProps) {
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
        {(props) => (
          <OnboardingLayout
            {...props}
            {...{ currentUser: currentUser, setCurrentUserIsNew: setCurrentUserIsNew }}
          />
        )}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
}

async function checkIfUserIsOnboarded(userId: string) {
  console.log("Checking if user is onboarded for userId: ", userId);
  try {
    console.log("FIREBASE_DB inside App.js:", FIREBASE_DB);

    const userDoc = await getDoc(doc(db, "users", userId));
    console.log("Fetched user doc: ", userDoc);
    const userData = userDoc.data();
    console.log("User data: ", userData);
    return userData ? userData.userIsNew : null;
  } catch (error) {
    console.error("There was an error fetching user data: ", error);
    return null;
  }
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [currentUserIsNew, setCurrentUserIsNew] = useState<boolean>(true); // Initialize as null to act as a tri-state

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      checkIfUserIsOnboarded(currentUser.email)
        .then((isNew) => {
          setCurrentUserIsNew(isNew);
        })
        .catch((err) => {
          console.warn("Error checking if user is onboarded: ", err);
        });
    }
  }, [currentUser]);

  return (
    <NavigationContainer>
      {currentUser === null ? (
        <AuthenticationLayout
          currentUser={currentUser}
          setCurrentUserIsNew={setCurrentUserIsNew}
        />
      ) : currentUserIsNew === null ? (
        <Text>Loading...</Text> // You can replace this with a proper loading screen
      ) : currentUserIsNew ? (
        <OnboardingLayout
          currentUser={currentUser}
          setCurrentUserIsNew={setCurrentUserIsNew}
        />
      ) : (
        <Tabs currentUser={currentUser} />
      )}
    </NavigationContainer>
  );
}