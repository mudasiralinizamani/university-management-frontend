import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../../core/api/axios";
import { FacultyEndpoints } from "../../../../core/api/endpoints";
import { IFaculty } from "../../../../core/models/IFaculty.interface";

// Importing Material Ui Components
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

function Faculties() {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState<IFaculty[]>();

  useEffect(() => {
    const getFaculties = async () => {
      await axios
        .get<IFaculty[]>(FacultyEndpoints.GetFaculties)
        .then((res) => {
          setFaculties(res.data);
        })
        .catch((err: AxiosError) => {});
    };
    getFaculties();
    return () => setFaculties([]);
  }, []);

  // Grid Data
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "deanName",
      headerName: "Dean",
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          {params.row.deanName}
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => navigate(`/admin/users/${params.row.deanId}`)}
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
            onClick={() => navigate(`/admin/faculties/${params.row.id}`)}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </strong>
      ),
    },
  ];

  const rows: GridRowsProp = faculties!;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title" style={{ fontSize: "18px" }}>
            <Link to="/admin/faculties/create">Create Faculty</Link>
          </h1>
        </div>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} disableSelectionOnClick />
        </div>
      </div>
    </>
  );
}

export default Faculties;
