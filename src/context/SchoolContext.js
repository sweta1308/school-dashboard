import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { schoolReducer } from "../reducers/SchoolReducer";
import { useAuth } from "./AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const SchoolContext = createContext();

export const SchoolProvider = ({ children }) => {
  const { userState } = useAuth();
  const initialState = {
    schools: [],
    editId: null,
    filters: {
      searchTerm: "",
      sortType: "",
      nameSort: false,
      boardSort: false,
      mediumSort: false,
    },
  };
  const [initialSchoolData, setInitialSchoolData] = useState({
    name: "",
    medium: "",
    board: "",
    class: "",
  });
  const [schoolState, schoolDispatch] = useReducer(schoolReducer, initialState);

  useEffect(() => {
    if (userState.user.uid) {
      const unsubscribe = onSnapshot(collection(db, "school"), (snapshot) => {
        schoolDispatch({
          type: "SET_SCHOOLS",
          payload: snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })),
        });
      });
      return () => {
        unsubscribe();
      };
    }
  }, [userState.user]);

  const value = {
    schoolState,
    schoolDispatch,
    initialSchoolData,
    setInitialSchoolData,
  };

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  );
};

export const useSchool = () => useContext(SchoolContext);
