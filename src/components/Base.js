import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

// Components
import Info from './Info';
import Home from './Home';
import Analysis from './Analysis';

export default function Base() {
    return (
        <Router>
            <Container className="p-0 d-flex justify-content-center align-items-center" id="base">
                <Info />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/predictions/:id" exact component={Analysis} />
                </Switch>
            </Container>
        </Router>
    )
}
