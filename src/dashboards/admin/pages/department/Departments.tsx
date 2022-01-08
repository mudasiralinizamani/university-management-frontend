import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";

// Importing Material Ui Components
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import { DepartmentEndpoints } from "../../../../core/api/endpoints";

function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<IDepartment[]>();

  useEffect(() => {
    const getDepartments = async () => {
      await axios
        .get<IDepartment[]>(DepartmentEndpoints.GetDepartments)
        .then((res) => setDepartments(res.data))
        .catch((err: AxiosError) => {});
    };
    getDepartments();
    return () => setDepartments([]);
  }, []);

  console.log(departments);

  // Grid Data
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "hodName",
      headerName: "Hod",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          {params.row.hodName}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => navigate(`/admin/users/${params.row.hodId}`)}
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
      field: "facultyName",
      headerName: "Faculty",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          {params.row.facultyName}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => navigate(`/admin/faculties/${params.row.facultyId}`)}
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
            onClick={() => navigate(`/admin/departments/${params.row.id}`)}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
  ];

  const rows: GridRowsProp = departments!;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title" style={{ fontSize: "18px" }}>
            <Link to="/admin/departments/create">Create Department</Link>
          </h1>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </>
  );
}

export default Departments;
