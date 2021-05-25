import React from 'react'
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import NotFound from './NotFound'
import EmployeeList from './EmployeeList'

function Root() {
    return (
        <BrowserRouter>
            <header>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/employees">
                    <button>Employees</button>
                </Link>
            </header>
            <hr/>
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/employees' component={EmployeeList}/>
                    <Route path='*' component={NotFound}/>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default Root;