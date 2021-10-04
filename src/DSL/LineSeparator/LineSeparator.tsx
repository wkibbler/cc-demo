import React from "react";
import classNames from "classnames";
import styles from './LineSeparator.module.scss';
import {css} from '../../helpers/css';
import Typography, {TType} from '../../DSL/Typography/Typography';
import observeMobx from '../../observeMobx';
import {useAppStore} from '../../store/App.store';
import Colors from '../../DSL/Colors';

export interface LineSeparatorProps {

}

const LineSeparator = (props: LineSeparatorProps) => {
    return <div className={css('w-full', styles['line'], 'mt-1', 'mb-1', Colors.bg.border)}/>
}
export default LineSeparator;