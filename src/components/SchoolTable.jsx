import { Delete, Edit } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { deleteSchool } from "../utils/SchoolActions";
import { useSchool } from "../context/SchoolContext";

export const SchoolTable = ({
  filteredSchool,
  setIsEdit,
  setInitialSchoolData,
  setShowSchoolModal,
}) => {
  const { schoolDispatch, schoolState } = useSchool();
  return (
    <div className="md:px-[15px]">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#cbd5e1" }}>
            <TableRow>
              <Tooltip title="Sort By Name">
                <TableCell
                  className="cursor-pointer"
                  sx={{ fontWeight: "bold" }}
                  id="name"
                  onClick={() => {
                    schoolDispatch({ type: "NAME_SORT", payload: "name" });
                    document.querySelector("#name").innerText = schoolState
                      .filters.nameSort
                      ? "School Name ↓"
                      : "School Name ↑";
                  }}
                >
                  School Name
                </TableCell>
              </Tooltip>
              <Tooltip title="Sort By Board">
                <TableCell
                  className="cursor-pointer"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  id="board"
                  onClick={() => {
                    schoolDispatch({ type: "BOARD_SORT", payload: "board" });
                    document.querySelector("#board").innerText = schoolState
                      .filters.boardSort
                      ? "Board ↓"
                      : "Board ↑";
                  }}
                >
                  <strong>Board</strong>
                </TableCell>
              </Tooltip>
              <Tooltip title="Sort By Medium">
                <TableCell
                  className="cursor-pointer"
                  align="left"
                  sx={{ fontWeight: "bold" }}
                  id="medium"
                  onClick={() => {
                    schoolDispatch({ type: "MEDIUM_SORT", payload: "medium" });
                    document.querySelector("#medium").innerText = schoolState
                      .filters.mediumSort
                      ? "Medium ↓"
                      : "Medium ↑";
                  }}
                >
                  <strong>Medium</strong>
                </TableCell>
              </Tooltip>
              <TableCell align="left">
                <strong>Class</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSchool?.map((school) => (
              <TableRow
                key={school.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {school.name}
                </TableCell>
                <TableCell align="left">{school.board}</TableCell>
                <TableCell align="left">{school.medium}</TableCell>
                <TableCell align="left">{school.class}</TableCell>
                <TableCell align="left">
                  <span
                    onClick={() => {
                      setIsEdit(true);
                      setInitialSchoolData(school);
                      setShowSchoolModal(true);
                    }}
                  >
                    <Tooltip title="Edit">
                      <Edit
                        sx={{
                          color: "gray",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </span>
                  <span onClick={() => deleteSchool(school?.id)}>
                    <Tooltip title="Delete">
                      <Delete
                        sx={{
                          marginLeft: "20px",
                          color: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
