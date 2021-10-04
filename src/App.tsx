import React from "react";
import {Switch} from "react-router-dom";
import routes, {AppRouteInterface} from "./App.routes";
import AppRoute from "./common/AppRoute";
import './theme/bootstrap.scss';
import './theme/bootstrap-grid.scss';
import './DSL/Colors.scss';
//import './fonts/Trueno/Trueno.scss';
import {AppStore, AppStoreProvider} from "./store/App.store";
import 'mobx-react-lite/batchingForReactDom';
import {hot} from "react-hot-loader";

// You can add mobx spy to execute some callback on each event that happens in mobx
// Read more: https://doc.ebichu.cc/mobx/refguide/spy.html
// import {spy} from "mobx";
// spy(event => {
//     if (process.env.NODE_ENV !== "production") {
//
//     }
// });
AppStore.init();

function App() {
    return (
        <AppStoreProvider value={AppStore}>
            <Switch>
                {routes.map((config: AppRouteInterface) => (
                    <AppRoute exact={config.exact}
                              key={config.name}
                              path={config.path}
                              layout={config.layout}
                              component={config.component}
                              guest={config.guest}/>
                ))}
            </Switch>
        </AppStoreProvider>
    );
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App