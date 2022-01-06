function signout() {
  localStorage.removeItem("id");
  localStorage.removeItem("role");
  localStorage.clear();
}

export default signout;
