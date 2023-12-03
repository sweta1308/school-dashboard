import { Modal, TextField } from "@mui/material";
import { useSchool } from "../context/SchoolContext";
import { addSchool } from "../utils/SchoolActions";

export const AddSchoolModal = ({ showSchoolModal, setShowSchoolModal }) => {
  const { initialSchoolData, setInitialSchoolData } = useSchool();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialSchoolData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addSchool(initialSchoolData);
    setInitialSchoolData({ name: "", board: "", medium: "", class: "" });
    setShowSchoolModal(false);
  };

  return (
    <>
      <Modal
        open={showSchoolModal}
        onClose={() => setShowSchoolModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="bg-white z-40 p-[20px] rounded-lg">
          <h1 className="font-bold mb-[15px]">ADD SCHOOL</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <TextField
              name="name"
              label="Name"
              variant="standard"
              className="border-2 border-white"
              type="text"
              required
              size="small"
              value={initialSchoolData.name}
              onChange={handleChange}
            />

            <TextField
              name="board"
              label="Board"
              variant="standard"
              className="border-2 border-white"
              type="text"
              required
              size="small"
              value={initialSchoolData.board}
              onChange={handleChange}
            />

            <TextField
              name="medium"
              label="Medium"
              variant="standard"
              className="border-2 border-white"
              type="text"
              required
              size="small"
              value={initialSchoolData.medium}
              onChange={handleChange}
            />

            <TextField
              name="class"
              label="Class"
              variant="standard"
              className="border-2 border-white"
              type="text"
              required
              size="small"
              value={initialSchoolData.class}
              onChange={handleChange}
            />

            <div className="mt-[15px]">
              <input
                className="mr-[10px] bg-primary-color text-white px-[15px] py-[5px] rounded-md border border-primary-color cursor-pointer hover:bg-primary-dark hover:border-primary-dark"
                value="Add"
                type="submit"
              />
              <button
                className="px-[15px] py-[5px] border border-primary-color rounded-md text-primary-color hover:bg-primary-color hover:text-white"
                onClick={() => {
                  setShowSchoolModal(false);
                  setInitialSchoolData({
                    name: "",
                    board: "",
                    medium: "",
                    class: "",
                  });
                }}
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
