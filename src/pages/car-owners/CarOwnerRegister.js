import React, { useState } from "react";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import colors, { primaryObj } from "../../util/colors";

const CarOwnerRegister = () => {
  const [owner, setOwner] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    confirmPassword: "",
  });

  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
    show: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwner({ ...owner, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async () => {
    // Reset errors
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      confirmPassword: "",
    });

    let formIsValid = true;
    let finalErrors = {};

    for (const key in owner) {
      if (owner[key] === "") {
        finalErrors = {
          ...finalErrors,
          [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
        };
        setErrors({
          ...errors,
          [key]: `${key.charAt(0).toUpperCase() + key.slice(1)} is required`,
        });
        formIsValid = false;
      }
    }

    if (owner.password !== owner.confirmPassword) {
      finalErrors = {
        ...finalErrors,
        confirmPassword: "Passwords do not match",
      };
    }

    setErrors({ ...finalErrors });

    if (formIsValid) {
      try {
        await api.post("/car-owners", owner);
        setAlertMessage({
          type: "success",
          message: "Registration successful.....",
          show: true,
        });
        setTimeout(() => {
          navigate("/car-owner/login");
        }, 1500);
      } catch (err) {
        const message = err?.response?.data.message;
        setAlertMessage({
          type: "error",
          message: message ? message : err?.message,
          show: true,
        });
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" style={{ marginTop: 50 }}>
        <Grid.Column style={{ maxWidth: 800 }}>
          {alertMessage.show && (
            <Message
              success={alertMessage.type === "success"}
              negative={alertMessage.type === "error"}
              header={alertMessage.message}
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "20px",
              }}
            />
          )}
          <Header as="h2" style={{ color: colors.primary }} textAlign="center">
            Register as Car Owner
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Grid stackable columns={2}>
              <Grid.Column>
                <Form.Input
                  fluid
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={owner.firstName}
                  onChange={handleChange}
                  error={Boolean(errors.firstName)}
                />

                <Form.Input
                  fluid
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={owner.lastName}
                  onChange={handleChange}
                  error={Boolean(errors.lastName)}
                />

                <Form.Input
                  fluid
                  placeholder="E-mail address"
                  type="email"
                  name="email"
                  value={owner.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                />

                <Form.Input
                  fluid
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={owner.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                />

                <Form.Input
                  fluid
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={owner.confirmPassword}
                  onChange={handleChange}
                  error={Boolean(errors.confirmPassword)}
                />
                {errors.confirmPassword && (
                  <p style={{ color: "red", marginBottom: 2 }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  fluid
                  placeholder="Street "
                  type="text"
                  name="streetAddress"
                  value={owner.streetAddress}
                  onChange={handleChange}
                  error={Boolean(errors.streetAddress)}
                />

                <Form.Input
                  fluid
                  placeholder="City"
                  type="text"
                  name="city"
                  value={owner.city}
                  onChange={handleChange}
                  error={Boolean(errors.city)}
                />

                <Form.Input
                  fluid
                  placeholder="State"
                  type="text"
                  name="state"
                  value={owner.state}
                  onChange={handleChange}
                  error={Boolean(errors.state)}
                />

                <Form.Input
                  fluid
                  placeholder="Postal Code"
                  type="text"
                  name="postalCode"
                  value={owner.postalCode}
                  onChange={handleChange}
                  error={Boolean(errors.postalCode)}
                />

                <Form.Input
                  fluid
                  placeholder="Country"
                  type="text"
                  name="country"
                  value={owner.country}
                  onChange={handleChange}
                  error={Boolean(errors.country)}
                />
              </Grid.Column>
            </Grid>
            <br />

            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
              style={{ ...primaryObj, width: "50%" }}
            >
              Register
            </Button>
          </Form>
          <Message style={{ width: "50%" }}>
            Already have an account? <a href="/login">Log In</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default CarOwnerRegister;
