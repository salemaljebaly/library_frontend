import axios from "axios";
import jwtDecode from "jwt-decode";
import Strings from "../../utils/Strings";
import { AuthorModel } from "./authorModel";

const API_URL = Strings.API_URL;
const path = "author";
// ------------------------------------------------------------------ //
// Register author
const add = async (data: AuthorModel, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 

  const response = await axios.post(API_URL + path, data, config);
  return response.data;
};
// ------------------------------------------------------------------ //
// get all
const getAll = async  (access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 

  const response = await axios.get(API_URL + path, config);
  let data: AuthorModel[];
  if (response.data) {
    data = response.data;
    return data;
  }
  return response.data;
};
// ------------------------------------------------------------------ //
// update user from database
const updateById = async (
  access_token: string,
  id: number,
  data: Partial<AuthorModel>
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 
  const response = await axios.patch(API_URL + path + "/" + id, data, config);
  const retrunCitizenData = findByID(access_token, id);
  return retrunCitizenData;
};
// ------------------------------------------------------------------ //
// update author from database
const findByID = async (access_token: string,id: number) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }; 

  const response = await axios.get(API_URL + path + "/" + id, config);

  return response.data;
};
// ------------------------------------------------------------------ //
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
// ------------------------------------------------------------------ //
const authorService = {
  add,
  getAll,
  deleteById,
  updateById,
  findByID,
};
// ------------------------------------------------------------------ //
export default authorService;
