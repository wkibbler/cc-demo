import React from "react";
import classNames from "classnames";
import styles from './Modal.module.scss';
import {css} from '../../helpers/css';
import Typography, {TType} from '../../DSL/Typography/Typography';
import observeMobx from '../../observeMobx';
import {useAppStore} from '../../store/App.store';
import Colors from '../../DSL/Colors';
import Modal from 'react-modal';
import Pane from '../Pane/Pane';
import LineSeparator from '../LineSeparator/LineSeparator';
import {ItsA_R_e_a_c_t_Component} from '../../helpers/interfaces';

export interface ModalProps {
    visible: boolean,
    setVisible: (status: boolean) => void,
    title: string,
    children?: any,
    footer?: ItsA_R_e_a_c_t_Component
}

const DslModal = observeMobx((props: ModalProps) => {
    const app = useAppStore();
    return props.visible ? (
        <div onClick={() => props.setVisible(false)} className={css(styles['overlay'], 'd-flex', 'align-items-center', 'justify-content-center')}>
            <Pane onClick={(e: any) => e.stopPropagation()} className={css(Colors.bg.pane, styles['content'], 'px-3')} style={{width: '80%'}}>
                <div className={css('d-flex', 'align-items-center', 'w-full', 'justify-content-between')}>
                    <div className={css('d-flex', 'align-items-center')}>
                        <Typography type={TType.HeaderBold} size={28}>
                            {props.title}
                        </Typography>
                    </div>
                    <div onClick={() => props.setVisible(false)} className={css(styles['close'])}>
                        <Typography type={TType.HeaderBold}size={28}>
                            CLOSE
                        </Typography>
                    </div>
                </div>
                <LineSeparator/>
                {props.children}
                {props.footer && (
                    <>
                        <LineSeparator/>
                        <div className={css('py-1')}>
                            <props.footer/>
                        </div>
                    </>
                )}
            </Pane>
        </div>
    ) : null
})

export default DslModal;