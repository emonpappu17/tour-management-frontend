import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import { TRole } from "@/types";
import Tours from "@/pages/Tours";
import TourDetails from "@/pages/TourDetails";
import Booking from "@/pages/Booking";
import Homepage from "@/pages/Homepage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                Component: Homepage,
                index: true,
            },
            {
                path: 'about',
                Component: About
            },

            {
                path: 'tours',
                Component: Tours
            },

            {
                path: 'tours/:id',
                Component: TourDetails
            },
            {
                path: 'booking/:id',
                Component: Booking
            },
        ]
    },
    {
        path: "/admin",
        Component: withAuth(DashboardLayout, role.superAdmin as TRole),
        children: [
            { index: true, element: <Navigate to={"/admin/analytics"} /> },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        path: "/user",
        Component: withAuth(DashboardLayout, role.user as TRole),
        children: [
            { index: true, element: <Navigate to={"/user/bookings"} /> },
            ...generateRoutes(userSidebarItems)]
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
    },
    {
        Component: Unauthorized,
        path: "/unauthorized"
    }
])