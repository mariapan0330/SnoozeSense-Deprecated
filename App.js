import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginOrSignUp from "./app/screens/LoginOrSignUp.js";
import Login from "./app/screens/Login";
import SignUp from "./app/screens/SignUp";
import PlaceholderOnboarding from "./app/screens/PlaceholderOnboarding.js";
import PlaceholderLanding from "./app/screens/PlaceholderLanding.js";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./services/FirebaseConfig.js";
import Home from "./app/screens/Home.js"

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout({ currentUser }) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="PlaceholderLanding"
        options={{ headerShown: false }}
      >
        {(props) => (
          <Home {...props} {...{ currentUser: currentUser }} />
        )}
      </InsideStack.Screen>
      <InsideStack.Screen
        name="PlaceholderOnboarding"
        component={PlaceholderOnboarding}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
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
      <Stack.Navigator>
        {/* IF CURRENT USER EXISTS, TAKE THEM TO A LANDING SCREEN */}
        {/* OTHERWISE THEY CHOOSE TO LOGIN OR SIGNUP */}
        {currentUser ? (
          <>
            <Stack.Screen name="InsideLayout" options={{ headerShown: false }}>
              {(props) => (
                <InsideLayout
                  {...props}
                  {...{
                    currentUser: currentUser,
                  }}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginOrSignUp"
              component={LoginOrSignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
