import React from 'react';
import { Route, Switch,BrowserRouter} from 'react-router-dom';
import MainPage from './mainPage';

export default function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = '/'> <MainPage /> </Route>
            </Switch>
        </BrowserRouter>
    )
}