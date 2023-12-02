import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const SyllabusTable = ({ syllabus }) => {
  return (
    <div className="md:px-[15px]">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#cbd5e1" }}>
            <TableRow>
              <TableCell>
                <strong>Board</strong>
              </TableCell>
              <TableCell>
                <strong>Class</strong>
              </TableCell>
              <TableCell>
                <strong>Subject</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Academic Year</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Description</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Topic</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Subtopic</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {syllabus?.map((data) => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.board}
                </TableCell>
                <TableCell align="left">{data.class}</TableCell>
                <TableCell align="left">{data.subject}</TableCell>
                <TableCell align="left">{data.academicYear}</TableCell>
                <TableCell align="left">
                  {data.description.length > 25
                    ? data.description.substring(0, 25) + "..."
                    : data.description}
                </TableCell>
                <TableCell align="left">{data.topics.name}</TableCell>
                <TableCell align="left">
                  {data.topics.subtopics.join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
