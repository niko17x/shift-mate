import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SchedulerPage from "./pages/SchedulerPage.jsx";
import ErrorFallback from "./components/errors/ErrorFallback.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ProfilePage from "./pages/ProfilePage.jsx";
import UserProvider from "./context/UserContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/scheduler" element={<SchedulerPage />} />
      <Route path="/profile/:id" element={<ProfilePage />} />
    </Route>
  )
);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UserProvider>
          <RouterProvider router={router} />
          <ToastContainer autoClose={1500} position="top-center" />
        </UserProvider>
      </ErrorBoundary>
    </React.StrictMode>

    // <div>
    //   <UserProvider>
    //     <RouterProvider router={router} />
    //     <ToastContainer autoClose={1500} />
    //   </UserProvider>
    // </div>
  );
}
