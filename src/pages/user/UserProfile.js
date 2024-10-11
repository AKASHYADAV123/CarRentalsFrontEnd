import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Header,
  Button,
  Segment,
  Message,
} from "semantic-ui-react";
import api from "../../api/api"; // Ensure you have an API instance setup
import { useAuth } from "../../contexts/AuthContext";

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { user: userDetails } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users/${userDetails?.userId}`);
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e, { name, value }) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);
    try {
      await api.put(`/users/${userDetails?.userId}`, user);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to update user profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ marginTop: "2rem", width: "40%" }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "2rem" }}>
        User Profile
      </Header>
      {success && (
        <Message success onDismiss={() => setSuccess(false)}>
          <Message.Header>Success</Message.Header>
          <p>Your profile has been updated successfully.</p>
        </Message>
      )}
      {error && (
        <Message negative onDismiss={() => setError(null)}>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}
      <Segment>
        <Form loading={loading} onSubmit={handleSubmit}>
          <Form.Input
            label="First Name"
            placeholder="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
          <Form.Input
            label="Last Name"
            placeholder="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
          <Form.Input
            label="Email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button type="submit" primary fluid size="large">
            Save
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default UserProfile;
