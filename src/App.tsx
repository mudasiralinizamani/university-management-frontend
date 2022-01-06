import { SnackbarProvider } from "notistack";
import { createRef, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/scss/App.scss";

// Importing Material Ui Components
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";

// Importing Components
import Loading from "./shared/Loading";

// Importing Layouts
import AuthLayout from "./core/layouts/AuthLayout";
import AdminLayout from "./core/layouts/AdminLayout";
import DeanLayout from "./core/layouts/DeanLayout";

// Importing Auth Pages
const AuthSignin = lazy(() => import("./features/auth/pages/Signin"));
const AuthAdmin = lazy(() => import("./features/auth/pages/Admin"));
const AuthDean = lazy(() => import("./features/auth/pages/Dean"));

// Importing Admin Pages
const AdminIndex = lazy(() => import("./dashboards/admin/pages/admin"));

// Importing Dean Pages
const DeanIndex = lazy(() => import("./dashboards/dean/pages/Dean"));

function App() {
  const toastRef = createRef<any>();

  const closeToast = (key: any) => () => {
    toastRef.current.closeSnackbar(key);
  };
  return (
    <div className="App">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={5000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <AuthLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<AuthSignin />} />
          <Route path="auth/admin" element={<AuthAdmin />} />
          <Route path="auth/dean" element={<AuthDean />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={5000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <AdminLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<AdminIndex />} />
        </Route>

        {/* Dean Dashboard Routes */}
        <Route
          path="/dean"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={5000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <DeanLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<DeanIndex />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
