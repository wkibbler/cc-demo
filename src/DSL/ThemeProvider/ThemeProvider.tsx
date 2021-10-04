
import PropTypes from "prop-types";
import forwardRef from "@restart/context/forwardRef";
import React, {useContext, useMemo} from "react";
import {ItsA_R_e_a_c_t_Component} from "../../helpers/interfaces";

const ThemeContext = React.createContext({});
const {Consumer, Provider} = ThemeContext;

const ThemeProvider = ({prefixes, children}: any) => {
    const copiedPrefixes = useMemo(() => ({...prefixes}), [prefixes]);

    return <Provider value={copiedPrefixes}>{children}</Provider>;
};

function useBootstrapPrefix(prefix: any, defaultPrefix: any) {
    const prefixes: any = useContext(ThemeContext);
    return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

function createBootstrapComponent(Component: ItsA_R_e_a_c_t_Component, opts: any) {
    if (typeof opts === 'string') opts = {prefix: opts};
    const isClassy = Component.prototype && Component.prototype.isReactComponent;
    // If it's a functional component make sure we don't break it with a ref
    const {prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef'} = opts;

    return forwardRef(
        ({...props}: any, ref) => {
            props[forwardRefAs] = ref;
            // eslint-disable-next-line react/prop-types
            const bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
            return <Component {...props} bsPrefix={bsPrefix}/>;
        },
        {displayName: `Bootstrap(${Component.displayName || Component.name})`},
    );
}

export {createBootstrapComponent, useBootstrapPrefix, Consumer as ThemeConsumer};
export default ThemeProvider;