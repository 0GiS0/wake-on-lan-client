import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import NavBar from './Navbar';
import Devices from './Devices';
import Wol from './Wol';

class App extends Component {
  render() {
    return (
      <Router>
        <Container text>
          <Container>
            <NavBar />
          </Container>
          <Container style={{ marginTop: '7em' }}>
            <Route path="/devices" component={Devices} />
            <Route path="/wol" component={Wol} />
          </Container>
        </Container>
      </Router>
    );
  }
}

export default App;
