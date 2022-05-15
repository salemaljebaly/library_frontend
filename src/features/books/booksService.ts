import axios from "axios";
import { BookModel } from "./booksModel";

const API_URL = "http://localhost:4000/";
const path = "book";

// Register citizen
const add = async (data: BookModel, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.post(API_URL + path , data, config);

  return response.data;
};

// get all user
const getAll = async (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path, config);
  let users: BookModel[];
  if (response.data) {
    users = response.data;
    return users;
  }
  return response.data;
};
// count all
const countAll = async (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + "/count", config);
  return response.data;
};

// update user from database
const updateById = async (
  access_token: string,
  id: number,
  userData: Partial<BookModel>
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  await axios.patch(
    API_URL + path + "/" + id,
    userData,
    config
  );
  const retrunCitizenData = findByID(access_token, id);
  return retrunCitizenData;
};

// update user from database
const findByID = async (access_token: string, id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + "/" + id, config);

  return response.data;
};

// delete user from database
const deleteById = async (access_token: string, id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.delete(API_URL + path + "/" + id, config);

  return response.data;
};

// delete user from database
const searchIn = async (access_token: string, keyword: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios.get(API_URL + path + "/" + keyword, config);

  // it retrun array of users
  return response.data;
};

// delete user from database
// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  add,
  getAll,
  deleteById,
  updateById,
  findByID,
  searchIn,
  logout,
  countAll,
};

export default authService;
