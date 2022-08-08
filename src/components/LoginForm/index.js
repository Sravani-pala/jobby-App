import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitErr: false,
    errMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitErr: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.jwt_token)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="label-heading" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Password"
          className="user-input"
          value={password}
          id="password"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUserName = () => {
    const {username} = this.state

    return (
      <>
        <label className="label-heading" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Username"
          className="user-input"
          value={username}
          id="username"
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  render() {
    const {showSubmitErr, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-image"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUserName()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitErr && <p className="error-message">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
