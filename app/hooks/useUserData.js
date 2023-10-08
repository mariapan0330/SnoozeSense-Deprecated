import { useState, useEffect } from "react";
import { FIREBASE_DB } from "../../services/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useUserData = (email) => {
  const [userData, setUserData] = useState({});

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

    if (email) {
      fetchFieldData();
      console.log("USER DATA FROM HOOK", userData);
    } else {
      console.log("User with userID [", email, "] does not exist!!");
    }
  }, [db]);

  return { userData };
};

export default useUserData;
