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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        index
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HomePage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/login"
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <LoginPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/register"
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RegisterPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/scheduler"
        element={
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SchedulerPage />
          </ErrorBoundary>
        }
      />
    </Route>
  )
);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      {/* Context providers go here */}
      <RouterProvider router={router} />
      <ToastContainer autoClose={1500} />
    </React.StrictMode>
  );
}
