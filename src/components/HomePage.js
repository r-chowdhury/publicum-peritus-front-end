import React, { Component, Fragment } from 'react';
import homePageStyles from "../styles/HomePage.css"
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';


class HomePage extends Component {
  render () {
    return (
      <div style={{height:`${window.innerHeight}px`}}>
        <section id="banner" style={{ height: '100%' }}>
          <div style={{transform: 'translate(0,50%)'}}>
          <h2>Publicum Peritus</h2>
          <p>Sign up today to see who represents you!</p>
            <div className="actions">
              <Link to="/signup">
                  <a className="button" 
                    id="create-button" 
                    onClick={e => this.props.handleClick(e)}>
                    Create An Account
                  </a>
              </Link>

              <Link to="/login">
                <a className="button" 
                  onClick={e => this.props.handleClick(e)}>
                  Sign In
                </a>
              </Link>
            </div>
          </div>
        </section>
    </div>
  )}
}

export default HomePage