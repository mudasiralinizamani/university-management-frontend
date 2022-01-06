import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../blocks/dean/Sidebar";
import Topbar from "../../blocks/dean/Topbar";
import axios from "../api/axios";
import { UsersEndpoints } from "../api/endpoints";
import { IUser } from "../models/IUser.interface";

function DeanLayout() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    if (
      (localStorage.getItem("id") !== null &&
        localStorage.getItem("role") !== "Dean") ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("role") === null) ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("role") !== "Dean")
    ) {
      enqueueSnackbar("Not Authorized", { variant: "warning" });
      return navigate("/", { replace: true });
    }

    const getUser = async () => {
      await axios
        .get(`${UsersEndpoints.GetUser}${localStorage.getItem("id")}`)
        .then((res) => setUser(res.data))
        .catch((err: AxiosError) => {
          if (err.response?.data.code === "UserNotFound") {
            enqueueSnackbar("Plz signin again", { variant: "info" });
            navigate("/", { replace: true });
          }
        });
    };
    getUser();
    return () => setUser(null);
  }, []);
  return (
    <div className="out">
      <div className="page">
        <Topbar profilePic={user?.profilePic} />
        <div className="page__wrapper">
          <Sidebar
            email={user?.email}
            fullName={user?.fullName}
            profilePic={user?.profilePic}
            key={user?.id}
          />
          <div className="page__container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeanLayout;
