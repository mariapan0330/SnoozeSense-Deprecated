import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";

export const RepeatsCustomPopup = ({ popupOpen, setPopupOpen }) => {
  return (
    <Menu>
      <MenuTrigger />
      {popupOpen && (
        <>
          <MenuOptions>
            <Pressable>
              <Text>Back</Text>
            </Pressable>
            <Text>Alarm Repeats</Text>
            <Pressable>
              <Text>X</Text>
            </Pressable>
            <MenuOption onSelect={() => alert("Option 1")}>
              <Text>Option 1</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert("Option 2")}>
              <Text>Option 2</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert("Option 2")}>
              <Text>Option 2</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert("Option 2")}>
              <Text>Option 2</Text>
            </MenuOption>
          </MenuOptions>
        </>
      )}
    </Menu>
  );
};
