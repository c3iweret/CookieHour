import React, { Component } from 'react';
import logo from '../../assets/images/temp-logo.png';
import axios from 'axios';

class StudentLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className="StudentLogin">
        <div className="background">
            <div className="overlay">
              <div className="logo-container">
                <div className="logo"></div>
                  <img src={logo} className="logo" alt="logo" />
              </div>

              <form className="login" onSubmit={this.handleSubmit} >
                <input data-testid="email" className="login-field" name='email' type="email" placeholder='EMAIL'
                value={this.state.email} onChange={this.handleChange} />
                <input data-testid="password" className="login-field" type='password' name='password' placeholder='PASSWORD'
                value={this.state.password} onChange={this.handleChange} />
                <input className='index-button login-button' type='submit' value='LOGIN'/>
              </form>
              <form action="/" >
                <button className="index-button back-button" type="submit"> {<i className="pe-7s-back" />} </button>
              </form>
           </div>
        </div>
      </div>
    );
  }

  async handleSubmit(event){
    event.preventDefault();
    const { email, password } = this.state;
        try {
           const response =  await
           axios.post('/student/login', { email, password })
           console.log(response);
           window.location.replace('/student/dashboard');
        } catch (err) {
          alert(err);
        }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }
}

export default StudentLogin;
