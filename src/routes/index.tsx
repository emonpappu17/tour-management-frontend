import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: 'about',
                Component: About
            }
        ]
    },
    {
        path: "/admin",
        Component: DashboardLayout,
        children: [...generateRoutes(adminSidebarItems)]
    },
    {
        path: "/user",
        Component: DashboardLayout,
        children: [...generateRoutes(userSidebarItems)]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: Verify,
        path: "/verify"
    }
])