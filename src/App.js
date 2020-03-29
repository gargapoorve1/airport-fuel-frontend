import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';


import AuthPage from './pages/Auth';
import AirportPage from './pages/Airport';
import AircraftPage from './pages/Aircraft';
import TransactionPage from './pages/Transaction';
import ReportPage from './pages/Report';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';


class App extends Component {

  state = {
    token: null,
    userId: null
  }

  login = (token, userId) => {
    this.setState({ token: token, userId: userId })
  }

  logout = () => {
    this.setState({ token: null, userId: null })
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }} >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && <Redirect from="/auth" to="/airport" exact />}
                {!this.state.token && <Route path="/auth" component={AuthPage} />}
                {this.state.token && <Route path="/airport" component={AirportPage} />}
                {this.state.token && <Route path="/aircraft" component={AircraftPage} />}
                {this.state.token && <Route path="/transaction" component={TransactionPage} />}
                {this.state.token && <Route path="/report" component={ReportPage} />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter >
    );
  }
}

export default App;
