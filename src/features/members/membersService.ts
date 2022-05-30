import axios from "axios";
import jwtDecode from "jwt-decode";
import Strings from "../../utils/Strings";
import { LoginModel, MemberModel, MemberModelFromToken } from "./membersModel";

const API_URL = Strings.API_URL;
const path = 'members';

// Register citizen
const add = async (data:MemberModel, depId : number, access_token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
    const response = await axios.post(API_URL + path + '/' + depId, data, config);

    return response.data;
}

// login user
const login = async (userData:LoginModel) => {
    const response = await axios.post(API_URL + path + 'auth', userData);
    let user : MemberModelFromToken;
    if(response.data){
        user  = jwtDecode(response.data['access_token']);
        user.access_token = response.data['access_token'];
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    }
    return response.data;
}

// get all user
const getAll = async (access_token: string) => {
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path , config);
  let users : MemberModel[];
  if(response.data){
      users  = response.data
      return users;
      
  }
  return response.data;
}
// count all 
const countAll = async (access_token: string) => {
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path + '/count' , config);
  return response.data;
}


// update user from database
const updateById  = async (access_token: string, id : number, depId : number, userData:Partial<MemberModel>) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.patch(API_URL + path + '/' + id + '/' + depId,userData, config);
    const retrunCitizenData  = findByID(access_token, id);
    return retrunCitizenData;
}

// update user from database
const findByID  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.get(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const deleteById  = async (access_token: string, id : number) => {
    
    const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    const response = await axios.delete(API_URL + path + '/' + id, config);
    
    return response.data;
}

// delete user from database
const searchIn  = async (access_token: string, keyword : string) => {
    
  const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  const response = await axios.get(API_URL + path + '/' + keyword, config);
  
  // it retrun array of users 
  return response.data;
}

// delete user from database
// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
   add,
    login,
    getAll,
    deleteById,
    updateById, 
    findByID,
    searchIn,
    logout,
    countAll
}

export default authService;