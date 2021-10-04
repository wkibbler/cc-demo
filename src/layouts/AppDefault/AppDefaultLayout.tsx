import React from "react";
import {NavLink} from "react-router-dom";
import Container from '../../DSL/Container/Container';
import {css} from '../../helpers/css';
import Colors from '../../DSL/Colors';
import Typography, {TType} from '../../DSL/Typography/Typography';

const AppDefaultLayout = (props: any) => {
    //const store = useGlobalStore();
    return (
        <Container fluid>
            <Container>
                {props.children}
            </Container>
        </Container>
    );
};
export default AppDefaultLayout;