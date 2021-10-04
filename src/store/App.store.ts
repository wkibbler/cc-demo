import {createContext, useContext} from "react"
import {action, computed, observable} from "mobx"
import routes, {AppRouteInterface, NamedRoutes} from "../App.routes";
import Colors from "../DSL/Colors";

export enum AppTheme {
    light = "light",
    dark = "dark"
}

export class AppStoreClass {

    theme: AppTheme = AppTheme.light;

    constructor() {

    }

    init() {
        let nav = [
            NamedRoutes.DSL,
        ];
        //@ts-ignore
        this.mainNavigation = nav.map((routeName) => (routes.find(route => route.name === routeName)));

        //@ts-ignore
        document.body.classList.add(Colors.theme[this.theme]);


    }
}


export const AppStoreContext = createContext<AppStoreClass>({} as AppStoreClass);
export const AppStoreProvider = AppStoreContext.Provider;
export const useAppStore = (): AppStoreClass => useContext(AppStoreContext);
export const AppStore = new AppStoreClass();