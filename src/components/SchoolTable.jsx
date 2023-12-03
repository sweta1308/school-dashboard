import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useSchool } from "../context/SchoolContext";
import { SchoolTableBody } from "./SchoolTableBody";

export const SchoolTable = ({ filteredSchool }) => {
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
          <SchoolTableBody data={filteredSchool} />
        </Table>
      </TableContainer>
    </div>
  );
};
