import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "../../assets/scss/blocks/Sidebar.scss";

// Material Icons - Mudasir Nizamani
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import signout from "../../core/services/signout";

interface properties {
  fullName?: string;
  email?: string;
  profilePic?: string;
}

function Sidebar(props: properties) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const closeMenu = () => {
    let sidebar = document.getElementById("js-sidebar");
    let html = document.getElementById("dom_html");
    let body = document.getElementById("dom_body");
    let bg = document.getElementById("js-header-bg");

    sidebar?.classList.remove("visible");
    bg?.classList.remove("show");
    html?.classList.remove("no-scroll");
    body?.classList.remove("no-scroll");
  };

  const onSignout = () => {
    signout();
    enqueueSnackbar("You are successfully signed out", { variant: "info" });
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar js-sidebar" id="js-sidebar">
      <div className="sidebar__top">
        <button className="sidebar__close js-sidebar-close" onClick={closeMenu}>
          <svg className="icon icon-close">
            <use xlinkHref="/assets/square/img/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <a className="sidebar__logo"></a>
      </div>
      <div className="sidebar__wrapper">
        <Link to="/admin/profile">
          <a className="sidebar2__profile">
            <div className="ava">
              <img
                className="ava__pic"
                src={props.profilePic}
                alt={props.fullName}
              />
            </div>
            <div className="sidebar2__details">
              <div className="sidebar2__user">{props.fullName}</div>
              <div className="sidebar2__login">{props.email}</div>
            </div>
          </a>
        </Link>
        <div className="sidebar__menu">
          <div className="sidebar2__category">Dashboard</div>
          <Link
            to="/admin"
            className={`sidebar__item ${
              location.pathname == "/admin" ? "active" : ""
            }`}
          >
            <svg className="icon icon-dashboard">
              <use
                className="svg-icon"
                xlinkHref="/assets/square/img/sprite.svg#icon-dashboard"
              ></use>
            </svg>
            <div className="sidebar__item__text">Dashboard</div>
          </Link>
          {/* Account links Section */}
          <div className="sidebar2__category">Account</div>
          <a className="sidebar__item" onClick={onSignout}>
            <LogoutOutlinedIcon className="icon" />
            <div className="sidebar__item__text">Sign Out</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
