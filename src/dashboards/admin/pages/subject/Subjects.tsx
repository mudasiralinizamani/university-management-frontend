import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";
import { SubjectEndpoints } from "../../../../core/api/endpoints";
import { ISubject } from "../../../../core/models/ISubject.interface";

// Importing Material Ui Components
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Subjects() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<ISubject[]>();

  useEffect(() => {
    const getSubjects = async () =>
      await axios
        .get<ISubject[]>(SubjectEndpoints.GetSubjects)
        .then((res) => setSubjects(res.data))
        .catch((err: AxiosError) => {});
    getSubjects();
    return () => setSubjects([]);
  }, []);

  // Grid Data
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 210 },
    {
      field: "teacherName",
      headerName: "Teacher",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          {params.row.teacherName}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => navigate(`/admin/users/${params.row.teacherId}`)}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
    {
      field: "courseAdviserName",
      headerName: "Course Adviser",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          {params.row.courseAdviserName}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() =>
              navigate(`/admin/users/${params.row.courseAdviserId}`)
            }
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
    {
      field: "departmentName",
      headerName: "Department",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          {params.row.departmentName}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() =>
              navigate(`/admin/departments/${params.row.departmentId}`)
            }
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => navigate(`/admin/subjects/${params.row.id}`)}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
  ];

  console.log(subjects);
  const rows: GridRowsProp = subjects!;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title" style={{ fontSize: "18px" }}>
            <Link to="/admin/subjects/create">Create Subject</Link>
          </h1>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </>
  );
}

export default Subjects;
