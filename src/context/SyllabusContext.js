import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth } from "./AuthContext";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

const SyllabusContext = createContext();

export const SyllabusProvider = ({ children }) => {
  const { userState } = useAuth();
  const [syllabus, setSyllabus] = useState([]);
  const [initialSyllabus, setInitialSyllabus] = useState({
    board: "",
    class: "",
    subject: "",
    academicYear: "",
    description: "",
    topics: {
      name: "",
      subtopics: [],
    },
  });

  useEffect(() => {
    if (userState.user.uid) {
      const unsubscribe = onSnapshot(collection(db, "syllabus"), (snapshot) => {
        setSyllabus(
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

  const addSyllabus = async (syllabusData) => {
    try {
      await addDoc(collection(db, "syllabus"), syllabusData);
      toast.success("Syllabus created");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const value = { syllabus, initialSyllabus, setInitialSyllabus, addSyllabus };

  return (
    <SyllabusContext.Provider value={value}>
      {children}
    </SyllabusContext.Provider>
  );
};

export const useSyllabus = () => useContext(SyllabusContext);
