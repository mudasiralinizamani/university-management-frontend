import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";
import {
  DepartmentEndpoints,
  SubjectEndpoints,
} from "../../../../core/api/endpoints";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import { ICreateSubject } from "../../models/ICreateSubject";

function CreateSubject() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [departments, setDepartments] = useState<IDepartment[]>();

  //Form Data
  const [name, setName] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<string>("");

  useEffect(() => {
    const getDepartments = async () =>
      await axios
        .get(DepartmentEndpoints.GetDepartments)
        .then((res) => setDepartments(res.data))
        .catch((err: AxiosError) => {});
    getDepartments();
    return () => setDepartments([]);
  }, []);

  const defaultProps = {
    options: departments,
    getOptionLabel: (option: IDepartment) => `${option.name}`,
  };

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      departmentId === "" ||
      departmentId === null ||
      departmentId === undefined
    ) {
      enqueueSnackbar("Plz select a Department", { variant: "error" });
      return;
    } else if (name === "" || name === null || name === undefined) {
      enqueueSnackbar("Name cannot be empty", { variant: "error" });
      return;
    }
    const model: ICreateSubject = {
      name: name,
      departmentId: departmentId,
    };
    await axios
      .post(SubjectEndpoints.CreateSubject, model)
      .then((res) => {
        enqueueSnackbar("Created Subject Successfully", {
          variant: "success",
        });
        return navigate("/admin/subjects");
      })
      .catch((err: AxiosError) => {
        switch (err.response?.data.code) {
          case "DepartmentNotFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "SubjectNameFound":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          case "ServerError":
            enqueueSnackbar(err.response.data.error, { variant: "error" });
            break;
          default:
            enqueueSnackbar("Something went wrong", { variant: "error" });
            break;
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
                sx={{ marginBottom: "14px" }}
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setDepartmentId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Department *"
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
export default CreateSubject;
