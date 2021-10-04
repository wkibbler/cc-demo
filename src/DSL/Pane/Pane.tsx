
import React, {CSSProperties} from "react";
import styles from "./Pane.module.scss";
import cxBinder from "classnames/bind";
import classNames from "classnames";

const cx = cxBinder.bind(styles);

export interface PaneProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
    children?: any;
    className?: any;
    onClick?: any;
    noPadding?: boolean
    style?: CSSProperties;
    id?: string;
    noShadow?: boolean
}

const Pane = React.forwardRef((props: PaneProps, ref: any) => {
    const {size, children, className, noPadding, ...other} = props;
    return <div
        {...other}
        ref={ref}
        className={cx(['pane', `pane-${size ? size : 'sm'}`]) + ' ' + classNames(className, {[styles['no-padding']]: noPadding})}>{children}</div>
});
export default Pane;