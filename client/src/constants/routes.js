import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Leaderboard from '../components/ViewPool/Leaderboard';
import PoolCreate from '../components/CreatePool/PoolCreate';
import SignIn from '../components/App/SignIn';
import ViewPool from '../components/ViewPool/ViewPool';
import EditScores from '../components/Admin/EditScores';
import GameOdds from '../components/Betslip/GameOdds';
import Register from '../components/Register/Register';
import ForgotPassword from '../components/Register/ForgotPassword';

const AUTH_ROUTES = [
    { path: '/', key: 'ROOT', exact: true, component: Dashboard },
    { path: '/create-pool', key: 'CREATE_POOL', exact: true, component: PoolCreate },
    { path: '/pools/:poolId/schedule', key: 'GAME_ODDS', component: GameOdds },
    { path: '/pools/:poolId/leaderboard', key: 'LEADERBOARD', component: Leaderboard },
    { path: '/pools/:poolId', key: 'VIEW_POOL', component: ViewPool },
    { path: '/admin/scores/:poolId', key: 'EDIT_SCORES', component: EditScores },
];

const UNAUTH_ROUTES = [
    { path: '/', key: 'ROOT', exact: true, component: SignIn },
    { path: '/sign-up', key: 'REGISTER', exact: true, component: Register },
    { path: '/sign-in', key: 'SIGN_IN', exact: true, component: SignIn },
    { path: '/forgot-password', key: 'FORGOT_PASSWORD', exact: true, component: ForgotPassword },
];

export { AUTH_ROUTES, UNAUTH_ROUTES };

function RouteWithSubRoutes(route) {
    return (
        <Route 
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes} />}
        />
    );
}

export function RenderRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route) => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
        </Switch>
    );
}
