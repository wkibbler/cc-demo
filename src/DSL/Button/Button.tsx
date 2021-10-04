import React from "react";
import classNames from "classnames";
import Typography, {TType} from "../Typography/Typography";
import styles from "./Button.module.scss";
import Colors from '../Colors';

export type ButtonSize =  'sm' | 'md' | 'lg';

export interface ButtonProps {
    size?: ButtonSize;
    secondary?: boolean;
    disabled?: boolean;
    children?: any;
    // icon?: IconName;
    // iconRight?: IconName;
    onClick?: any;
    className?: any;
    ref?: any
    block?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef(({
        children,
        block,
        className,
        size = "sm",
        secondary = false,
        disabled = false,
        loading = false,
        ...rest
    }: ButtonProps, ref) => {
    let fontSize = 20;
    switch (size) {
        case "sm":
            fontSize = 10;
            break;
        case "md":
            fontSize = 15;
            break;
        case "lg":
            fontSize = 20;
            break;
    }
    return <button
        ref={ref}
        disabled={disabled}
        {...rest}
        style={{
            opacity: (disabled || loading) ? 0.5 : undefined
        }}
        className={classNames('align-items-center', 'justify-content-center', styles['button'], className, {
            [Colors.bg.action]: !secondary,
            [Colors.bg.secondary]: secondary,
            [Colors.color.white]: !secondary,
            [Colors.color.action]: secondary,
            'd-inline-flex': !block,
            'd-flex': block,
            'w-full': block,
        })}>
        <div className={classNames(styles['loading'], !loading && styles['hide-loading'])}/>
        <Typography type={TType.BodyRegular} size={fontSize}>
            {children}
        </Typography>
    </button>
});
export default Button;