import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import GameOdds from '../components/betslip/GameOdds';
import Dashboard from '../components/Dashboard';
// import Leaderboard from '../components/view-pool/Leaderboard';
import PoolCreate from '../components/PoolCreate';
import SignIn from '../components/SignIn';
import ViewPool from '../components/ViewPool/ViewPool';
import EditScores from '../components/admin/EditScores';

const ROUTES = [
    { path: '/', key: 'ROOT', exact: true, component: Dashboard },
    { path: '/sign-in', key: 'SIGN_IN', exact: true, component: SignIn },
    { path: '/create-pool', key: 'CREATE_POOL', exact: true, component: PoolCreate },
    // { path: '/pool', key: 'MY_POOLS', exact: true, component: MyPools },
    { path: '/pools/:poolId', key: 'VIEW_POOL', component: ViewPool },
    { path: '/admin', key: 'EDIT_SCORES', component: EditScores },
];

export default ROUTES;

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
