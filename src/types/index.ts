import { ComponentType } from "react";

export type { ISendOtp, ILogin, IVerifyOtp } from "./auth.type";

export type { ITourPackage } from "./tour.types"

export type { IDivision } from "./division.types"

export interface IResponse<T> {
    statusCode: number
    success: boolean
    message: string
    meta?: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: T
}

export interface ISidebarItem {
    title: string,
    items: {
        title: string,
        url: string,
        component: ComponentType;
    }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";