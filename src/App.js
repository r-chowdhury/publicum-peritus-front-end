import React, { Component } from 'react';
import HomePage from "./components/HomePage"
import LoginPage from "./components/LoginPage"
import SignUpPage from "./components/SignUpPage"
import PoliticianList from "./components/PoliticianList"
import PoliticianListAppBar from "./components/PoliticianListAppBar"
import { BrowserRouter, Route, Redirect, withRouter, Link } from "react-router-dom";


class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  handleClick = (e) => {
    if (e.target.innerText === "Create An Account") {
      this.setState({
        isSigningUp: true,
        isLoggingIn: false,
      })
    } else {
      this.setState({
        isLoggingIn: true,
        isSigningUp: false
      })
    }
  }

  logOutClick = () => {
    localStorage.clear()
    this.props.history.push('/')
  }

  isSignedUp = (name, id) => {
    localStorage.user_id = id
    localStorage.name = name
  }

    PoliticianListPage = () => {
      return(
        <React.Fragment>
          <PoliticianListAppBar logOutClick={this.logOutClick} />
          <PoliticianList />
        </React.Fragment>
      )
    }

  render() {
    return (
      <div>
        <Route exact path="/" render={(props) => {
          return <HomePage handleClick={this.handleClick} {...props}/>
        }}/>
        <Route exact path="/SignUp" render={(props) => {
          return <SignUpPage {...props} />
        }} />
        <Route exact path="/login" render={(props) => {
          return <LoginPage {...props}/>
        }}/>
        <Route path="/politicians" render={() => {
          return !!localStorage.token === true ? 
            this.PoliticianListPage()
          :
            <Redirect to="/login"/>
          } 
        }/>
      </div>
    )
  }



}

export default App