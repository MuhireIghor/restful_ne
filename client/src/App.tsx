import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { lazy } from "react";
import { useAuth } from "./contexts/AuthProvider";
import AccountIndex from "./pages/account";
import SuspenseWithLoader from "./components/shared/SuspenseComponent";
const LoginPage = lazy(() => import("@/pages/auth/login"))
const SignupPage = lazy(() => import("@/pages/auth/signup"));
const StudentBooksDashboardPage = lazy(() => import("@/pages/Student/Books"));
// const LaptopDashboardPage = lazy(() => import("@/pages/admin/laptops"))
// const EmployeeDashboardPage = lazy(() => import("@/pages/admin/Employees"))
const AccountsPage = lazy(() => import("@/pages/account"));
const NotFound = lazy(() => import("@/pages/404"));

function App() {
  const { user } = useAuth();

  const AuthRoute = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuspenseWithLoader><LoginPage /></SuspenseWithLoader>} />
        <Route path="/auth/login" element={<SuspenseWithLoader><LoginPage /></SuspenseWithLoader>} />
        <Route path="/auth/signup" element={<SuspenseWithLoader><SignupPage /></SuspenseWithLoader>} />
        <Route element={<AuthRoute />}>
          {/* <Route path="/admin/laptops" element={<SuspenseWithLoader><LaptopDashboardPage /></SuspenseWithLoader>} />
          <Route path="/admin/employees" element={<SuspenseWithLoader><EmployeeDashboardPage /></SuspenseWithLoader>} /> */}
          <Route path="/student/books" element={<SuspenseWithLoader><StudentBooksDashboardPage /></SuspenseWithLoader>} />

          <Route path="/account" element={<SuspenseWithLoader><AccountsPage /></SuspenseWithLoader>} />
        </Route>
        <Route
          path="*"
          element={
            <SuspenseWithLoader>
              <NotFound />
            </SuspenseWithLoader>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
