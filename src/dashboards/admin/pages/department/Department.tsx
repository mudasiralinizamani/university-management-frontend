import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../../core/api/axios";
import "../.../../../../../assets/scss/dashboards/admin/Faculty.scss";

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

function Department() {
  const navigate = useNavigate();
  const [department, setDepartment] = useState<IDepartment | null>();
  const [departmentFound, setDepartmentFound] = useState<boolean>(false);
  const { department_id } = useParams();

  useEffect(() => {
    const getDepartment = async () =>
      axios
        .get<IDepartment>(DepartmentEndpoints.GetDepartment + department_id)
        .then((res) => {
          setDepartment(res.data);
          setDepartmentFound(true);
        })
        .catch((err: AxiosError) => {
          setDepartment(null);
        });
    getDepartment();
    return () => {
      setDepartment(null);
      setDepartmentFound(false);
    };
  }, []);

  return <div>Single Department</div>;
}

export default Department;
