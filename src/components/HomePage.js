import React, { Component, Fragment } from 'react';
import homePageStyles from "../styles/HomePage.css"

class HomePage extends Component {
  render () {
    return (
      <div style={{height:`${window.innerHeight}px`}}>
        <section id="banner" style={{ height: '100%' }}>
          <div style={{transform: 'translate(0,50%)'}}>
          <h2>Publicum Peritus</h2>
          <p>Sign up today to see who represents you!</p>
          <div className="actions">
            <a href="#" className="button" onClick={e => this.props.handleClick(e)}>Create An Account</a>
            <a href="#" className="button" onClick={e => this.props.handleClick(e)}>Sign In</a>
          </div>
          </div>
        </section>
    </div>
  )}
}

export default HomePage