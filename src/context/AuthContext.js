import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", uid: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const signUpUser = async (email, password) => {
    try {
      setIsAuthLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setIsAuthLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/login");
      setIsLoggedIn(false);
      setUser({ email: "", uid: "" });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      const email = loggedInUser?.email;
      const uid = loggedInUser?.uid;
      email && uid && setUser({ email, uid });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user.email) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const value = {
    isLoggedIn,
    signUpUser,
    loginUser,
    logoutUser,
    user,
    isAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
