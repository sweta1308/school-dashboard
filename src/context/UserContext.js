import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  updateDoc,
  doc,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { userState } = useAuth();
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    if (userState.user.uid) {
      const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userState.user]);

  useEffect(() => {
    const currentUser = users.find(
      (userData) => userData.email === userState.user.email
    );
    setLoggedInUser(currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.user, users]);

  const addUser = async (user) => {
    try {
      await addDoc(collection(db, "users"), user);
      toast.success("User created");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateUser = async (userData) => {
    try {
      await updateDoc(doc(db, "users", loggedInUser.id), userData);
      toast.success("User updated");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const value = { addUser, updateUser, users, loggedInUser, setLoggedInUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
