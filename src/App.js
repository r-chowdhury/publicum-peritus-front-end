import React, { Component } from 'react';
import HomePage from "./components/HomePage"
import LoginPage from "./components/LoginPage"
import SignUpPage from "./components/SignUpPage"
import PoliticianList from "./components/PoliticianList"
import PoliticianListAppBar from "./components/PoliticianListAppBar"

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoggingIn: false,
      isSigningUp: false,
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

  changeLoginState = () => {
    this.setState({
      isLoggingIn: false
    })
    localStorage.isLoggedOut = false
  }

  logOutClick = () => {
    // localStorage.isLoggedOut = "true"
    this.setState({
      isLoggingIn: false,
      isSigningUp: false,
    })
    localStorage.clear()
  }

  changeIsSignedUp = (name, id) => {
    localStorage.user_id = id
    localStorage.name = name
    this.setState({
      isSigningUp: false,
      isLoggingIn: false
    })

  }

  render() {
    if (this.state.isLoggingIn === false && this.state.isSigningUp === false && !!localStorage.token === false) {
      return (
        <div>
          <HomePage handleClick={this.handleClick}/>
        </div>
      )
    } else if (this.state.isLoggingIn === true && this.state.isSigningUp === false) {
      return (<LoginPage changeLoginState={this.changeLoginState}/>)
    } else if (this.state.isSigningUp === true && this.state.isLoggingIn === false) {
      return (<SignUpPage changeIsSignedUp={this.changeIsSignedUp}/>)
    } else if (!!localStorage.token === true)  {
      return (
        <div>
          <PoliticianListAppBar logOutClick={this.logOutClick}/>
          <PoliticianList userPoliticianList={this.state.userPoliticianList}/>
        </div>
      )}
    
  }

}

export default App