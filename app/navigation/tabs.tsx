import { View, Text, Image } from "react-native";
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {backgroundColor: '#121524'},
        tabBarIconStyle:{color: '#C6C6C6'},
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = require('../images/home.png');
          } else if (route.name === 'Calendar') {
            iconName = require('../images/calendar.png');
          } else if (route.name === 'Challenges') {
            iconName = require('../images/challenges.png');
          } else if (route.name === 'Account') {
            iconName = require('../images/account.png');
          }
          const tintColor = focused ? '#9174D0': '#C6C6C6'
          return <Image source={iconName} style={{ width: 24, height: 24, tintColor: tintColor }} />;
        },
      })}
    >
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
