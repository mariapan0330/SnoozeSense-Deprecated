import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginOrSignUp from "./app/screens/LoginOrSignUp.js";
import Login from "./app/screens/Login";
import OnboardingStep1 from "./app/screens/onboarding/OnboardingStep1.js";
import PlaceholderOnboarding from "./app/screens/PlaceholderOnboarding.js";
import PlaceholderLanding from "./app/screens/PlaceholderLanding.js";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./services/FirebaseConfig.js";
import Home from "./app/screens/Home.js";
import Tabs from "./app/navigation/tabs.js";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();

function InsideLayout({ currentUser }) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Home" options={{ headerShown: false }}>
        {(props) => <Home {...props} {...{ currentUser: currentUser }} />}
      </InsideStack.Screen>
      <InsideStack.Screen
        name="PlaceholderOnboarding"
        options={{ headerShown: false }}
      >
        {(props) => (
          <PlaceholderOnboarding {...props} {...{ currentUser: currentUser }} />
        )}
      </InsideStack.Screen>
    </InsideStack.Navigator>
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
      <AuthenticationStack.Screen
        name="SignUp"
        component={OnboardingStep1}
        options={{ headerShown: false }}
      />
    </AuthenticationStack.Navigator>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("currentUser: ", user);
      setCurrentUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      {/* IF CURRENT USER EXISTS, TAKE THEM TO LANDING SCREEN (which uses tab navigation) */}
      {/* OTHERWISE THEY CHOOSE TO LOGIN OR SIGNUP */}
      {currentUser ? <Tabs /> : <AuthenticationLayout />}
    </NavigationContainer>
  );
}
