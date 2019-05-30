const initState = {
  data: [],
  isLoading: false,
  err: null
};

const list = (state = initState, action) => {
  switch (action.type) {
      case "GET_LIST_REQUEST": {
          return {
              ...state,
              isLoading: true,
              err: null
          }
      }
      case "GET_LIST_SUCCESS": {
          return {
              data: action.data,
              isLoading: false,
              err: null
          }
      }
      case "GET_LIST_FAIL": {
          return {
              ...state,
              isLoading: false,
              err: action.err
          }
      }
      case "ADD_LIST_SUCCESS": 
        state.data.push(action.data);
        const newdata = state.data;
        return {
            data : newdata,
            isLoading: false,
            err: null
      }
      case "ADD_LIST_FAIL":
          return {
            ...state,
            isLoading: false,
            err: action.err
        }
      case "EDIT_LIST_REQUEST": {
          return {
              ...state,
              isLoading: true
          }
      }
      case "EDIT_LIST_SUCCESS": {
          const newArray = state.data.map(x => {
            if(x._id === action.data._id) {
                return action.data;
            }
            else{
                return x;
            }
          });
          return {
            data : newArray,
            isLoading : false,
            err : null
          }
      }
      case "EDIT_LIST_FAIL": {
          return {
              ...state,
              isLoading: false,
              err: action.err
          }
      }
      default: {
          return state;
      }
  }
}

export default list;