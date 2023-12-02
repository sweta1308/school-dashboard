import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useSyllabus } from "../context/SyllabusContext";
import { SyllabusTable } from "../components/SyllabusTable";
import { AddSyllabusModal } from "../components/AddSyllabusModal";

export const Syllabus = () => {
  const { syllabus } = useSyllabus();
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  return (
    <>
      {showSyllabusModal && (
        <AddSyllabusModal
          showSyllabusModal={showSyllabusModal}
          setShowSyllabusModal={setShowSyllabusModal}
        />
      )}
      <div style={{ filter: showSyllabusModal ? "blur(8px)" : "" }}>
        <Sidebar />
        <div className="relative left-[15%] w-[80%] pt-[40px] pl-[40px] rounded-xl md:left-0 md:w-full md:pl-0 md:px-[10px]">
          <h1 className="font-bold text-[30px] md:text-center text-primary-color underline">
            Syllabus
          </h1>
          <button
            onClick={() => setShowSyllabusModal(true)}
            className="my-[20px] bg-primary-color text-white px-[25px] py-[8px] cursor-pointer rounded md:mx-[30px] hover:bg-primary-dark"
          >
            Add
          </button>
          <SyllabusTable syllabus={syllabus} />
        </div>
      </div>
    </>
  );
};
