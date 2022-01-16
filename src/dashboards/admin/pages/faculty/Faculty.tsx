import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../../core/api/axios";
import { FacultyEndpoints } from "../../../../core/api/endpoints";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import { IFaculty } from "../../../../core/models/IFaculty.interface";
import "../.../../../../../assets/scss/dashboards/admin/Faculty.scss";
import EditFaculty from "../../components/EditFaculty";

function Faculty() {
  const { faculty_id } = useParams();
  const [faculty, setFaculty] = useState<IFaculty | null>();
  const [departments, setDepartments] = useState<IDepartment[]>();
  const [facultyFound, setFacultyFound] = useState<boolean>(false);

  useEffect(() => {
    const getFaculty = async () =>
      axios
        .get<IFaculty>(`${FacultyEndpoints.GetFaculty}${faculty_id}`)
        .then((res) => {
          setFaculty(res.data);
          setFacultyFound(true);
        })
        .catch((err: AxiosError) => {
          setFaculty(null);
        });
    const getDepartments = async () =>
      axios
        .get<IDepartment[]>(`${FacultyEndpoints.GetDepartments}${faculty_id}`)
        .then((res) => setDepartments(res.data))
        .catch((err: AxiosError) => {
          setDepartments([]);
        });
    getFaculty();
    getDepartments();
    return () => {
      setFaculty(null);
      setDepartments([]);
      setFacultyFound(false);
    };
  }, []);

  return (
    <>
      <div className={`${facultyFound ? "display-none" : ""}`}>
        Faculty was not found
      </div>
      <div
        className={`page2__container ${!facultyFound ? "display-none" : ""}`}
      >
        <div className="page2__row">
          <div className="page2__col page2__col_w65">
            <div className="post__item">
              <EditFaculty
                deanId={faculty?.deanId!}
                facultyId={faculty?.id!}
                name={faculty?.name!}
              />
            </div>
          </div>
          {/* Col w35 START */}
          <div className="page2__col page2__col_w35">
            <div className="card1">
              <div className="card1__head">
                <div className="card1__category">Faculty Details</div>
              </div>
              <div className="card1__body">
                <div className="card1__list faculty_details_card">
                  <p>Name: </p>
                  <Link
                    className="card1__item"
                    to={`/admin/faculties/${faculty_id}`}
                  >
                    {faculty?.name}
                  </Link>
                </div>
                <div className="card1__list faculty_details_card">
                  <p>Dean: </p>
                  <Link
                    className="card1__item"
                    to={`/admin/users/${faculty?.deanId}`}
                  >
                    {faculty?.deanName}
                  </Link>
                </div>
              </div>
            </div>
            <div className="card1 margin-top-1">
              <div className="card1__head">
                <div className="card1__category">Faculty Departments</div>
              </div>
              <div className="card1__body">
                {departments?.map((department) => {
                  return (
                    <div className="card1__list faculty_details_card">
                      <Link
                        className="card1__item"
                        to={`/admin/departments/${faculty_id}`}
                      >
                        {department?.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* Col w_35 END */}
      </div>
    </>
  );
}

export default Faculty;
