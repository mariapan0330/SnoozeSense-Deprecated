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
import { FIREBASE_AUTH, FIREBASE_DB } from "./services/FirebaseConfig.js";
import Home from "./app/screens/Home.js";
import Tabs from "./app/navigation/tabs.js";
import useUserData from "./app/hooks/useUserData";
import { Text } from "react-native";
import { getFirestore,collection, doc, getDoc } from "@firebase/firestore";

const db= getFirestore();

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

function InsideLayout({ currentUser }) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} {...{ currentUser: currentUser }} />}
      </InsideStack.Screen>
    </InsideStack.Navigator>
  );
}

function OnboardingLayout({ currentUser }) {
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
        {(props) => <OnboardingStep5 {...props} {...{ currentUser: currentUser }} />}
      </OnboardingStack.Screen>
    </OnboardingStack.Navigator>
  );
}

function AuthenticationLayout({ currentUser }) {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthenticationStack.Screen name="SignUp" options={{ headerShown: false }}>
        {/* <OnboardingStack.Screen name="Step1" options={{ headerShown: false }}> */}
        {(props) => <OnboardingStep1 {...props} {...{ currentUser: currentUser }} />}
        {/* </OnboardingStack.Screen> */}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="Step2">
        {(props) => <OnboardingLayout {...props} {...{ currentUser: currentUser }} />}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
}

async function checkIfUserIsOnboarded(userId) {
  console.log("Checking if user is onboarded for userId: ", userId);
  try {
    console.log('FIREBASE_DB inside App.js:', FIREBASE_DB);

    const userDoc = await getDoc(doc(db, 'users', userId));
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
    if (currentUser && currentUser.uid) {
      checkIfUserIsOnboarded(currentUser.uid).then((isNew) => {
        setCurrentUserIsNew(isNew);
      }).catch((err) => {
        console.error("Error checking if user is onboarded: ", err);
      });
    }
  }, [currentUser]);
  

  return (
    <NavigationContainer>
      {/* IF CURRENT USER EXISTS, TAKE THEM TO LANDING SCREEN (which uses tab navigation) */}
      {/* OTHERWISE THEY CHOOSE TO LOGIN OR SIGNUP */}
      {/* is there a current user? if not, authentication layout. */}
      {/* is the current user new? If not, home tabs. If yes, onboarding stack */}
      {currentUser ? (
        currentUserIsNew ? (
          <OnboardingLayout currentUser={currentUser} />
        ) : (
          <Tabs currentUser={currentUser} />
        )
      ) : (
        <AuthenticationLayout currentUser={currentUser} />
      )}
    </NavigationContainer>
  );
}
