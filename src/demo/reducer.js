export const GET_LIST = "home/get_list";
const defaultState = {
  name: '',
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case GET_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
