import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const useAuth = () => {
  console.log("testing");
  const [user, setUser] = React.useState();

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user);
        } else {
          // User is signed out
          setUser(undefined);
        }
      },
      []
    );
    return unsubscribeFromAuthStateChanged;
  }, []);
  return {
    user,
  };
};
