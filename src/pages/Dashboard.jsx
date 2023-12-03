import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useSchool } from "../context/SchoolContext";
import { AddSchoolModal } from "../components/AddSchoolModal";
import { SchoolTable } from "../components/SchoolTable";
import { filterSchool } from "../utils/FilterSchool";

export const Dashboard = () => {
  const { schoolState, schoolDispatch, setInitialSchoolData } = useSchool();
  const [showSchoolModal, setShowSchoolModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const filteredSchool = filterSchool(schoolState);
  return (
    <>
      {showSchoolModal && (
        <AddSchoolModal
          showSchoolModal={showSchoolModal}
          setShowSchoolModal={setShowSchoolModal}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
      <div style={{ filter: showSchoolModal ? "blur(8px)" : "" }}>
        <Sidebar />
        <div className="relative left-[15%] w-[80%] pt-[40px] pl-[40px] rounded-xl md:pl-0 md:left-0 md:w-full md:pb-[110px]">
          <h1 className="font-bold text-[30px] md:text-center text-primary-color underline">
            Dashboard
          </h1>
          <button
            onClick={() => setShowSchoolModal(true)}
            className="my-[20px] bg-primary-color text-white px-[25px] py-[8px] cursor-pointer rounded md:mx-[30px] hover:bg-primary-dark"
          >
            Add
          </button>
          <input
            value={schoolState?.filters?.searchTerm}
            onChange={(e) =>
              schoolDispatch({ type: "SEARCH_SCHOOL", payload: e.target.value })
            }
            placeholder="Search schools..."
            className="border border-gray-500 p-[8px] text-[12px] ml-[20px] w-[300px] outline-none rounded md:mb-[20px]"
          />
          {filteredSchool.length === 0 ? (
            <h2 className="font-bold text-[20px] mt-[20px] text-center">
              No Schools Found.
            </h2>
          ) : (
            <SchoolTable
              filteredSchool={filteredSchool}
              setIsEdit={setIsEdit}
              setInitialSchoolData={setInitialSchoolData}
              setShowSchoolModal={setShowSchoolModal}
            />
          )}
        </div>
      </div>
    </>
  );
};
