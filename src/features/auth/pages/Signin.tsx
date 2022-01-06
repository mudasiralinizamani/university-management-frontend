import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import axios from "../../../core/api/axios";
import { AuthEndpoints } from "../../../core/api/endpoints";
import { AxiosError } from "axios";
import { ISignin } from "../models/ISignin.interface";

// Importing Material Ui Components  - Mudasir Nizamani
import { Typography } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { IUser } from "../../../core/models/IUser.interface";

// Validation Schema for Form
// This Schema is used for every Signin Form - Mudasir Nizamani
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email address is required")
    .email("Enter a valid email address"),
  password: yup.string().required("Password is required"),
});

function Signin() {
  const [isLoading, setLoading] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignin>({
    resolver: yupResolver(validationSchema),
  });

  const Submit: SubmitHandler<ISignin> = async (formData: ISignin) => {
    setLoading(true);
    const model: ISignin = {
      email: formData.email,
      password: formData.password,
    };
    await axios
      .post<IUser>(AuthEndpoints.Signin, model)
      .then((res) => {
        setLoading(false);
        if (res.data.role === "Admin") {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("role", res.data.role);
          navigate("/admin", { replace: true });
          return enqueueSnackbar(`Welcome in Admin Dashboard`, {
            variant: "info",
          });
        } else if (res.data.role === "Dean") {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("role", res.data.role);
          navigate("/dean", { replace: true });
          return enqueueSnackbar(`Welcome in Dean Dashboard`, {
            variant: "info",
          });
        }
      })
      .catch((err: AxiosError) => {
        if (err.response?.data.code === "UserNotFound") {
          setLoading(false);
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        } else if (err.response?.data.code === "IncorrectPassword") {
          setLoading(false);
          return enqueueSnackbar(err.response.data.error, { variant: "error" });
        }
      });
  };
  return (
    <div className="entry__wrap">
      <Typography component="div" variant="h2" className="entry__title">
        Sign In
      </Typography>
      <div className="entry__info">
        Sign in if you have an account in here
      </div>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(Submit)}
        autoComplete="off"
        className="entry__form"
      >
        <div className="entry__group">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
                sx={{
                  marginBottom: "1rem",
                  borderRadius: "20px",
                }}
                variant="outlined"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
                sx={{
                  marginBottom: "1rem",
                  borderRadius: "20px",
                }}
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="entry__line">
          <a className="entry__link" href="#">
            Forgot Password
          </a>
        </div>
        <LoadingButton
          sx={{
            borderRadius: "8px",
            padding: "10px 5px",
          }}
          variant="contained"
          type="submit"
          loading={isLoading}
          fullWidth
          disableElevation
          startIcon={<LoginRoundedIcon />}
        >
          Signin
        </LoadingButton>
      </Box>
      <div className="entry__bottom">
        <Link to="auth/signup" className="entry__link">
          Dont have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Signin;
