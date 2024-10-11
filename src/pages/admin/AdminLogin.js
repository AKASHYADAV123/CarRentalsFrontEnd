import React, { useState } from "react";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import colors from "../../util/colors";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
    setErrorMessage("");
    setSuccessMessage("");

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

    try {
      const response = await api.post("/admin/login", credentials);
      const { token, adminId: userId, ...rest } = response?.data;

      setSuccessMessage("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        login(token, { userId, ...rest });
        navigate("/admin/dashboard");
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data || "Failed to login. Please try again."
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  };

  console.log(successMessage);

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 400 }}>
        <Header as="h2" style={{ color: colors.primary }} textAlign="center">Admin Login</Header>

        <Form size="large" onSubmit={handleSubmit} error={!!errorMessage}>
          {errorMessage && <Message error content={errorMessage} />}
          {successMessage && <Message positive content={successMessage} />}

          <Form.Input
            fluid
            placeholder="E-mail address"
            type="email" 
            name="email"
            value={credentials.email}
            onChange={handleChange}
            error={!!errors.email}
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
            error={!!errors.password}
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

      </Grid.Column>

    </Grid>

  );

  
};

export default AdminLogin;
