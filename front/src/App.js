import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';
import './';
import { Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    }
  }
  userLogin = () => {
    this.setState({ isLogged: true });
  }

  render() {
    const { isLogged } = this.state;
    return (
      <div className="App bgcolor7">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={() => <Home login={this.userLogin} isLogged={this.state.isLogged} />} />


          {/* <Route path="/green" component={() => <Green isLogged={this.state.isLogged} />} />
					<Route path="/pink" component={() => <Pink isLogged={this.state.isLogged} />} />
					<Route path="/blue" component={() => <Blue isLogged={this.state.isLogged} />} />
          {isLogged && <Route path="/useradmin" component={() => <UserAdmin isLogged={isLogged} />} />} */}
        </Switch>
      </div>
    );
  }
}

export default App;
