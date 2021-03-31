const initialUserState = {
  data: [],
};

const reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case "ADD_DATA": {
      return { ...state, data: [...state.data, action.data] };
    }
    case "UPDATE_DATA": {
      return {
        ...state,
        data: state.data.map((e) => {
          if (e._id !== action.data._id) {
            return e;
          } else {
            return {
              ...e,
              title: action.data.title,
              content: action.data.content,
            };
          }
        }),
      };
    }
    case "REMOVE_DATA": {
      return {
        ...state,
        data: state.data.filter((post) => post._id !== action.data),
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
