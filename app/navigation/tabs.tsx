import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import CalendarScreen from "../screens/Calendar";
import ChallengesScreen from "../screens/Challenges";
import AccountScreen from "../screens/Account";
import { Calendar } from "react-native-calendars";
import Challenges from "../screens/Challenges";

const Tab = createBottomTabNavigator();

const Tabs = ({ currentUser }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} {...{ currentUser: currentUser }} />}
      </Tab.Screen>
      <Tab.Screen name="Calendar">
        {(props) => (
          <CalendarScreen {...props} {...{ currentUser: currentUser }} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Challenges">
        {(props) => (
          <ChallengesScreen {...props} {...{ currentUser: currentUser }} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Account">
        {(props) => (
          <AccountScreen {...props} {...{ currentUser: currentUser }} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
