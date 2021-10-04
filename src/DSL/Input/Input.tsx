  
import React from "react";
import {Form} from 'react-bootstrap';
import css from 'classnames';
import styles from './Input.module.scss';
import Colors from '../Colors';

export interface InputProps {
    placeholder: string,
    value: string,
    onChange: any,
    type?: 'text' | 'password' | 'number',
    className?: any,
    style?: any,
    as?: 'select',
    children?: any,
    noCapitalization?: boolean,
    size?: 'sm' | 'md' | 'lg'
}

const Input = (props: InputProps) => {
    let fontSize = 15;
    if (props.size === 'md') fontSize = 20;
    else if (props.size === 'lg') fontSize = 22;
    return <Form.Control
        placeholder={props.placeholder}
        value={props.value}
        onChange={x => props.onChange(x.target.value)}
        className={css(props.className, styles['input'], Colors.bg.content, 'px-2', Colors.color.secondaryText, 'py-2')}
        type={props.type || 'text'}
        style={{fontSize, fontWeight: 250}}
        as={props.as}
        autoCapitalize={props.noCapitalization ? 'off' : undefined}
    />
}

export default Input;