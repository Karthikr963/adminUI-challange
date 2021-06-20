const ACTIONS = {
  DELETE_ONE: "delete_one",
  DELETE_MULTIPLE: "delete_multiple",
  ERROR: "error",
  DELETE_ALL: "delete_all",
  UPDATE_USER: "update_user",
  GET_DATA: "get_data",
};
export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DELETE_ONE:
      return state.filter((user) => {
        return user.id !== action.id;
      });
    case ACTIONS.UPDATE_USER:
      return state.map((user) => {
        if (user.id === action.filterArray.id) {
          user.name = action.filterArray.name;
          user.email = action.filterArray.email;
          user.role = action.filterArray.role;
        }
        return user;
      });

    case ACTIONS.GET_DATA:
      return action.payload.users;
    case ACTIONS.DELETE_MULTIPLE:
      for (let i = 0; i < action.filterArray.length; i++) {
        state = state.filter((user) => {
          return user.id !== action.filterArray[i];
        });
      }
      return state;
    case ACTIONS.DELETE_ALL:
      for (let i = 0; i < action.filterArray.length; i++) {
        state = state.filter((user) => {
          return user.id !== action.filterArray[i].id;
        });
      }
      return state;
    default:
      return state;
  }
}

// export default Reducer;
