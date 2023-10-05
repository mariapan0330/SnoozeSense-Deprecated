import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginOrSignUp from "./app/screens/LoginOrSignUp.js";
import Login from "./app/screens/Login";
import SignUp from "./app/screens/SignUp";
import PlaceholderOnboarding from "./app/screens/PlaceholderOnboarding.js";
import PlaceholderLanding from "./app/screens/PlaceholderLanding.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="PlaceholderOnboarding"
          component={PlaceholderOnboarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlaceholderLanding"
          component={PlaceholderLanding}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
