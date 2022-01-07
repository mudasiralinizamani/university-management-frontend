import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";
import {
  FacultyEndpoints,
  UsersEndpoints,
} from "../../../../core/api/endpoints";
import { IUser } from "../../../../core/models/IUser.interface";
import { ICreateFaculty } from "../../models/ICreateFaculty";

function CreateFaculty() {
  const navigate = useNavigate();
  const [deans, setDeans] = useState<IUser[]>();
  const { enqueueSnackbar } = useSnackbar();

  // Form Data
  const [deanId, setDeanId] = useState<string>("");
  const [name, setName] = useState<string>("");

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

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (deanId === "" || deanId === null || deanId === undefined) {
      enqueueSnackbar("Plz select a dean", { variant: "error" });
      return;
    } else if (name === "" || name === null || name === undefined) {
      enqueueSnackbar("Name cannot be empty", { variant: "error" });
      return;
    } else if (name.length < 3 || name.length > 25) {
      enqueueSnackbar("Name must be between 3 to 25 characters long", {
        variant: "error",
      });
      return;
    }
    const model: ICreateFaculty = {
      deanId: deanId,
      name: name,
    };
    await axios
      .post(FacultyEndpoints.CreateFaculty, model)
      .then((res) => {
        enqueueSnackbar("Created Faculty Successfully", { variant: "success" });
        navigate("/admin/faculties");
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 500) {
          return enqueueSnackbar("Server Error, Plz try later", {
            variant: "warning",
          });
        } else if (err.response?.data.code === "UserNotFound") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "UserNotDean") {
          return enqueueSnackbar(err.response.data, { variant: "error" });
        } else if (err.response?.data.code === "FacultyNameFound") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        }
      });
  };

  return (
    <div className="page__wrapper">
      <div className="entry">
        <div className="entry__wrap">
          <div className="entry__title">Create Faculty</div>
          <form
            className="entry__form"
            onSubmit={(event) => {
              Submit(event);
            }}
          >
            <div className="entry__group">
              <TextField
                sx={{ marginBottom: "14px" }}
                id="outlined-basic"
                label="Name *"
                onChange={(e) => setName(e.target.value)}
                fullWidth
                variant="standard"
              />
              <Autocomplete
                {...defaultProps}
                id="clear-on-escape"
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setDeanId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Dean *"
                    variant="standard"
                  />
                )}
              />
            </div>
            <button
              className="entry__btn btn btn btn_big btn_wide btn_blue"
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateFaculty;
