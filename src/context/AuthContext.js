import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import { userReducer } from "../reducers/UserReducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userState, userDispatch] = useReducer(userReducer, {
    user: { email: "", uid: "" },
    isLoggedIn: false,
    isAuthLoading: false,
  });

  const signUpUser = async (email, password) => {
    try {
      userDispatch({ type: "SET_AUTH_LOADING", payload: true });
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful");
      userDispatch({ type: "SET_LOGGED_IN", payload: true });
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      userDispatch({ type: "SET_AUTH_LOADING", payload: false });
    }
  };

  const loginUser = async (email, password) => {
    try {
      userDispatch({ type: "SET_AUTH_LOADING", payload: true });
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      userDispatch({ type: "SET_LOGGED_IN", payload: true });
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      userDispatch({ type: "SET_AUTH_LOADING", payload: false });
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
      navigate("/login");
      userDispatch({ type: "SET_LOGGED_IN", payload: false });
      userDispatch({ type: "SET_USER", payload: { email: "", uid: "" } });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      const email = loggedInUser?.email;
      const uid = loggedInUser?.uid;
      email &&
        uid &&
        userDispatch({ type: "SET_USER", payload: { email, uid } });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userState.user.email) {
      userDispatch({ type: "SET_LOGGED_IN", payload: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.user]);

  const value = {
    userState,
    signUpUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
