import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './Home';
import './';
import { Switch, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Performance from './components/Presentation/Presentation'

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
          <Route path="/performance" component={() => <Performance isLogged={this.state.isLogged} />} />
					
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
