import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";
import {
  DepartmentEndpoints,
  FacultyEndpoints,
  UsersEndpoints,
} from "../../../../core/api/endpoints";
import { IFaculty } from "../../../../core/models/IFaculty.interface";
import { IUser } from "../../../../core/models/IUser.interface";
import { ICreateDepartment } from "../../models/ICreateDepartment";

function CreateDepartment() {
  const navigate = useNavigate();
  const [hods, setHods] = useState<IUser[]>();
  const [courseAdvisers, setCourseAdvisers] = useState<IUser[]>();
  const [faculties, setFaculties] = useState<IFaculty[]>();
  const { enqueueSnackbar } = useSnackbar();

  // Form Data
  const [name, setName] = useState<string>("");
  const [hodId, setHodId] = useState<string>("");
  const [courseAdviserId, setCourseAdviserId] = useState<string>("");
  const [facultyId, setFacultyId] = useState<string>("");

  useEffect(() => {
    const getHods = async () => {
      await axios.get(UsersEndpoints.GetHods).then((res) => setHods(res.data));
    };
    const getCourseAdvisers = async () => {
      await axios
        .get(UsersEndpoints.GetCourseAdvisers)
        .then((res) => setCourseAdvisers(res.data));
    };
    const getFaculties = async () =>
      axios
        .get(FacultyEndpoints.GetFaculties)
        .then((res) => setFaculties(res.data));
    getHods();
    getCourseAdvisers();
    getFaculties();
    return () => {
      setHods([]);
      setCourseAdvisers([]);
      setFaculties([]);
    };
  }, []);

  const defaultHodsProps = {
    options: hods,
    getOptionLabel: (option: IUser) => `${option.fullName}`,
  };
  const defaultCourseAdvisersProps = {
    options: courseAdvisers,
    getOptionLabel: (option: IUser) => `${option.fullName}`,
  };
  const defaultFacultiesProps = {
    options: faculties,
    getOptionLabel: (option: IFaculty) => `${option.name}`,
  };

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (hodId === "" || hodId === null || hodId === undefined) {
      enqueueSnackbar("Plz select a Hod", { variant: "error" });
      return;
    } else if (
      courseAdviserId === "" ||
      courseAdviserId === null ||
      courseAdviserId === undefined
    ) {
      enqueueSnackbar("Plz select a Course Adviser", { variant: "error" });
      return;
    } else if (
      facultyId === "" ||
      facultyId === null ||
      facultyId === undefined
    ) {
      enqueueSnackbar("Plz select a Faculty", { variant: "error" });
      return;
    } else if (name === "" || name === null || name === undefined) {
      enqueueSnackbar("Name cannot be empty", { variant: "error" });
      return;
    } else if (name.length < 3 || name.length > 25) {
      return enqueueSnackbar("Name must be between 3 to 25 characters long", {
        variant: "error",
      });
    }
    const model: ICreateDepartment = {
      courseAdviserId: courseAdviserId,
      facultyId: facultyId,
      hodId: hodId,
      name: name,
    };
    await axios
      .post(DepartmentEndpoints.CreateDepartment, model)
      .then((res) => {
        enqueueSnackbar("Created Department Successfully", {
          variant: "success",
        });
        return navigate("/admin/departments");
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 500) {
          return enqueueSnackbar("Server Error, Plz try later", {
            variant: "warning",
          });
        } else if (err.response?.data.code === "HodNotFound") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "UserNotHod") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "CourseAdviserNotFound") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "UserNotCourseAdviser") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "FacultyNotFound") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "DepartmentNameFound") {
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "ServerError") {
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
                {...defaultHodsProps}
                id="clear-on-escape"
                sx={{ marginBottom: "14px" }}
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setHodId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Hod *"
                    variant="standard"
                  />
                )}
              />
              <Autocomplete
                {...defaultCourseAdvisersProps}
                id="clear-on-escape"
                sx={{ marginBottom: "14px" }}
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setCourseAdviserId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Course Adviser *"
                    variant="standard"
                  />
                )}
              />
              <Autocomplete
                {...defaultFacultiesProps}
                id="clear-on-escape"
                sx={{ marginBottom: "14px" }}
                clearOnEscape
                freeSolo
                onChange={(event, value: any) => setFacultyId(value?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Faculty *"
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

export default CreateDepartment;
