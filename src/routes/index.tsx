import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import AddTour from "@/pages/Admin/AddTour";
import Analytics from "@/pages/Admin/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/User/Bookings";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";

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
        children: [
            {
                path: 'booking',
                Component: Bookings
            }
        ]
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