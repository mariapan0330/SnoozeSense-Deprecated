import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home";
import CalendarScreen from "../screens/Calendar";
import ChallengesScreen from "../screens/Challenges";
import AccountScreen from "../screens/Account";
import useUserData from "../hooks/useUserData";

const Tab = createBottomTabNavigator({ currentUser });

const Tabs = ({ currentUser, setCurrentUserIsNew }) => {
  const { userData } = useUserData(currentUser.email);

  useEffect(() => {
    if (userData) {
      setCurrentUserIsNew(userData.userIsNew);
    }
  }, [userData]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} {...{ currentUser: currentUser }} />}
      </Tab.Screen>
      <Tab.Screen name="Calendar">
        {(props) => <CalendarScreen {...props} {...{ currentUser: currentUser }} />}
      </Tab.Screen>
      <Tab.Screen name="Challenges">
        {(props) => <ChallengesScreen {...props} {...{ currentUser: currentUser }} />}
      </Tab.Screen>
      <Tab.Screen name="Account">
        {(props) => <AccountScreen {...props} {...{ currentUser: currentUser }} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
