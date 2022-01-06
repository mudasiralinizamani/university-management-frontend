import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("role") === "Admin"
    ) {
      return navigate("/admin");
    } else if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("role") === "Dean"
    ) {
      return navigate("/dean");
    }
  }, []);

  return (
    <div className="out">
      <div className="page">
        <div className="page__wrapper">
          <div className="entry">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
