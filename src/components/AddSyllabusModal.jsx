import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useSyllabus } from "../context/SyllabusContext";

export const AddSyllabusModal = ({
  setShowSyllabusModal,
  showSyllabusModal,
}) => {
  const { initialSyllabus, setInitialSyllabus, addSyllabus } = useSyllabus();
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
    setInitialSyllabus((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addSyllabus(initialSyllabus);
    setInitialSyllabus({
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
    setShowSyllabusModal(false);
  };

  return (
    <>
      <Modal
        open={showSyllabusModal}
        onClose={() => setShowSyllabusModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={style}
          className="bg-white z-40 p-[20px] pr-[40px] rounded-lg"
        >
          <h1 className="font-bold mb-[15px]">ADD SYLLABUS</h1>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex">
              <FormControl
                fullWidth
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Board
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={initialSyllabus.board}
                  onChange={handleChange}
                  label="Board"
                  name="board"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="CBSE">CBSE</MenuItem>
                  <MenuItem value="ICSE">ICSE</MenuItem>
                  <MenuItem value="NIOS">NIOS</MenuItem>
                  <MenuItem value="IB">IB</MenuItem>
                  <MenuItem value="AISSCE">AISSCE</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Class
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={initialSyllabus.class}
                  onChange={handleChange}
                  label="Class"
                  name="class"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="I">I</MenuItem>
                  <MenuItem value="II">II</MenuItem>
                  <MenuItem value="III">III</MenuItem>
                  <MenuItem value="IV">IV</MenuItem>
                  <MenuItem value="V">V</MenuItem>
                  <MenuItem value="VI">VI</MenuItem>
                  <MenuItem value="VII">VII</MenuItem>
                  <MenuItem value="VIII">VIII</MenuItem>
                  <MenuItem value="IX">IX</MenuItem>
                  <MenuItem value="X">X</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex">
              <FormControl
                fullWidth
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Subject
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={initialSyllabus.subject}
                  onChange={handleChange}
                  label="Subject"
                  name="subject"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="Social Studies">Social Studies</MenuItem>
                  <MenuItem value="Hindi">Hindi</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Academic Year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={initialSyllabus.academicYear}
                  onChange={handleChange}
                  label="Academic Year"
                  name="academicYear"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="2021-2022">2021-2022</MenuItem>
                  <MenuItem value="2022-2023">2022-2023</MenuItem>
                  <MenuItem value="2023-2024">2023-2024</MenuItem>
                  <MenuItem value="2024-2025">2024-2025</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="ml-[5px]">
              <TextField
                fullWidth
                name="description"
                label="Description"
                variant="standard"
                type="text"
                required
                size="small"
                value={initialSyllabus.description}
                onChange={handleChange}
              />
            </div>
            <div className="ml-[5px]">
              <TextField
                fullWidth
                label="Topic"
                variant="standard"
                type="text"
                required
                size="small"
                value={initialSyllabus.topics.name}
                onChange={(e) =>
                  setInitialSyllabus({
                    ...initialSyllabus,
                    topics: { ...initialSyllabus.topics, name: e.target.value },
                  })
                }
              />
            </div>
            <div className="ml-[5px]">
              <TextField
                fullWidth
                label="Sub Topic (Separated By Comma)"
                variant="standard"
                type="text"
                required
                size="small"
                value={initialSyllabus.topics.subtopics.join(", ")}
                onChange={(e) => {
                  const subtopic = e.target.value.split(", ");
                  setInitialSyllabus({
                    ...initialSyllabus,
                    topics: { ...initialSyllabus.topics, subtopics: subtopic },
                  });
                }}
              />
            </div>
            <div className="mt-[15px]">
              <input
                className="mr-[10px] bg-primary-color text-white px-[15px] py-[5px] rounded-md border border-primary-color cursor-pointer hover:bg-primary-dark hover:border-primary-dark"
                value="Add"
                type="submit"
              />
              <button
                className="px-[15px] py-[5px] border border-primary-color rounded-md text-primary-color hover:bg-primary-color hover:text-white"
                onClick={() => {
                  setShowSyllabusModal(false);
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
