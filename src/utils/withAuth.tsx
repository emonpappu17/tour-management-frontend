import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { TRole } from "@/types";
import { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requireRole?: TRole) => {
    return function AuthWrapper() {
        const { data, isLoading } = useUserInfoQuery(undefined);

        if (!isLoading && !data?.data?.email) {
            return <Navigate to={"/login"} />
        }

        if (requireRole && !isLoading && (requireRole !== data?.data?.role)) {
            return <Navigate to={"/unauthorized"}></Navigate>
        }

        return <Component />
    }
}