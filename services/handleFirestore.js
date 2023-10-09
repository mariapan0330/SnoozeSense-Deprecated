import { FIREBASE_DB } from "./FirebaseConfig";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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
      sleepDurationGoal: 8,
      mondaySleepTime: "2100",
      tuesdaySleepTime: "2100",
      wednesdaySleepTime: "2100",
      thursdaySleepTime: "2100",
      fridaySleepTime: "2100",
      saturdaySleepTime: "2100",
      sundaySleepTime: "2100",
      tasks: {},
      sleepLogs: {},
      challenges: {},
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

export const updateTask = (email, taskIndex, taskObjToUpdate) => {
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
      const ref = doc(db, "users", email, "tasks", taskIndex);
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
  vibrationOn: "boolean",
  sleepDurationGoal: "number",
  mondaySleepTime: "string",
  tuesdaySleepTime: "string",
  wednesdaySleepTime: "string",
  thursdaySleepTime: "string",
  fridaySleepTime: "string",
  saturdaySleepTime: "string",
  sundaySleepTime: "string",
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
    } else {
      return `Key "${key}" is field does not exist.`;
    }
  }
  return null;
};

const validateTaskToAdd = (taskToAdd) => {
  /* 
    Validates that ALL task fields exist.
  */
  for (const field of Object.keys(taskReference)) {
    if (!taskToAdd.hasOwnProperty(field)) {
      return `Task to add is missing field: ${field}.`;
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
