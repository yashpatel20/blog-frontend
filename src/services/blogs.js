import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token, "Content-type": "application/json" }
  };
  console.log(config);
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl} /${id}`, newObject);
  return request.data;
};

export default { getAll, create, update, setToken };
