import axios from "axios";
import {withRouter} from "react-router-dom";

//actions of /reducers/list.js
const getListRequest = () => (
  {
      type: "GET_LIST_REQUEST"
  }
);

const getListSuccess = (data) => (
  {
      type: "GET_LIST_SUCCESS",
      data: data
  }
);

const getListFail = (err) => (
  {
      type: "GET_LIST_FAIL",
      err: err
  }
);

const addListSuccess = (data) => {
    
  return {
      type : "ADD_LIST_SUCCESS",
      data : data
  };
}

const addListFail = (err) => {
  return {
      type: "ADD_LIST_FAIL",
      err: err
    };    
}

const editListRequest = () => (
  {
      type: "EDIT_LIST_REQUEST"
  }
);

const editListSuccess = (data) => (
  {
      data: data,
      type: "EDIT_LIST_SUCCESS"
  }
);

const editListFail = (err) => (
  {
      type: "EDIT_LIST_FAIL",
      err: err
  }
)

export const getList = () => {
    return (dispatch) => {
      dispatch(getListRequest());
      axios.get("http://localhost:4000/userlistdb")
        .then(res => {
          dispatch(getListSuccess(res.data));
        })
        .catch(err => {
          dispatch(getListFail(err));
        });
    };
  };

export const deleteUser = (id) => {
  console.log(id);
  return (dispatch) => {
    axios.delete(`http://localhost:4000/userlistdb/delete/${id}`)
      .then(res => {
        dispatch(getList());
      })
      .catch(err => {
        dispatch(getListFail(err));
      });
  };
};

export const addUser = (newUser) => {
  return (dispatch) => {
    axios.post("http://localhost:4000/userlistdb/add", newUser)
      .then( (res) => {
        console.log(res.data);
        dispatch(addListSuccess(res.data.user));
      })
      .catch(err => {
        dispatch(addListFail(err));
      });
  };
};

export const editUser = (user) => {
  return (dispatch) => {
    dispatch(editListRequest());
    axios.post(`http://localhost:4000/userlistdb/edit/${user._id}`, user)
      .then( (res) => {
        console.log(res.data);
        this.props.history.push("/");
        dispatch(editListSuccess(res.data));
        
      })
      .catch(err => {
        dispatch(editListFail(err));
      });
  };
};

//actions of /reducers/detail.js
const getDetailRequest = () => (
  {
      type: "GET_DETAIL_REQUEST"
  }
);

const getDetailSuccess = data => (
  {
      type: "GET_DETAIL_SUCCESS",
      data: data
  }
);

const getDetailFail = err => (
  {
      type: "GET_DETAIL_FAIL",
      err: err
  }
);

export const getDetail = (id) => {
  return (dispatch) => {
    dispatch(getDetailRequest());
    axios.get(`http://localhost:4000/userlistdb/${id}`)
      .then( res => {
        dispatch(getDetailSuccess(res.data));
      })
      .catch( err => {
        dispatch(getDetailFail(err));
      });
  };
};