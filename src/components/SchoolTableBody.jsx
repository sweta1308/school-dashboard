import { TableBody, TableCell, TableRow, Tooltip } from "@mui/material";
import { useSchool } from "../context/SchoolContext";
import { deleteSchool, updateSchool } from "../utils/SchoolActions";
import { Delete, Edit } from "@mui/icons-material";

export const SchoolTableBody = ({ data }) => {
  const {
    schoolState,
    schoolDispatch,
    initialSchoolData,
    setInitialSchoolData,
  } = useSchool();
  return (
    <>
      <TableBody>
        {data?.map((school) => (
          <TableRow
            key={school.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {schoolState.editId === school.id ? (
                <input
                  className="border border-gray-400 outline-none p-[4px] rounded"
                  value={initialSchoolData.name}
                  onChange={(e) =>
                    setInitialSchoolData({
                      ...initialSchoolData,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                school.name
              )}
            </TableCell>
            <TableCell align="left">
              {schoolState.editId === school.id ? (
                <input
                  className="border border-gray-400 outline-none p-[4px] rounded"
                  value={initialSchoolData.board}
                  onChange={(e) =>
                    setInitialSchoolData({
                      ...initialSchoolData,
                      board: e.target.value,
                    })
                  }
                />
              ) : (
                school.board
              )}
            </TableCell>
            <TableCell align="left">
              {schoolState.editId === school.id ? (
                <input
                  className="border border-gray-400 outline-none p-[4px] rounded"
                  value={initialSchoolData.medium}
                  onChange={(e) =>
                    setInitialSchoolData({
                      ...initialSchoolData,
                      medium: e.target.value,
                    })
                  }
                />
              ) : (
                school.medium
              )}
            </TableCell>
            <TableCell align="left">
              {schoolState.editId === school.id ? (
                <input
                  className="border border-gray-400 outline-none p-[4px] rounded"
                  value={initialSchoolData.class}
                  onChange={(e) =>
                    setInitialSchoolData({
                      ...initialSchoolData,
                      class: e.target.value,
                    })
                  }
                />
              ) : (
                school.class
              )}
            </TableCell>
            <TableCell align="left">
              {schoolState.editId === school.id ? (
                <button
                  className="bg-primary-color text-white p-[5px] rounded hover:bg-primary-dark"
                  onClick={() => {
                    updateSchool(initialSchoolData, school.id);
                    schoolDispatch({
                      type: "SET_EDIT_ID",
                      payload: null,
                    });
                  }}
                >
                  Save
                </button>
              ) : (
                <div>
                  <span
                    onClick={() => {
                      schoolDispatch({
                        type: "SET_EDIT_ID",
                        payload: school.id,
                      });
                      setInitialSchoolData(school);
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
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
