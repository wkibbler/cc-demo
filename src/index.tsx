import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
//import * as serviceWorker from "./serviceWorker";
import Colors from './DSL/Colors';
import ThemeProvider from './DSL/ThemeProvider/ThemeProvider';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider prefixes={Colors.theme.light}>
            <App/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

//serviceWorker.unregister();