import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'

import Login from './Pages/Login'
import Chat from './Pages/Chat'
import AddFriends from './Pages/AddFriends'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/chat" component={Chat} />
                <PrivateRoute path="/add-friends" component={AddFriends} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes