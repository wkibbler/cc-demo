import React, {ComponentClass} from "react";
import {Route} from "react-router-dom";
import {ItsA_R_e_a_c_t_Component} from "../helpers/interfaces";

export interface AppRouteProps {
    component: ItsA_R_e_a_c_t_Component;
    layout: ItsA_R_e_a_c_t_Component;
    exact?: boolean
    path?: string;
    guest?: any
}

/**
 * AppRoute
 *
 * Description:
 * AppRoute is introduced to enable route guards(ie loggedin/guest).
 * Right now there are no guards implemented
 *
 */
const AppRoute = ({component: Component, layout: Layout, ...rest}: AppRouteProps) => {
    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )}/>;

};
export default AppRoute;