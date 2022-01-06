import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { IAuth } from "../models/IAuth.interface";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { ISignup } from "../models/ISignup.interface";
import axios from "../../../core/api/axios";
import { AuthEndpoints } from "../../../core/api/endpoints";
import { AxiosError } from "axios";

// Importing Material Ui Components  - Mudasir Nizamani
import { Typography } from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

// Validation Schema for Form
// This Schema is used for every Signup Form - Mudasir Nizamani
const validationSchema = yup.object().shape({
  fullName: yup.string().required("FullName is required").min(3).max(40),
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required").min(6).max(30),
  confirmPassword: yup
    .string()
    .required("ConfirmPassword is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function Admin() {
  const [isLoading, setLoading] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: yupResolver(validationSchema),
  });

  const Submit: SubmitHandler<IAuth> = async (formData: IAuth) => {
    setLoading(true);
    const model: ISignup = {
      email: formData.email,
      fullName: formData.fullName,
      profilePic: "/assets/images/users-default-profile-pic.jpg",
      password: formData.confirmPassword,
      role: "Admin",
    };
    await axios
      .post(AuthEndpoints.Signup, model)
      .then((res) => {
        setLoading(false);
        navigate("/", { replace: true });
        enqueueSnackbar("Account is successfully created", {
          variant: "success",
        });
      })
      .catch((err: AxiosError) => {
        console.log(err.response?.data);
        if (err.response?.data.code === "InvalidRole") {
          setLoading(false);
          return enqueueSnackbar(err.response.data.error, {
            variant: "warning",
          });
        } else if (err.response?.data.error[0].code === "DuplicateUserName") {
          setLoading(false);
          return enqueueSnackbar("Email address already exists", {
            variant: "error",
          });
        } else if (err.response?.data.error[0].code === "DuplicateEmail") {
          setLoading(false);
          return enqueueSnackbar("Email address already exists", {
            variant: "error",
          });
        } else if (err.response?.data.code === "UserError") {
          setLoading(false);
          return enqueueSnackbar("Server Error, Plz try later", {
            variant: "error",
          });
        } else if (err.response?.data.code === "ServerError") {
          setLoading(false);
          return enqueueSnackbar("Server Error, Plz try later", {
            variant: "error",
          });
        }
      });
  };

  return (
    <div className="entry__wrap">
      <Typography component="div" variant="h2" className="entry__title">
        Admin Sign Up
      </Typography>
      <div className="entry__info">
        Signup as admin and access the features, Enjoy our App :)
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
            name="fullName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="FullName"
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName?.message : ""}
                sx={{
                  marginBottom: "1.5rem",
                }}
                variant="outlined"
              />
            )}
          />

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
                  marginBottom: "1.5rem",
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
                  marginBottom: "1.5rem",
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Confirm Password"
                type="password"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword?.message : ""
                }
                sx={{
                  marginBottom: "1.5rem",
                }}
                variant="outlined"
              />
            )}
          />
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
          startIcon={<PersonAddRoundedIcon />}
        >
          Submit
        </LoadingButton>
      </Box>
      <div className="entry__bottom">
        <Link to="/" className="entry__link">
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}

export default Admin;
