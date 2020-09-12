import React, { Component } from "react";
import { login, register } from "../services/firebaseService";
import history from "../history";
import logo from "../images/lay's_logo.png"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_num: "",
      password: "",
      fireErrors: "",
      formTitle: "Login",
      isLogin: true,
      first_name: "",
      last_name: "",
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    const { mobile_num, password } = this.state;
    login(mobile_num, password)
      .then(() => {
        // alert("Login success");
        history.push("/home");
      })
      .catch((error) => {
        this.setState({ fireErrors: error.message });
      });
  };

  handleRegister = (event) => {
    event.preventDefault();
    const { mobile_num, password } = this.state;
    register(mobile_num, password)
      .then(() => {
        alert("Registered");
        history.push("/home");
      })
      .catch((error) => {
        this.setState({ fireErrors: error.message });
      });
  };

  getAction = (action) => {
    if (action === "reg") {
      this.setState({
        formTitle: "Register New User",
        isLogin: false,
        fireErrors: "",
        mobile_num: "",
        password: "",
      });
    } else {
      this.setState({
        formTitle: "Login",
        isLogin: true,
        fireErrors: "",
        mobile_num: "",
        password: "",
      });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      mobile_num,
      password,
      fireErrors,
      formTitle,
      isLogin,
      first_name,
      last_name,
    } = this.state;
    let errorNotification = fireErrors ? (
      <div className="Error"> {fireErrors} </div>
    ) : null;

    let submitBtn = isLogin ? (
      <input
        className="isLogin"
        type="submit"
        onClick={this.handleLogin}
        value="Enter"
      />
    ) : (
      <input
        className="isLogin"
        type="submit"
        onClick={this.handleRegister}
        value="Register"
      />
    );

    let login_register = isLogin ? (
      <button className="registerBtn" onClick={() => this.getAction("reg")}>
        Register
      </button>
    ) : (
      <button className="registerBtn" onClick={() => this.getAction("login")}>
        Back
      </button>
    );

    let render_register_fields = isLogin || (
      <>
        <input
          type="text"
          className="inputLogin"
          value={first_name}
          onChange={this.handleChange}
          name="first_name"
          placeholder="First Name"
        />
        <input
          type="text"
          className="inputLogin"
          value={last_name}
          onChange={this.handleChange}
          name="last_name"
          placeholder="Last Name"
        />
      </>
    );

    return (
        <div className="cover">
        <div className="form_block">
        {/* <img src={logo}/> */}
        <div id="title">{formTitle}</div>
        <div className="body">
          {errorNotification}
          <form>
            <input
              type="text"
              className="inputLogin"
              value={mobile_num}
              onChange={this.handleChange}
              name="mobile_num"
              placeholder="Phone number"
            />
            <input
              type="password"
              value={password}
              onChange={this.handleChange}
              name="password"
              placeholder="Password"
            />
            {render_register_fields}
            {submitBtn}
          </form>
          {login_register}
        </div>
      </div>
      </div>
    );
  }
}

export default Login;
