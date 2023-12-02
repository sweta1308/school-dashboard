import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";

export const addSchool = async (schoolData) => {
  try {
    await addDoc(collection(db, "school"), schoolData);
    toast.success("School created");
  } catch (err) {
    toast.error(err.message);
  }
};

export const updateSchool = async (schoolData, schoolId) => {
  try {
    await updateDoc(doc(db, "school", schoolId), schoolData);
  } catch (err) {
    toast.error(err.message);
  }
};

export const deleteSchool = async (schoolId) => {
  try {
    schoolId && (await deleteDoc(doc(db, "school", schoolId)));
    toast.success("School deleted");
  } catch (err) {
    toast.error(err.message);
  }
};
