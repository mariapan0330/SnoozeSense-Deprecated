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

export const updateUserFields = (email, objToUpdate) => {
  /* 
    Calls a validation before attempting.  
    Attempts to MERGE the given object to the existing user data
    (NOT overwrite all of the user's data with given object)
  */
  const validationError = validateObjToUpdate(objToUpdate, userFieldsReference);
  if (validationError) {
    console.error(validationError);
  } else {
    try {
      const ref = doc(db, "users", email);
      setDoc(ref, objToUpdate, { merge: true });
      console.log("Successfully updated db");
    } catch (error) {
      console.error(error);
    }
  }
};

export const addTask = async (email, taskToAdd) => {
  /* 
    Calls a validation before attempting.  
    Attempts to APPEND a new task to the existing task list. 
  */
  const validationError = validateTaskToAdd(taskToAdd);
  if (validationError) {
    console.error(validationError);
  } else {
    const userDocRef = doc(db, "users", email, "tasks", taskToAdd.taskTitle);
    // gets the current user data to generate a taskID that is its task index
    const userDocSnapshot = await getDoc(userDocRef);

    try {
      await setDoc(userDocRef, taskToAdd, { merge: false });
      console.log("Task added successfully!");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }
};

export const updateTask = (email, taskTitle, taskObjToUpdate) => {
  /* 
    Calls a validation before attempting.  
    Attempts to MERGE the given object to the existing tasks
    (NOT overwrite all of the user's data with given object)
  */
  const validationError = validateObjToUpdate(taskObjToUpdate, taskReference);
  if (validationError) {
    console.error(validationError);
  } else {
    try {
      const ref = doc(db, "users", email, "tasks", taskTitle);
      updateDoc(ref, taskObjToUpdate);
      console.log("Successfully updated task");
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
  // taskID: "number",
  taskTitle: "string",
  taskStartTime: "string",
  taskDuration: "number",
  enableNotification: "boolean",
  isComplete: "boolean",
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
      // if you are trying to set a time, it should only be 4 numbers long.
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

const validateTaskToAdd = (taskToAdd) => {
  /* 
    Validates that ALL task fields exist.
  */
  const timeRegex = /^\d{4}$/;
  for (const field of Object.keys(taskReference)) {
    if (!taskToAdd.hasOwnProperty(field)) {
      return `Task to add is missing field: ${field}.`;
    } else if (field.endsWith("Time")) {
      if (!timeRegex.test(taskToAdd[field])) {
        return `Invalid value for field ${field}. ${field} should be a string of exactly 4 numbers (military time)`;
      }
    }

    if (typeof taskToAdd[field] !== taskReference[field]) {
      return `Data type invalid for field ${field}. ${field} is a ${taskReference[field]}.`;
    }
  }
  return null;
};

// export const addChallenge = (challengeTitle, challengeDescription) => {
//   const ref = doc(db, "challenges", challengeTitle);
//   setDoc(ref, { challengeTitle, challengeDescription }, { merge: true });
// };
