import React, { useState } from "react";
import { View, Text, Button, Pressable } from "react-native";
import {
  Menu,
  MenuProvider,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { RepeatsCustomPopup } from "./RepeatsCustomPopup";

export const RepeatsPopup = ({ popupOpen, setPopupOpen }) => {
  const [customPopupOpen, setCustomPopupOpen] = useState<boolean>();
  return (
    <MenuProvider>
      <MenuTrigger />
      <Menu>
        {popupOpen && (
          <>
            <MenuOptions>
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
                <RepeatsCustomPopup
                  popupOpen={customPopupOpen}
                  setPopupOpen={setPopupOpen}
                />
              </MenuOption>
            </MenuOptions>
          </>
        )}
      </Menu>
    </MenuProvider>
  );
};
