import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "./authorService";
import { AuthorModel, AuthortState } from "./authorModel";
import { RootState } from "../../app/store";
import { UserModelFromToken } from "../users/userModel";
// Get user token from local storage
const user = JSON.parse(localStorage.getItem("user")!) as UserModelFromToken;
const initialState : AuthortState = {
  Authors: [], // check if there is Authors
  singleAuthor : {},
  isError: false,
  isSucces: false,
  isLoading: false,
  // use this property to check add and edit process
  processDone : false,
  message: [],
};

// ------------------------------------------------------------------------------------------- //
// Register Authors
export const add = createAsyncThunk (
  "Authors/add",
  async (author: AuthorModel, thunkAPI) => {
    try {
      return await authorService.add(author, user.access_token.toString());
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ------------------------------------------------------------------------------------------- //
// get all Authorss
export const getAll = createAsyncThunk<AuthorModel[], undefined, { state: RootState }> (
  "Authors/getAll",
  async (_, thunkAPI) => {
    try {
      const access_token : any = thunkAPI.getState().auth.user?.access_token;
      return await authorService.getAll(access_token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ------------------------------------------------------------------------------------------- //
// delete Authors by id
export const deleteById = createAsyncThunk (
  "Authors/deleteById",
  async (id : number, thunkAPI) => {
    try {
      return await authorService.deleteById(user.access_token,id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ------------------------------------------------------------------------------------------- //
// update Authors by id
export const updateById = createAsyncThunk (
  "Authors/updateById",
  async (author : Partial<AuthorModel>, thunkAPI) => {
    try {
      const {id, ...fields} = author;
      return await authorService.updateById(user.access_token,id!, fields);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ------------------------------------------------------------------------------------------- //
// update Authors by id
export const findById = createAsyncThunk (
  "Authors/findById",
  async (id : number, thunkAPI) => {
    try {
      // TODO check find Authors works
      return await authorService.findByID(user.access_token, id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// ------------------------------------------------------------------------------------------- //

export const Authorslice = createSlice({
  name: "author",
  initialState,
  reducers: {
    // ------------------------------------------------------------------ //
    // reset state
    reset: (state) => {
      state.Authors = [];
      state.singleAuthor = null;
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
      state.message = [];
    },
    resetSingle: (state) => {
      state.singleAuthor = {};
      state.message = [];
      state.isLoading = false;
      state.isSucces = false;
      state.isError = false;
      state.processDone = false;
    },
    // ------------------------------------------------------------------ //
    // use this function to changes in data 
    handleChangeData : (state ,action) => {
      state.singleAuthor = {
        ...state.singleAuthor, 
        [action.payload.name] : action.payload.value
      }
    }
    // ------------------------------------------------------------------ //
  },
  extraReducers: (builder) => {
    builder
      // ------------------------------------------------------------------ //
      // register
      .addCase(add.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processDone = true;
        state.Authors = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.Authors = [];
      })
      // ------------------------------------------------------------------ //
      // get All Authors
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
        state.Authors = [];
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.Authors = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Authors = [];
        state.processDone = false;
      })
      // ------------------------------------------------------------------ //
      // update Authors by id
      // TODO return fix  update message 
      .addCase(updateById.pending, (state) => {
        
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
        state.processDone = false;
        state.message = [];
      })
      .addCase(updateById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.processDone = true;
        state.Authors = action.payload;
      })
      .addCase(updateById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.processDone = false;
        state.message = action.payload as string[]; // get value when reject
        state.Authors = [];
      })
      // ------------------------------------------------------------------ //
      // find Authors by id
      // TODO return fix  delete message 
      .addCase(findById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.singleAuthor =  action.payload;
        state.processDone = false;
      })
      .addCase(findById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.singleAuthor = null;
        
      })
      // ------------------------------------------------------------------ //
      // delete Authors by id
      // TODO return fix  delete message 
      .addCase(deleteById.pending, (state) => {
        state.isLoading = true;

      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.processDone = false;
        state.Authors = state.Authors.filter((author : AuthorModel)=> author.id !== action.payload)
      })
      .addCase(deleteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string[]; // get value when reject
        state.Authors = [];
      })
      // ------------------------------------------------------------------ //
  },
});

export const { reset ,resetSingle, handleChangeData} = Authorslice.actions;
export default Authorslice.reducer;
