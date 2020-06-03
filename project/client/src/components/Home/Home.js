import React, { Component } from 'react';
import logo from '../../assets/images/temp-logo.png';
import '../../assets/css/global.css';
import '../../assets/css/index.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="background">
          <div className="layer"></div>
            <div className="overlay">
              <div className="logo-container">
                <img src={logo} className="logo" alt="logo" />
              </div>
              <div>
                <h5 data-testid="h5tag" className="loginText">Who are you?</h5>
              </div>
              <br></br>
              <form data-testid="profile-option" action="/teacher">
                  <input className ="user-button index-button" type="submit" value="Teaching Staff" />
              </form>
              <form data-testid="profile-option" action="/student">
                  <input className ="user-button index-button" type="submit" value="Student" />
              </form>
           </div>
       </div>
      </div>
    );
  }
}

export default Home;
