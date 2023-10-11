/*
  OVERVIEW:
  This file contains most things that have to do with reading and writing to the Firestore database.
  Available functions and their parameters and descriptsions are as follows:

  createNewUserWithDefaultValues = (username, email)
      - Creates a new user in db with userID of the provided email address 
      - Adds all fields with default values

  updateUserFields = (email, objToUpdate)
      - Validates and merges the object you provide with the data of user with the provided email
      - Can include 1 to all fields

  addTask = (email, taskToAdd)
      - Validates and adds a NEW task to the task list of the user with the provided email
      - Task object you provide must include ALL task fields
      - DOES NOT create duplicates for two tasks with the same title. 
         -> If there's already a task with the given title, it updates that task with the new values and does not add a new one (TODO: change this?)
  
  updateTask = (email, taskTitle, taskObjToUpdate)
      - Validates and merges the provided task object with the task data of the provided title (belonging to user with the provided email)
      - Can include 1 to all fields
*/

import { FIREBASE_DB } from "./FirebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const db = FIREBASE_DB;

/***********************************
 *    USEABLE FUNCTIONS            *
 ***********************************/
export const createNewUserWithDefaultValues = async (username, email) => {
  /* 
    Creates a new user with a userID of their email address. Fills in default values. 
  */
  try {
    await setDoc(doc(db, "users", email), {
      username: username,
      email: email,
      birthday: "01.01.1990",
      enableNotifications: true,
      sleepStreak: 0,
      sleepReminderOffset: 20,
      soundChoice: "",
      soundOn: true,
      vibrationOn: true,
      userIsNew: true,
      sleepDurationGoal: 8,
      sundaySleepTime: "10 00 PM",
      mondaySleepTime: "10 00 PM",
      tuesdaySleepTime: "10 00 PM",
      wednesdaySleepTime: "10 00 PM",
      thursdaySleepTime: "10 00 PM",
      fridaySleepTime: "10 00 PM",
      saturdaySleepTime: "10 00 PM",
    });
  } catch (error) {
    console.error("Error Creating New User: ", error);
  }
};

export const updateUserFields = (email, fieldsToUpdate) => {
  /* 
    Calls a validation before attempting.  
    Attempts to MERGE the given object to the existing user data
    (NOT overwrite all of the user's data with given object)
  */
  const validationError = validateObjToUpdate(fieldsToUpdate, userFieldsReference);
  if (validationError) {
    console.error(validationError);
  } else {
    try {
      const ref = doc(db, "users", email);
      setDoc(ref, fieldsToUpdate, { merge: true });
      console.log("Successfully updated db");
    } catch (error) {
      console.error(error);
    }
  }
};

export const addTask = async (email, taskToAdd) => {
  // Attempts to APPEND a new task to the existing task list.
  addToSubcollection(email, taskToAdd, "task");
};

export const addChallenge = async (email, challengeToAdd) => {
  // Attempts to APPEND a new Challenge to the existing Challenge list.
  addToSubcollection(email, challengeToAdd, "challenge");
};

const addToSubcollection = async (email, objToAdd, subcollection) => {
  /*
      Handles all adding to subcollection one step in from user profile
      Validates with appropriate lists beforehand
  */
  const validationError = validateObjToAdd(objToAdd, subcollection);
  if (validationError) {
    console.error(validationError);
  } else {
    const userDocRef = doc(
      db,
      "users",
      email,
      `${subcollection}s`, // enters the provided subcollection
      objToAdd[`${subcollection}Title`]
    );
    // gets the current user data to generate a ChallengeID that is its Challenge index
    // const userDocSnapshot = await getDoc(userDocRef);

    try {
      await setDoc(userDocRef, objToAdd, { merge: false });
      console.log(`${subcollection} added successfully!`);
    } catch (error) {
      console.error(`Error adding ${subcollection}: `, error);
    }
  }
};

export const updateTask = (email, taskTitle, taskFieldsToUpdate) => {
  // Attempts to MERGE the given object to the existing tasks
  updateSubCollection(email, taskTitle, taskFieldsToUpdate, taskReference, "task");
};

export const updateChallenge = (email, challengeTitle, challengeFieldsToUpdate) => {
  // Attempts to MERGE the given object to the existing challenges
  updateSubCollection(
    email,
    challengeTitle,
    challengeFieldsToUpdate,
    challengeReference,
    "challenge"
  );
};

const updateSubCollection = (email, objTitle, objToUpdate, reference, subcollection) => {
  /* 
    Calls a validation before attempting.  
    Attempts to MERGE the given object to the existing subcollection
    (NOT overwrite all of the user's data with given object)
  */
  const validationError = validateObjToUpdate(objToUpdate, reference);
  if (validationError) {
    console.error(validationError);
  } else {
    try {
      const ref = doc(db, "users", email, `${subcollection}s`, objTitle);
      updateDoc(ref, objToUpdate);
      console.log(`Successfully updated ${subcollection}`);
    } catch (error) {
      console.error(error);
    }
  }
};

/***********************************
 *           VALIDATIONS            *
 ***********************************/

const userFieldsReference = {
  username: "string",
  email: "string",
  birthday: "string",
  enableNotifications: "boolean",
  sleepStreak: "number",
  sleepReminderOffset: "number",
  soundChoice: "string",
  soundOn: "boolean",
  userIsNew: "boolean",
  vibrationOn: "boolean",
  sleepDurationGoal: "number",
  sundaySleepTime: "string",
  mondaySleepTime: "string",
  tuesdaySleepTime: "string",
  wednesdaySleepTime: "string",
  thursdaySleepTime: "string",
  fridaySleepTime: "string",
  saturdaySleepTime: "string",
};

const taskReference = {
  taskTitle: "string",
  taskStartTime: "string",
  taskDuration: "number",
  enableNotification: "boolean",
  isComplete: "boolean",
};

const challengeReference = {
  challengeTitle: "string",
  challengeStartDate: "string", // can be empty string
  isComplete: "boolean",
  isCurrent: "boolean",
  isSaved: "boolean",
};

const validateObjToUpdate = (objToUpdate, fieldsReference) => {
  /* 
    Validates that the field exists on the user object and is the correct data type.
  */

  for (const key in objToUpdate) {
    // check if key is in the available data
    if (key in fieldsReference) {
      // check if the data type is the same
      if (typeof objToUpdate[key] !== fieldsReference[key]) {
        return `Invalid data type for key "${key}". "${key}" is a ${fieldsReference[key]}.`;
      }
      // if you are trying to set a time, it should be formatted HH MM AA where HH is 1 or 2 numbers and AA is AM or PM
      if (key.endsWith("Time")) {
        const timeRegex = /^\d{1,2} \d{2} [apAP][mM]$/;
        if (!timeRegex.test(objToUpdate[key])) {
          return `Invalid value for key ${key}. ${key} should be a string of "HH MM AA" where HH is 1 or 2 numbers and AA is AM or PM`;
        }
      }
    } else {
      return `"${key}" field does not exist.`;
    }
  }
  return null;
};

const validateObjToAdd = (objToAdd, subcollection) => {
  /* 
    Validates that ALL task fields exist.
  */
  let reference;
  if (subcollection === "task") {
    reference = taskReference;
  } else if (subcollection === "challenge") {
    reference = challengeReference;
  }
  const timeRegex = /^\d{4}$/;
  for (const field of Object.keys(reference)) {
    if (!objToAdd.hasOwnProperty(field)) {
      return `${subcollection} to add is missing field: ${field}.`;
    } else if (field.endsWith("Time")) {
      // extra validation for time objects
      if (!timeRegex.test(objToAdd[field])) {
        return `Invalid value for field ${field}. ${field} should be a string of exactly 4 numbers (military time)`;
      }
    }

    if (typeof objToAdd[field] !== reference[field]) {
      return `Data type invalid for field ${field}. ${field} is a ${reference[field]}.`;
    }
  }
  return null;
};
