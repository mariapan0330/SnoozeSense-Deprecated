import { FIREBASE_DB } from "./FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const db = FIREBASE_DB;

export const createNewUserWithDefaultValues = async (username, email) => {
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
      tasks: [],
      sleepLogs: [],
      challenges: [],
    });
  } catch (error) {
    console.error("Error Creating New User: ", error);
  }
};

// export const updateUserData = (email, objToUpdate) => {
//   try {
//     const ref = doc(db, "users", email);
//     setDoc(ref, objToUpdate, { merge: true });
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const addChallenge = (challengeTitle, challengeDescription) => {
//   const ref = doc(db, "challenges", challengeTitle);
//   setDoc(ref, { challengeTitle, challengeDescription }, { merge: true });
// };
