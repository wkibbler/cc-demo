import classNames from "classnames";
import React, {ReactNode} from "react";
import PropTypes from "prop-types";
// import {keys} from "ts-transformer-keys";
import {BsPrefixComponent} from "../tshelpers";
import {useBootstrapPrefix} from "../ThemeProvider/ThemeProvider";
import {ItsA_R_e_a_c_t_Component} from "../../helpers/interfaces";

type NumberAttr =
    | number
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12';
type ColSize = true | 'auto' | NumberAttr;
type ColSpec =
    | ColSize
    | { span?: ColSize; offset?: NumberAttr; order?: NumberAttr };

interface ColPropsSizes {
    xs?: ColSpec;
    sm?: ColSpec;
    md?: ColSpec;
    lg?: ColSpec;
    xl?: ColSpec;
    xxl?: ColSpec;
}

// const DEVICE_SIZES = keys<ColPropsSizes>();
const DEVICE_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export interface ColProps extends ColPropsSizes {
    bsPrefix?: string;
    children?: ItsA_R_e_a_c_t_Component,
    className?: any;
    // as?: string;
}

const Col = React.forwardRef<HTMLDivElement, ColProps>(
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    ({bsPrefix, className, ...props}: ColProps, ref) => {
        const prefix = useBootstrapPrefix(bsPrefix, 'col');
        const spans = [];
        const classes: string[] = [];

        DEVICE_SIZES.forEach((brkPoint: any) => {
            //@ts-ignore
            let propValue = props[brkPoint];
            //@ts-ignore
            delete props[brkPoint];

            let span, offset, order;
            if (propValue != null && typeof propValue === 'object') {
                ({span = true, offset, order} = propValue);
            } else {
                span = propValue;
            }

            let infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';

            if (span != null)
                spans.push(
                    span === true ? `${prefix}${infix}` : `${prefix}${infix}-${span}`,
                );

            if (order != null) classes.push(`order${infix}-${order}`);
            if (offset != null) classes.push(`offset${infix}-${offset}`);
        });

        if (!spans.length) {
            spans.push(prefix); // plain 'col'
        }

        //@ts-ignore
        props.ref = ref;
        //@ts-ignore
        props.className = classNames(className, ...spans, ...classes);
        return (
            <div {...props}/>
        );
    },
);

export default Col;