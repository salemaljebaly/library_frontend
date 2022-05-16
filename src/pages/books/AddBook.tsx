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
  // handle submit form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === undefined) {
      const singleUserObjectHasDataOrNot: boolean =
        Object.keys(singleBook).length > 0 && true;
      dispatch(add(singleBook));
    } else {
      // update user by id
      dispatch(updateById(singleBook));
      // ----------------------------------------------------------------------- //
    }
  };
  // ----------------------------------------------------------------------------------- //

  // -------------------------------------------------------------- //
  // get user data from id passed when register init
  useEffect(() => {
    if (processDone) {
      navigate("/books");
    }
    // ----------------------------------------------------------------------- //
    // git user by id
    if (id != undefined) {
      dispatch(findById(Number(id)));
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
              <TextField
                required
                fullWidth
                id="authorName"
                label={Strings.authorName}
                value={singleBook.authorName}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="authorName"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="bookPages"
                label={Strings.bookPages}
                value={Number.parseInt(singleBook.bookPages)}
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

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="returnDate"
                label={Strings.returnDate}
                value={singleBook.returnDate}
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

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="bookPublishDate"
                label={Strings.bookPublishDate}
                value={singleBook.bookPublishDate}
                onChange={(e) =>
                  dispatch(
                    handleChangeData({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
                name="bookPublishDate"
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
