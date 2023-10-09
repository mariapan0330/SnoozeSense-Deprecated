import { useState, useEffect } from "react";
import { FIREBASE_DB } from "../../services/FirebaseConfig";
import {
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

const useUserData = (email) => {
  const [userData, setUserData] = useState({});
  const [userTasks, setUserTasks] = useState({});

  const db = FIREBASE_DB;

  useEffect(() => {
    const fetchFieldData = async () => {
      try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("USER DATA:", docSnap.data());
          setUserData(docSnap.data());
        } else {
          console.log("No such document!!");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTaskData = async () => {
      try {
        const tasksRef = collection(db, "users", email, "tasks");
        const q = query(tasksRef);
        const querySnapshot = await getDocs(q);
        const tasks = [];
        querySnapshot.forEach((doc) => {
          const taskData = doc.data();
          tasks.push({
            id: doc.id,
            ...taskData,
          });
        });
        setUserTasks(tasks);
        console.log(tasks);
      } catch (error) {
        console.error("Error getting tasks: ", error);
      }
    };

    if (email) {
      fetchFieldData();
      fetchTaskData();
      // console.log("USER DATA FROM HOOK", userData);

      const unsubscribe = onSnapshot(doc(db, "users", email), (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.data());
        } else {
          console.log("no snapshot doc available.");
        }
      });
      const unsubscribeTasks = onSnapshot(
        collection(db, "users", email, "tasks"),
        (snapshot) => {
          const tasks = [];
          snapshot.forEach((doc) => {
            const taskData = doc.data();
            tasks.push({
              id: doc.id,
              ...taskData,
            });
          });
          setUserTasks(tasks);
        }
      );
      return () => {
        unsubscribe();
        unsubscribeTasks();
      };
    } else {
      console.log("User with userID [", email, "] does not exist!!");
    }
  }, [db]);

  return { userData, tasks: userTasks };
};

export default useUserData;
