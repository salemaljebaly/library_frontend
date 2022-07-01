import { Add } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/table";
import { BarrowModel } from "../../features/barrows/barrowsModel";
import { UsersModel } from "../../features/users/userModel";
import {
  deleteById,
  findById,
  getAll,
  reset,
  updateById,
  resetSingle,
  handleChangeData,
  updateBarrowStateById,
} from "../../features/barrows/barrowsSlice";
import Strings from "../../utils/Strings";
import { BarrowsColumns } from "../../components/models/columns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { green, red } from "@mui/material/colors";
import { DeleteRounded, RemoveRedEye } from "@mui/icons-material";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { AppDispatch } from "../../app/store";
import { BarrowState } from "../../features/barrows/barrowType.enum";

interface Props {
  userData: UsersModel[];
}

function Barrows() {
  const navigate = useNavigate();
  // ---------------------------------------------------------------------------------- //
  const [confirmDialog, setConfirmDialog] = React.useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  // ---------------------------------------------------------------------------------- //
  const [barrowState, setBarrowState] = React.useState(
     false
  );
  // ---------------------------------------------------------------------------------- //

  const dispatch = useDispatch<AppDispatch>();
  const { barrows, singleBarrow,isError, isSucces, isLoading, message } = useSelector(
    (state: any) => state.barrows
  );

  const { user } = useSelector((state: any) => state.auth);

  let barrowData: BarrowModel[] = barrows as BarrowModel[];
    
  useEffect(() => {
    if (user) {
      dispatch(getAll());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  function setSecconds(originalDate : any, seconds: any){
    var cloneDate = new Date(originalDate.valueOf());
    cloneDate.setSeconds(cloneDate.getSeconds() + seconds);
    return cloneDate;
  }
  // ---------------------------------------------------------------------------------- //
  const handleDelete = (id: number) => {
    // TODO delete from users fix delete user
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    dispatch(deleteById(id));
  };
  // ---------------------------------------------------------------------------------- //
  // handle action [delete and view]
  const actionColumn = [
    {
      field: "stateAction",
      headerName: Strings.changeState,
      width: 130,
      renderCell: (params: any) => {
        return <>

        <ButtonGroup variant="contained" aria-label="outlined button group"
        >
          <Button color="error"
            onClick={() => {
              dispatch(updateBarrowStateById({id : params.row.id, data: {state : BarrowState.REJECTED.toString()}}));
            }
            }>{Strings.reject}</Button>
            <Button color="success"
              onClick={() => {
                dispatch(updateBarrowStateById({id : params.row.id, data: {state :  BarrowState.ACCEPTED.toString()}}));
              }
              }>{Strings.accept}</Button>
        </ButtonGroup>
        </>
      }
    },
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params: any) => {
        return (
          <Box className="cellAction">
            <Link
              to={`/barrow/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <RemoveRedEye
                sx={{ color: green[500], marginRight: 2, marginLeft: 2 }}
              ></RemoveRedEye>
            </Link>

            <DeleteRounded
              className="deleteButton"
              sx={{ color: red[500] }}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: Strings.areYouSureToDelete,
                  subTitle: Strings.youCantUndoThisStep,
                  onConfirm: () => {
                    handleDelete(params.row.id);
                  },
                });
              }}
            >
              {Strings.delete}
            </DeleteRounded>
          </Box>
        );
      },
    },
  ];
  // ---------------------------------------------------------------------------------- //
  return (
    // check of array of user has item then return table
    <>
      <Grid
        container
        justifyContent="space-between"
        justifyItems="center"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <Typography variant="h5" sx={{ margin: 1 }}>
            {Strings.barrows}
          </Typography>
        </Grid>
        <Grid item xs={6} alignItems="" >
          <Button
            variant="outlined"
            endIcon={<Add />}
            sx={{
              maring: 16,
              textAlign : 'end',
              float : 'right'
            }}
            onClick={() => {
              dispatch(resetSingle());
              navigate("/barrow");
            }}
          >
            {Strings.add + Strings.addBarrow}
          </Button>
        </Grid>
      </Grid>

      {barrowData?.length > 0 ? (
        <DataTable
          row={BarrowsColumns}
          data={barrowData}
          action={actionColumn}
        />
      ) : (
        <div>No data returned</div>
      )}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default Barrows;
