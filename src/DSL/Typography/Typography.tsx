import React from "react";
import styles from "./Typography.module.scss";
import {TypographyConfig} from "../config";
import classNames from "classnames";

export enum TType {
    HeaderBold = "HeaderBold",
    HeaderRegular = "HeaderRegular",
    HeaderLight = "HeaderLight",
    BodyBold = "BodyBold",
    BodyRegular = "BodyRegular",
    BodyLight = "BodyLight"
}

export interface TypographyProps {
    type: TType;
    children?: any;
    className?: string | string[];
    block?: boolean;
    size?: number
}

const Typography = (props: TypographyProps) => {
    let {className, type, block = false, ...other} = props;
    let Component = TypographyConfig.TTypes[props.type].tag;
    let style: any = {};
    style.fontSize = props.size;
    if (block) {
        Component = 'div';
    } else {
        style.display = 'inline-block';
    }
    // @ts-ignore
    return <Component className={classNames(styles[type],styles['typography'], className)}
                      style={style} {...other}>{props.children}</Component>
};
export default Typography;