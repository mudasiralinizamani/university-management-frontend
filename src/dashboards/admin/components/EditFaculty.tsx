import { SyntheticEvent, useEffect, useState } from "react";
import { IUser } from "../../../core/models/IUser.interface";
import axios from "../../../core/api/axios";
import { FacultyEndpoints, UsersEndpoints } from "../../../core/api/endpoints";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { IUpdateFacultyDean } from "../models/IUpdateFacultyDean.interface";
import { IFaculty } from "../../../core/models/IFaculty.interface";

// Importing Material Ui Components
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { IUpdateFacultyName } from "../models/IUpdateFacultyName.interface";
import { useNavigate } from "react-router-dom";

interface properties {
  deanId: string;
  facultyId: string;
  name: string;
}

function EditFaculty(props: properties) {
  const [deanUpdateOpen, setDeanUpdateOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deans, setDeans] = useState<IUser[]>();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  // Form Data
  const [deanId, setDeanId] = useState<string>("");

  useEffect(() => {
    const getDeans = async () => {
      await axios
        .get(UsersEndpoints.GetDeans)
        .then((res) => setDeans(res.data));
    };
    getDeans();
    return () => setDeans([]);
  }, []);

  const defaultProps = {
    options: deans,
    getOptionLabel: (option: IUser) => `${option.fullName}`,
  };

  const UpdateDean = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (deanId === "" || deanId === null || deanId === undefined) {
      return enqueueSnackbar("Plz select a dean", { variant: "error" });
    } else if (deanId === props.deanId) {
      return enqueueSnackbar("Plz choose another dean", { variant: "error" });
    }
    const model: IUpdateFacultyDean = {
      facultyId: props.facultyId,
      newDeanId: deanId,
    };
    await axios
      .put(FacultyEndpoints.UpdateDean, model)
      .then((res) => {
        enqueueSnackbar("Successfully updated Dean", { variant: "success" });
        setDeanUpdateOpen(false);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.data.code) {
          case "FacultyNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "DeanNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "UserNotDean":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "ServerError":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          default:
            enqueueSnackbar("Something went wrong", { variant: "error" });
            setDeanUpdateOpen(false);
            break;
        }
      });
  };

  const UpdateName = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (name === "" || name === null || name === undefined) {
      return enqueueSnackbar("Name cannot be empty", { variant: "error" });
    } else if (name === props.name) {
      return enqueueSnackbar("Same Name", { variant: "warning" });
    }
    const model: IUpdateFacultyName = {
      facultyId: props.facultyId,
      newName: name,
    };
    await axios
      .put(FacultyEndpoints.UpdateName, model)
      .then((res) => {
        enqueueSnackbar("Successfully updated Name", { variant: "success" });
      })
      .catch((err: AxiosError) => {
        switch (err.response?.data.code) {
          case "FacultyNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "FacultyNameFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "ServerError":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          default:
            enqueueSnackbar("Something went wrong", { variant: "error" });
            setDeanUpdateOpen(false);
            break;
        }
      });
  };

  const Delete = async (event: SyntheticEvent) => {
    event.preventDefault();
    await axios
      .delete(`${FacultyEndpoints.Delete}${props.facultyId}`)
      .then((res) => {
        enqueueSnackbar("Successfully Deleted Faculty", { variant: "success" });
        navigate("/admin/faculties");
      });
  };

  return (
    <>
      <div className="card1">
        <div className="card1__head">
          <div className="card1__category">Edit Faculty</div>
        </div>
        <div className="card1__body">
          <div>
            <TextField
              sx={{ marginBottom: "14px" }}
              id="outlined-basic"
              label="Name *"
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="standard"
            />
          </div>
          <div className="bts">
            <Button variant="contained" onClick={(event) => UpdateName(event)}>
              Update
            </Button>
            <Button
              sx={{ marginLeft: "8px" }}
              variant="contained"
              color="secondary"
              onClick={() => setDeanUpdateOpen(true)}
            >
              Change Dean
            </Button>
            <Button
              sx={{ marginLeft: "8px" }}
              variant="contained"
              color="error"
              onClick={() => setConfirmOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      {/* Update Dean Modal */}
      <Dialog open={deanUpdateOpen} onClose={() => setDeanUpdateOpen(false)}>
        <DialogTitle>Update Dean</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a new dean and the current dean will be changes with new one
          </DialogContentText>
          <Autocomplete
            {...defaultProps}
            id="clear-on-escape"
            clearOnEscape
            freeSolo
            onChange={(event, value: any) => setDeanId(value?.id)}
            renderInput={(params) => (
              <TextField {...params} label="Select Dean *" variant="standard" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeanUpdateOpen(false)}>Cancel</Button>
          <Button onClick={(event) => UpdateDean(event)}>Update</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Faculty Modal */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this faculty mean deleting all of the departments of this
            faculty
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>No</Button>
          <Button onClick={(event) => Delete(event)}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditFaculty;
