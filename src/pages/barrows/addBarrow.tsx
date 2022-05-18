import {
  Alert,
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import Notification from "../../components/common/Notification";
import { DepartmentModel } from "../../features/department/departmentModel";
import { getAll as getAllBooks } from "../../features/books/booksSlice";
import { getAll as getAllMembers } from "../../features/members/membersSlice";
import {
  handleChangeData,
  add,
  findById,
  updateById,
} from "../../features/barrows/barrowsSlice";
import Strings from "../../utils/Strings";
import { BookModel } from "../../features/books/booksModel";
import { MemberModel } from "../../features/members/membersModel";

function AddBarrow() {
  // ------------------------------------------------------------------------------- //
  // take state from props
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // ----------------------------------------------------------------------------------- //
  // get param from user url
  const { id } = useParams();
  // ----------------------------------------------------------------------------------- //
  // dispatch to get and executer function from slices
  const dispatch = useDispatch<AppDispatch>();
  // ----------------------------------------------------------------------------------- //
  // use to navigate to another components
  const navigate = useNavigate();
  // ----------------------------------------------------------------------------------- //
  // desctruct memebers from user state [ userSlice]
  const { singleBarrow, isError, isSucces, isLoading, message, processDone } =
    useSelector((state: any) => state.barrows);
  // ----------------------------------------------------------------------------------- //
  const { members } = useSelector((state: any) => state.members);
  // ----------------------------------------------------------------------------------- //
  const { books } = useSelector((state: any) => state.books);
  // ----------------------------------------------------------------------------------- //
  const [bookId, setBookId] = React.useState(1);
  // ----------------------------------------------------------------------------------- //
  const [memberId, setMemberId] = React.useState(1);
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === undefined) {
      const singleUserObjectHasDataOrNot: boolean =
        Object.keys(singleBarrow).length > 0 && true;

        // console.log(`bookId ${bookId} memberId ${memberId} data ${singleBarrow}`)
      dispatch(add({ bookId: bookId, memberId: memberId, data: singleBarrow }));
    } else {
      // update user by id
      dispatch(updateById(singleBarrow));
      // ----------------------------------------------------------------------- //
    }
  };
  // ----------------------------------------------------------------------------------- //

  // -------------------------------------------------------------- //
  // get user data from id passed when register init
  useEffect(() => {
    // get all books
    dispatch(getAllBooks())
    // get all member
    dispatch(getAllMembers());
    if (processDone) {
      navigate("/barrows");
    }
    // ----------------------------------------------------------------------- //
    // TODO fix update
    // git user by id
    if (id != undefined) {
      dispatch(findById(Number(id)));
      console.log(singleBarrow.book.id!)
      setBookId(singleBarrow.book.id!);
      setMemberId(singleBarrow.member.id!);
    }
    // ----------------------------------------------------------------------- //
  }, [dispatch, processDone]);
  // ====================================================================================================== //

  // -------------------------------------------------------------- //
  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  return (
    <>
      {isError ? (
        <Alert severity="error">
          {Array.isArray(message) ? message[0] : message}
        </Alert>
      ) : null}

      <CssBaseline />
      <Box
        sx={{
          display: "block",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {id != undefined
            ? Strings.edit + Strings.barrows
            : Strings.add + Strings.barrows}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {id != undefined ?
            <>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled
              >
                
                <InputLabel id="demo-simple-select-label">
                  {Strings.bookName}
                </InputLabel>
                <Select
                  name="book"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bookId}
                  label={Strings.departments}
                  onChange={(e) =>
                    setBookId(Number.parseInt(e.target.value.toString()))
                  }
                >
                  {books.map((book: BookModel) => {
                    return (
                      <MenuItem key={book.id} value={book.id}>
                        {book.bookName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth disabled>
                <InputLabel id="demo-simple-select-label">
                  {Strings.memberName}
                </InputLabel>
                <Select
                  name="member"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={memberId}
                  label={Strings.departments}
                  onChange={(e) =>
                    setMemberId(Number.parseInt(e.target.value.toString()))
                  }
                >
                  {members.map((member: MemberModel) => {
                    return (
                      <MenuItem key={member.id} value={member.id}>
                        {member.fullName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            </>
            :
<>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth
              >
                
                <InputLabel id="demo-simple-select-label">
                  {Strings.bookName}
                </InputLabel>
                <Select
                  name="book"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bookId}
                  label={Strings.departments}
                  onChange={(e) =>
                    setBookId(Number.parseInt(e.target.value.toString()))
                  }
                >
                  {books.map((book: BookModel) => {
                    return (
                      <MenuItem key={book.id} value={book.id}>
                        {book.bookName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {Strings.memberName}
                </InputLabel>
                <Select
                  name="member"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={memberId}
                  label={Strings.departments}
                  onChange={(e) =>
                    setMemberId(Number.parseInt(e.target.value.toString()))
                  }
                >
                  {members.map((member: MemberModel) => {
                    return (
                      <MenuItem key={member.id} value={member.id}>
                        {member.fullName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            </>
                }
          <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="returnDate"
                label={Strings.returnDate}
                value={singleBarrow.returnDate}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="returnDate"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {id != undefined ? Strings.edit : Strings.add}
          </Button>
        </Box>
      </Box>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
  // ====================================================================================================== //
}

export default AddBarrow;
