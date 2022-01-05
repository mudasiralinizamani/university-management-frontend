import { Outlet } from "react-router-dom";

function AuthLayout() {
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
