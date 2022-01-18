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
  GetTeachers: "/User/GetUsersInRole/Teacher",
};

const FacultyEndpoints = {
  GetFaculties: "/Faculty/GetFaculties",
  GetFaculty: "/Faculty/GetFaculty/",
  CreateFaculty: "/Faculty/Create",
  GetDepartments: "/Department/GetFacultyDepartments/",
  UpdateDean: "/Faculty/UpdateDean",
  UpdateName: "/Faculty/UpdateName",
  Delete: "/Faculty/Delete/",
};

const NotificationEndpoints = {};

const DepartmentEndpoints = {
  GetDepartments: "/Department/GetDepartments",
  GetDepartment: "/Department/GetDepartment/",
  CreateDepartment: "/Department/Create",
};

const SubjectEndpoints = {
  GetSubjects: "/Subject/GetSubjects/",
  CreateSubject: "/Subject/Create/",
  GetSubject: "/Subject/GetSubjects/",
};

export {
  AuthEndpoints,
  UsersEndpoints,
  FacultyEndpoints,
  NotificationEndpoints,
  DepartmentEndpoints,
  SubjectEndpoints,
};
