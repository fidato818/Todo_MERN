const add_data = (user) => {
  return {
    type: "ADD_DATA",
    data: user,
  };
};

const update_data = (user) => {
  return {
    type: "UPDATE_DATA",
    data: user,
  };
};

const remove_user = (user) => {
  return {
    type: "REMOVE_DATA",
    data: user,
  };
};

export { add_data,  update_data, remove_user };
