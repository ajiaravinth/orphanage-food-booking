import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import {AvField, AvGroup, AvForm} from "availity-reactstrap-validation";
import request from "./config/api";
import {toast, ToastContainer } from "react-toastify";

const Login = (props) => {
  const user = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(user);

  useEffect(() => {
    // toast.success(props.location.state.message);
    let authCheck = localStorage.getItem("admin_authToken");
    if (authCheck) {
      props.history.push("/admin/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    let formData = {
      email: values.username,
      password: values.password,
    };
    request({
        url: "/admin/login",
        method: "POST",
        data: formData
    }) .then((res) => {
        if (res.status === 0) {
          alert(res.response);
        }
        if (res.status === 1) {
          localStorage.setItem("admin_authToken", res.response.auth_token);
          toast.success(res.message);
          setTimeout(() => {
            props.history.push({
              pathname: "/admin/dashboard",
              state: {
                message: res.message,
                auth_token: res.response.auth_token,
                username: res.response.username,              
              },
            });
          }, 1000);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="container">
      <ToastContainer autoClose={1500} position="top-right" />
      <div className="userContainer">
        <h3 style={{ textAlign: "center" }}>Admin Login</h3>
        <hr />
        <AvForm onValidSubmit={formSubmit}>
          <AvGroup>
            <AvField
              type="text"
              name="username"
              label="Username"
              placehoder="Enter Username"              
              value={values.username}
              onChange={handleChange}
              validate={{
                required: { value: true, errMessage: "Please enter name" },
              }}
            />
          </AvGroup>
          <AvGroup>
            <AvField
              type="password"
              name="password"
              label="Password"
              placehoder="Enter Password"
              value={values.password}
              onChange={handleChange}
              validate={{
                required: { value: true, errMessage: "Please enter Password" },
              }}
            />
          </AvGroup>
          <Button color="success">Login</Button>
        </AvForm>
      </div>
    </div>
  );
};

export default Login;