import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/header/Header";
import AdminHomePage from "./pages/AdminHomePage";
// import HomePage from "./pages/HomePage";
// import PrivateRoute from './routes/PrivateRoute';
// import PrivateRoute from './routes/PrivateRoute';
// const PrivateRoute = ({ element: Element, allowedRoles, ...rest }) => {
//   const { isAuthenticated } = useAuth();
//   const role = localStorage.getItem('role');
//   // console.log("role from app", role);
//   // console.log("allowedRoles from app", allowedRoles);
//   return isAuthenticated ? (
//     <Element />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useAuth();

  console.log("isAuthenticated, role: userRole", isAuthenticated, userRole);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }

  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page if wrong role
  }

  return children || <Outlet />; // Render children or nested routes
};


// const App = () => (
//   <Routes>
//     <Route path="/login" element={<LoginPage />} />
//     {/* <PrivateRoute path="/dashboard" element={<DashboardPage />} /> */}
//     <Route path="/" element={<PrivateRoute />}>
//         <Route path="/dashboard" element={<HomePage />} />
//       </Route>
//   </Routes>
// );

// export default App;

const App = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* <Route path="/" element={<PrivateRoute allowedRoles={['user']} />}>
        <Route path="/homePage" element={HomePage} />
      </Route> */}
      <Route
            path="/homePage"
            element={
              <PrivateRoute role="user">
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-homePage"
            element={
              <PrivateRoute role="admin">
                <AdminHomePage />
              </PrivateRoute>
            }
          />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute
            // element={AdminDashboardPage}
            allowedRoles={["admin"]}
          />
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
