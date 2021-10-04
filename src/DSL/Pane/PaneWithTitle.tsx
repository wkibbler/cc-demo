import React from "react";
import {css} from "../../helpers/css";
import Colors from "../Colors";
import Typography, {TType} from "../Typography/Typography";
import Pane from "./Pane";
import {ItsA_R_e_a_c_t_Component} from "../../helpers/interfaces";
import styles from './Pane.module.scss';

export interface PaneWithTitleProps {
    title: string;
    titleAppendix?: string;
    rightCol?: ItsA_R_e_a_c_t_Component;
    children?: ItsA_R_e_a_c_t_Component;
}

const PaneWithTitle = ({title, titleAppendix, children, rightCol, ...rest}: PaneWithTitleProps) => {
    const flex = true;
    return <Pane
        size="md"
        className={css(Colors.bg.pane, Colors.color.defaultText, styles['pane-shadow'], "mb-gutter", "w-full", {
            "d-flex": flex,
            "flex-column": flex,
        })}>
        <div className={css("mb-3", "d-flex", "justify-content-between")}>
            <Typography size={20} type={TType.BodyBold}>
                {title}
                {titleAppendix && <span className={Colors.color.secondaryText}>&nbsp;{titleAppendix}</span>}
            </Typography>
            {rightCol}
        </div>
        {children}
    </Pane>
}
export default PaneWithTitle;