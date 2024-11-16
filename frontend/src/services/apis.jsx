import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = {
  login: (credentials) =>
    axios.post(`${API_URL}/login`, credentials).then((res) => res.data),

  register: (data) =>
    axios.post(`${API_URL}/register`, data).then((res) => res.data),

  getTasks: (token) =>
    axios
      .get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  createTask: (task, token) =>
    axios
      .post(`${API_URL}/task`, task, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data),

  updateTask: (task, token) =>
    axios.put(`${API_URL}/task/${task._id}`, task, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteTask: (task, token) =>
    axios.delete(`${API_URL}/task/${task._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default api;
