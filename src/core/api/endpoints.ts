const AuthEndpoints = {
  Signin: "/Auth/Signin",
  Signup: "/Auth/Signup",
};

const UsersEndpoints = {
  GetUsers: "/User/GetUsers",
  GetUser: "/User/GetUser/",
  GetDeans: "/User/GetUsersInRole/Dean",
};

const FacultyEndpoints = {
  GetFaculties: "/Faculty/GetFaculties",
  GetFaculty: "/Faculty/GetFaculty/",
  CreateFaculty: "/Faculty/Create"
};

const NotificationEndpoints = {};

export {
  AuthEndpoints,
  UsersEndpoints,
  FacultyEndpoints,
  NotificationEndpoints,
};
