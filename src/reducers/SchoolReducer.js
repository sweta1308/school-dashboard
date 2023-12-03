export const schoolReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_SCHOOLS":
      return { ...state, schools: payload };
    case "SET_EDIT_ID":
      return { ...state, editId: payload };
    case "SEARCH_SCHOOL":
      return { ...state, filters: { ...state.filters, searchTerm: payload } };
    case "NAME_SORT":
      return {
        ...state,
        filters: {
          ...state.filters,
          nameSort: !state.filters.nameSort,
          sortType: payload,
        },
      };
    case "BOARD_SORT":
      return {
        ...state,
        filters: {
          ...state.filters,
          boardSort: !state.filters.boardSort,
          sortType: payload,
        },
      };
    case "MEDIUM_SORT":
      return {
        ...state,
        filters: {
          ...state.filters,
          mediumSort: !state.filters.mediumSort,
          sortType: payload,
        },
      };
    default:
      return state;
  }
};
