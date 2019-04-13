const initialState = {
  tasks: [],
  isAdmin: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_TASKS":
      return { ...state, tasks: action.payload };
    case "ADD_TASK":
      return { ...state, tasks: state.tasks.concat(action.payload) };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case "ADMIN_LOGIN":
      return { ...state, isAdmin: true };
    default:
      return { ...state };
  }
};

export default reducer;
