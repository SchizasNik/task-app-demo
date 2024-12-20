import React, { FC } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Tasks } from "pages/Tasks";
import { Users } from "pages/Users";
import { Login } from "pages/Login";
import { Signup } from "pages/Signup";
import { Home } from "pages/Home";
import { NotFound } from "pages/NotFound";

export const RouterView: FC = p => (
    <Switch>
        <Route path="/" exact component={ Home }/>
        <Route path="/tasks" component={ Tasks }/>
        <Route path="/login" component={ Login }/>
        <Route component={ NotFound }/>
    </Switch>
)

export const AdminRouterView: FC = p => (
    <Switch>
        <Route path="/" exact component={ Home }/>
        <Route path="/tasks" component={ Tasks }/>
        <Route path="/users" component={ Users }/>
        <Route component={ NotFound }/>
    </Switch>
)

export const NoLoginRouterView: FC = p => (
    <Switch>
        <Route path="/signup" component={ Signup }/>
        <Route component={ Login }/>
    </Switch>
)