import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { lazy } from "react";
import SuspenseWithLoader from "./components/shared/SuspenseComponent";

// Lazy-loaded components
const LoginPage = lazy(() => import("@/pages/auth/login"));
const SignupPage = lazy(() => import("@/pages/auth/signup"));
const StudentBooksDashboardPage = lazy(() => import("@/pages/Student/Books"));
const AccountsPage = lazy(() => import("@/pages/account"));
const NotFound = lazy(() => import("@/pages/404"));

function App() {


  // Route for authenticated users
  const AuthRoute = () => {
    // Checking if there's a token in sessionStorage
    const token = sessionStorage.getItem("token");
    if (token) {
      // If token exists, render the nested routes inside <Outlet />
      return <Outlet />;
    }
    // If no token, redirect to the login page
    return <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SuspenseWithLoader><LoginPage /></SuspenseWithLoader>} />
        <Route path="/auth/login" element={<SuspenseWithLoader><LoginPage /></SuspenseWithLoader>} />
        <Route path="/auth/signup" element={<SuspenseWithLoader><SignupPage /></SuspenseWithLoader>} />
        
        {/* Protected routes (require authentication) */}
        <Route element={<AuthRoute />}>
          <Route path="/student/books" element={<SuspenseWithLoader><StudentBooksDashboardPage /></SuspenseWithLoader>} />
          <Route path="/account" element={<SuspenseWithLoader><AccountsPage /></SuspenseWithLoader>} />
        </Route>
        
        {/* 404 route */}
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
