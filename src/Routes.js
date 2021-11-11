import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const SignIn = lazy(() => import('./components/SignIn'));
const Services = lazy(() => import('./components/Services'));
const Foods = lazy(() => import('./components/Foods'));
const Medicines = lazy(() => import('./components/Medicines'));
const Register = lazy(() => import('./components/Register'));
const Documents = lazy(() => import('./components/Documents'));
const AdminPage = lazy(() => import('./components/AdminPage'));

const routes = {
    public: [
    {
        path: '/',
        component: SignIn,
        exact: true
    },
    {
        path: '/Home',
        component: SignIn,
        exact: true
    }
    ,
    {
        path: '/Services',
        component: Services,
        exact: true
    }
    ,
    {
        path: '/FoodsAndMedicines',
        component: Foods,
        exact: true
    }
    ,
    {
        path: '/Register',
        component: Register,
        exact: true
    },
    {
        path: '/Documents',
        component: Documents,
        exact: true
    },
    {
        path: '/Admin',
        component: AdminPage,
        exact: true
    }
    ]

};

export const Routes = () => {
    const results = [...routes.public];
    return (
        <Switch>
            {results.map(({ component: Component, ...route }) => (
                <Route {...route} key={route.path}>
                    <Component />
                </Route>
            ))}
        </Switch>
    );
};