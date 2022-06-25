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
import { AppDispatch } from "../../app/store";
  import Notification from "../../components/common/Notification";
  import {
    handleChangeData,
    add,
    findById,
    updateById,
  } from "../../features/author/authorSlice";
  import Strings from "../../utils/Strings";
  
  function AddAuthor() {
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
    const { singleAuthor, isError, isSucces, isLoading, message, processDone } = useSelector(
      (state: any) => state.authors
    );
    // ----------------------------------------------------------------------------------- //
    // handle submit form
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (id === undefined) {
        const singleUserObjectHasDataOrNot: boolean =
          Object.keys(singleAuthor).length > 0 && true;
  
        dispatch(add(singleAuthor));

      } else {
        // update user by id
        dispatch(updateById(singleAuthor));
        // ----------------------------------------------------------------------- //
      }
    };
    // ----------------------------------------------------------------------------------- //
    // get user data from id passed when register init
    useEffect(() => {
      if(processDone){
        navigate('/authors')
      }
      // ----------------------------------------------------------------------- //
      // git user by id
      if (id != undefined) {
        dispatch(findById(Number(id)));
      }
      // ----------------------------------------------------------------------- //
    }, [dispatch, processDone]);
    // ====================================================================================================== //
  
    // -------------------------------------------------------------- //
    if (isLoading) {
      return (
        <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      )
    }
    return (
      <>
        
        {isError ? <Alert severity="error" >{Array.isArray(message) ?  message[0] : message}</Alert> : null}
        
  
        <CssBaseline />
        <Box
          sx={{
            display: "block",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {id != undefined ? Strings.edit + Strings.fields : Strings.add + Strings.fields }
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="full_name"
                  required
                  fullWidth
                  id="full_name"
                  label={Strings.fullName}
                  value={singleAuthor["full_name"]}
                  onChange={(e) =>
                    dispatch(
                      handleChangeData({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                  autoFocus
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
  
  export default AddAuthor;
  