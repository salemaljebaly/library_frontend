import {
  Alert,
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
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
import Notification from "../../components/common/Notification";
import {
  handleChangeData,
  add,
  findById,
  updateById,
} from "../../features/books/booksSlice";
import Strings from "../../utils/Strings";
import { MapRounded } from "@mui/icons-material";
import {
  ReportState,
  ReportStateArabic,
  ReportType,
  ReportTypeArabic,
} from "../../utils/enum/reporttype";
import { AppDispatch } from "../../app/store";
import { BookStateType, BookStateTypeArabic } from "../../features/books/bookType";
import { getAll } from "../../features/author/authorSlice";
import { AuthorModel } from "../../features/author/authorModel";

function AddBook() {
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
  const { singleBook, isError, isSucces, isLoading, message, processDone } =
    useSelector((state: any) => state.books);
  // ----------------------------------------------------------------------------------- //
  const { Authors } = useSelector(
    (state: any) => state.authors
  );
    // ----------------------------------------------------------------------------------- //
    const [author , setAuthor] = React.useState(1)
  // ----------------------------------------------------------------------------------- //
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === undefined) {
      dispatch(add({book: singleBook,authorId: author}));
    } else {
      // update user by id
      dispatch(updateById({bookData: singleBook, authorId: author}));
      // ----------------------------------------------------------------------- //
    }
  };
  // ----------------------------------------------------------------------------------- //

  // -------------------------------------------------------------- //
  // get user data from id passed when register init
  useEffect(() => {
    // get all authors 
    dispatch(getAll());
    if (processDone) {
      navigate("/books");
    }
    // ----------------------------------------------------------------------- //
    // git user by id
    if (id != undefined) {
      dispatch(findById(Number.parseInt(id)));
      // setAuthor(Number.parseInt(singleBook.author.id))
    }
    // ----------------------------------------------------------------------- //
  }, [dispatch, processDone]);
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
            ? Strings.edit + Strings.book
            : Strings.add + Strings.book}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="bookName"
                label={Strings.bookName}
                value={singleBook.bookName}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="bookName"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {Strings.authors}
                </InputLabel>
                <Select
                  name="author"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ author}
                  label={Strings.authors}
                  onChange={(e) => setAuthor(Number.parseInt(e.target.value.toString()))}
                >
                  
              {Authors.map((author : AuthorModel) => {
                  return <MenuItem key={author.id} value={author.id}>{author.full_name}</MenuItem>
              })}
                </Select>
              </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="bookPages"
                label={Strings.bookPages}
                value={
                  isNaN(Number.parseInt(singleBook.bookPages)) 
                  ? 0 : Number.parseInt(singleBook.bookPages)
                }
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: Number.parseInt(e.target.value),
                    })
                  )
                }
                name="bookPages"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="bookCount"
                label={Strings.bookCount}
                value={
                  isNaN(Number.parseInt(singleBook.bookCount)) 
                  ? 0 : Number.parseInt(singleBook.bookCount)
                }
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: Number.parseInt(e.target.value),
                    })
                  )
                }
                name="bookCount"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="isbn"
                label={Strings.isbn}
                value={
                  
                  isNaN(Number.parseInt(singleBook.isbn)) 
                  ? 0 : Number.parseInt(singleBook.isbn)
                }
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: Number.parseInt(e.target.value),
                    })
                  )
                }
                name="isbn"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="bookPublisher"
                label={Strings.bookPublisher}
                value={singleBook.bookPublisher}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="bookPublisher"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="bookDescription"
                label={Strings.bookDescription}
                value={singleBook.bookDescription}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="bookDescription"
              />
            </Grid>
            

            <Grid item xs={12}  sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {Strings.state}
                </InputLabel>
                <Select
                  name="state"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={singleBook.state}
                  label={Strings.state}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                >
                  <MenuItem value={BookStateType.STAYED}>
                    {BookStateTypeArabic.STAYED}
                  </MenuItem>
                  <MenuItem value={BookStateType.BARROWED}>
                    {BookStateTypeArabic.BARROWED}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
              id="bookPublishDate"
              
              name="bookPublishDate"
              label={Strings.bookPublishDate}
              type="date"
                value={singleBook.bookPublishDate}
              onChange={(e) =>
                dispatch(
                  handleChangeData({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              defaultValue={new Date().toLocaleDateString('en-ZA').toString()}
              sx={{ width: 220 }}
              InputLabelProps={{
                
                shrink: true,
              }}
              
            />
            </Grid>
            {/* TODO remove reterun date field */}
            {/* <Grid item xs={12}  sm={6}>
            <label htmlFor="contained-button-file">
              <Input inputProps={{ accept: 'image/*', hidden : true }} sx={{display: 'none'}} id="contained-button-file" type="file" 
              name="bookFilePath"
              value={singleBook.bookFilePath}
              onChange={(e) =>
                dispatch(
                  handleChangeData({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              />
              <Button variant="contained" component="span">
                {Strings.uploadImage}
              </Button>
            </label>
            </Grid> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {id != undefined ? Strings.edit : Strings.add}
            </Button>
          </Grid>
        </Box>
      </Box>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
  // ====================================================================================================== //
}

export default AddBook;
