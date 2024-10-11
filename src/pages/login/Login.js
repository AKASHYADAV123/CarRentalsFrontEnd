import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import colors from "../../util/colors";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });
    setErrorMessage(null); // Reset error message

    // Validation
    let formIsValid = true;
    const updatedErrors = {};

    if (!credentials.email) {
      updatedErrors.email = "Email is required";
      formIsValid = false;
    }

    if (!credentials.password) {
      updatedErrors.password = "Password is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      return;
    }

    // Handle login logic here
    try {
      const response = await api.post("/users/login", credentials);
      const { token, ...rest } = response?.data;
      login(token, { ...rest });
      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage("Incorrect email or password. Please try again.");
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" style={{ color: colors.primary }} textAlign="center">
          Login here
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          {errorMessage && (
            <Message negative>
              <Message.Header>Login Failed</Message.Header>
              <p>{errorMessage}</p>
            </Message>
          )}
          <Form.Input
            fluid
            placeholder="E-mail address"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            error={errors.email ? true : false}
          />
          {errors.email && (
            <div style={{ color: "red", marginBottom: 8 }}>{errors.email}</div>
          )}

          <Form.Input
            fluid
            placeholder="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            error={errors.password ? true : false}
          />
          {errors.password && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {errors.password}
            </div>
          )}

          <Button
            style={{ backgroundColor: colors.primary, color: "white" }}
            fluid
            size="large"
            type="submit"
          >
            Login
          </Button>
        </Form>
        <Message>
          Don't have an account? <a href="/register"> Register here</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
