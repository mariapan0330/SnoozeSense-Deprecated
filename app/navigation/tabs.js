import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home'
import CalendarScreen from '../screens/Calendar'
import ChallengesScreen from '../screens/Challenges'
import AccountScreen from '../screens/Account'

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

export default Tabs