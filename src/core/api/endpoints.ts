const AuthEndpoints = {
  Signin: "/Auth/Signin",
  Signup: "/Auth/Signup",
};

const UsersEndpoints = {
  GetUsers: "/User/GetUsers",
  GetUser: "/User/GetUser/",
  GetDeans: "/User/GetUsersInRole/Dean",
  GetHods: "/User/GetUsersInRole/Hod",
  GetCourseAdvisers: "/User/GetUsersInRole/CourseAdviser",
};

const FacultyEndpoints = {
  GetFaculties: "/Faculty/GetFaculties",
  GetFaculty: "/Faculty/GetFaculty/",
  CreateFaculty: "/Faculty/Create",
};

const NotificationEndpoints = {};

const DepartmentEndpoints = {
  GetDepartments: "/Department/GetDepartments",
  GetDepartment: "/Department/GetDepartment/",
  CreateDepartment: "/Department/Create",
};

export {
  AuthEndpoints,
  UsersEndpoints,
  FacultyEndpoints,
  NotificationEndpoints,
  DepartmentEndpoints,
};
