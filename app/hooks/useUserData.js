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
  const [userChallenges, setUserChallenges] = useState({});

  const db = FIREBASE_DB;

  useEffect(() => {
    /************ FETCH DATA ********************
     * initial fetch on component mount
     */
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

    const fetchTaskAndChallengeData = async (subcollection) => {
      try {
        const docRef = collection(db, "users", email, subcollection);
        const q = query(docRef);
        const querySnapshot = await getDocs(q);
        const result = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          result.push({
            id: doc.id,
            ...data,
          });
        });
        // subcollection === "challenges" && console.log(result);
        return result;
      } catch (error) {
        console.error(`Error getting ${subcollection}:`, error);
      }
    };

    if (email) {
      /**
       * Call initial fetches
       */
      fetchFieldData();
      setUserTasks(fetchTaskAndChallengeData("tasks"));
      setUserChallenges(fetchTaskAndChallengeData("challenges"));
      // console.log("USER DATA FROM HOOK", userData);

      /************ SUBSCRIPTION ********************
       * Subscription setup monitors real-time updates to data changes in Firestore
       */
      const unsubscribeFunctions = [];

      const unsubscribe = onSnapshot(doc(db, "users", email), (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.data());
        } else {
          console.log("no snapshot doc available.");
        }
      });
      unsubscribeFunctions.push(unsubscribe);

      const unsubscribeSubcollections = [
        { collectionName: "tasks", setFn: setUserTasks },
        { collectionName: "challenges", setFn: setUserChallenges },
      ];

      unsubscribeSubcollections.forEach((collectionData) => {
        const { collectionName, setFn } = collectionData;
        const unsubscribeCollection = onSnapshot(
          collection(db, "users", email, collectionName),
          (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => {
              const itemData = doc.data();
              items.push({
                id: doc.id,
                ...itemData,
              });
            });
            setFn(items);
          }
        );
        unsubscribeFunctions.push(unsubscribeCollection);
      });

      return () => {
        /**
         * call subscriptions
         */
        unsubscribeFunctions.forEach((fn) => {
          fn();
        });
      };
    } else {
      console.log("User with userID [", email, "] does not exist!!");
    }
  }, [db]);

  return { userData, tasks: userTasks, challenges: userChallenges };
};

export default useUserData;
