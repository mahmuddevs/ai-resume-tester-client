import { createBrowserRouter, redirect } from "react-router";
import Home from "../pages/root/home";
import Root from "../layouts/root";
import Auth from "../layouts/auth";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import AppLayout from "../layouts/app";
import About from "../pages/root/about";
import Dashboard from "../pages/dashboard/dashboard";
import DashboardLayout from "../layouts/dashboard";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: "/",
        Component: Root,
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "/about",
            Component: About,
          },
        ],
      },
      {
        path: "/auth",
        Component: Auth,

        children: [
          {
            index: true,
            loader: () => redirect("/auth/login"),
          },
          {
            path: "login",
            Component: Login,
          },
          {
            path: "register",
            Component: Register,
          },
        ],
      },
      {
        path: "/dashboard",
        Component: DashboardLayout,

        children: [
          {
            index: true,
            Component: Dashboard,
          }
        ],
      }
    ]
  }
])