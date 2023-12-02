export const filterSchool = (schoolState) => {
  let filteredData = schoolState?.schools;
  filteredData = filteredData?.filter(
    (school) =>
      school.name
        .trim()
        .toLowerCase()
        .includes(schoolState?.filters?.searchTerm) ||
      school.board
        .trim()
        .toLowerCase()
        .includes(schoolState?.filters?.searchTerm) ||
      school.medium
        .trim()
        .toLowerCase()
        .includes(schoolState?.filters?.searchTerm) ||
      school.class
        .trim()
        .toLowerCase()
        .includes(schoolState?.filters?.searchTerm)
  );

  filteredData =
    schoolState.filters.sortType === "name"
      ? schoolState.filters.nameSort
        ? filteredData.sort(
            (a, b) => b.name.charCodeAt(0) - a.name.charCodeAt(0)
          )
        : filteredData.sort(
            (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)
          )
      : filteredData;

  filteredData =
    schoolState.filters.sortType === "board"
      ? schoolState.filters.boardSort
        ? filteredData.sort(
            (a, b) => b.board.charCodeAt(0) - a.board.charCodeAt(0)
          )
        : filteredData.sort(
            (a, b) => a.board.charCodeAt(0) - b.board.charCodeAt(0)
          )
      : filteredData;

  filteredData =
    schoolState.filters.sortType === "medium"
      ? schoolState.filters.mediumSort
        ? filteredData.sort(
            (a, b) => b.medium.charCodeAt(0) - a.medium.charCodeAt(0)
          )
        : filteredData.sort(
            (a, b) => a.medium.charCodeAt(0) - b.medium.charCodeAt(0)
          )
      : filteredData;

  return filteredData;
};
