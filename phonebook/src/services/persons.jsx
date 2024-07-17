import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(res => res.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(res => res.data);
};

export default { getAll, del, update, create };
