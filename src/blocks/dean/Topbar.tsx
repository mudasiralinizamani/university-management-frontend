import { Link } from "react-router-dom";

interface properties {
  profilePic?: string;
}

function Topbar(props: properties) {
  const openMenu = () => {
    let sidebar = document.getElementById("js-sidebar");
    let html = document.getElementById("dom_html");
    let body = document.getElementById("dom_body");
    let bg = document.getElementById("js-header-bg");

    sidebar?.classList.add("visible");
    bg?.classList.add("show");
    html?.classList.add("no-scroll");
    body?.classList.add("no-scroll");
  };
  return (
    <div className="header js-header">
      <button onClick={openMenu} className="header__burger js-header-burger">
        <svg className="icon icon-burger">
          <use xlinkHref="/assets/square/img/sprite.svg#icon-burger"></use>
        </svg>
      </button>
      <a className="header__logo"></a>
      <div className="header__group">
        <Link className="header__notification" to="/dean/notifications">
          <svg className="icon icon-bell">
            <use xlinkHref="/assets/square/img/sprite.svg#icon-bell"></use>
          </svg>
        </Link>
        <a className="header__profile">
          <img className="header__pic" src={props.profilePic} alt="" />
        </a>
      </div>
      <div className="header__bg js-header-bg" id="js-header-bg"></div>
    </div>
  );
}

export default Topbar;
