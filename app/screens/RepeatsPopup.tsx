import React, { useState } from "react";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import { RepeatsCustomPopup } from "./RepeatsCustomPopup";
import { text } from "../../utils/text";
import { colors } from "../../utils/colors";

export const RepeatsPopup = ({ popupOpen, setPopupOpen }) => {
  const [customPopupOpen, setCustomPopupOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");
  return (
    <View style={styles.container}>
      {popupOpen && (
        <View style={styles.menuContainer}>
          {/* ROWS
          exit
          title
          Everyday --- checkmark
          Weekdays --- checkmark
          Weekend ---- checkmark
          Custom ----- RepeatsCustomPopup
        */}
          <Pressable onPress={() => setPopupOpen(false)}>
            <Text style={styles.exitBtn}>Exit</Text>
          </Pressable>
          <Text style={text.heroText}>Alarm Repeats</Text>
          <Pressable onPress={() => setSelected("everyday")}>
            <Text
              style={
                selected == "everyday"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse
              }
            >
              Everyday
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelected("weekday")}>
            <Text
              style={
                selected == "weekday"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse
              }
            >
              Weekday
            </Text>
          </Pressable>
          <Pressable onPress={() => setSelected("weekend")}>
            <Text
              style={
                selected == "weekend"
                  ? styles.repeatsOptionTrue
                  : styles.repeatsOptionFalse
              }
            >
              Weekend
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setCustomPopupOpen(true);
            }}
          >
            <Text style={styles.repeatsOptionFalse}>Custom {`\u3009`}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setPopupOpen(false);
            }}
          >
            <Text style={styles.doneBtn}>Done</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(240, 240, 240, 0.76)",
  },
  doneBtn: {},
  exitBtn: {},
  menuContainer: {
    width: "100%",
    height: "50%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    backgroundColor: colors.themeBackground,
  },
  repeatsOptionFalse: {
    color: colors.textWhite,
  },
  repeatsOptionTrue: {
    color: colors.textWhite,
  },
});
