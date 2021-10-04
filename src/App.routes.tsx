import {generatePath} from "react-router";
import React, {ReactNode} from "react";
import { useHistory } from "react-router-dom";
import AppDefaultLayout from "./layouts/AppDefault/AppDefaultLayout";
import DSLPage from "./pages/dsl/dsl.page";
import {ItsA_R_e_a_c_t_Component} from "./helpers/interfaces";
import HomePage from './pages/Home/Home'

export enum NamedRoutes {
    HOME = "home",
    DSL = "dsl"
}

export interface AppRouteInterface {
    path: string;
    exact: boolean;
    label?: string;
    name?: NamedRoutes;
    layout: ItsA_R_e_a_c_t_Component;
    component: ItsA_R_e_a_c_t_Component
    guest?: boolean;
}

export const route = (name: NamedRoutes, params: any = {}) => {
    const route = routes.find(item => item.name === name);
    if (!route) {
        throw new TypeError("Unknown named route: " + name);
    }
    console.log("Generating path", name, params);
    if (params) {
        return generatePath(route.path, params);
    } else {
        return route.path
    }
};
export const redirect = (history: any, name: NamedRoutes, params: any = {}, search: { [key: string]: string } = {}) => {
    return history.push({
        pathname: route(name, params),
        search: (new URLSearchParams(search)).toString()
    });
};

export function getQueryParams(history: ReturnType<typeof useHistory>) {
    return new URLSearchParams(history.location.search);
}

export function getQueryParam(history: ReturnType<typeof useHistory>, key: string) {
    return getQueryParams(history).get(key);
}

export function setQueryParam(history: ReturnType<typeof useHistory>, key: string, val: string | undefined) {

    let searchParams = getQueryParams(history);
    if (val === undefined) {
        searchParams.delete(key);
    } else {
        searchParams.set(key, val);
    }
    history.push({
        pathname: history.location.pathname,
        search: searchParams.toString()
    });
}


const routes: AppRouteInterface[] = [
    {
        path: "/",
        name: NamedRoutes.HOME,
        label: "HOME",
        exact: true,
        layout: AppDefaultLayout,
        component: HomePage
    }
];
export default routes;