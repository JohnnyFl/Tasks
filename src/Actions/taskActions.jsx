import axios from "axios";
import md5 from "md5";

const tasksAPI =
  "https://uxcandy.com/~shapoval/test-task-backend/?developer=Nazarii";

const tasksAPI_POST =
  "https://uxcandy.com/~shapoval/test-task-backend/create?developer=Nazarii";

const fixedEncodeURIComponent = str => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
};

export const loadTasks = () => dispatch => {
  axios
    .get(tasksAPI)
    .then(res =>
      dispatch({ type: "LOAD_TASKS", payload: res.data.message.tasks })
    )
    .catch(err => console.log(err));
};

export const addTask = (username, email, text) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("text", text);
  axios
    .post(tasksAPI_POST, formData, config)
    .then(res => dispatch({ type: "ADD_TASK", payload: res.data.message }))
    .catch(err => console.log(err));
};

export const editTask = (id, username, email, text, status) => dispatch => {
  const formData = new FormData();
  const token = "beejee";
  const updatedElem = { id, username, email, text, status };
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  formData.append("id", id);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("text", text);
  formData.append("status", status);
  formData.append("token", token);

  const regSpaces = /(%20)/gm;
  const regEq = /(%3D)/gm;
  let str = `email=${email} id=${id} status=${status} text=${text} username=${username} token=${token}`;
  let encoded = fixedEncodeURIComponent(str);
  let hash = md5(encoded.replace(regSpaces, "&").replace(regEq, "="))
  formData.append("signature", hash);

  axios
    .post(
      `https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=Nazarii`,
      formData,
      config
    )
    .then(() => dispatch({ type: "EDIT_TASK", payload: updatedElem }))
    .catch(err => console.log(err));
};

export const adminLogin = () => ({ type: "ADMIN_LOGIN" });
