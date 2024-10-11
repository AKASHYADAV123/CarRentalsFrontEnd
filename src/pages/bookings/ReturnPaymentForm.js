import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";
import api from "../../api/api"; // Assuming you have an API utility module
import { useAuth } from "../../contexts/AuthContext";

const ReturnPaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!cardNumber.match(/^[0-9]{16}$/)) {
      setError("Invalid card number. It should be 16 digits.");
      setLoading(false);
      return;
    }

    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      setError("Invalid expiry date. Format should be MM/YY.");
      setLoading(false);
      return;
    }

    if (!cvv.match(/^[0-9]{3,4}$/)) {
      setError("Invalid CVV. It should be 3 or 4 digits.");
      setLoading(false);
      return;
    }

    const paymentDetails = {
      cardNumber,
      expiryDate,
      cvv,
      paymentAmount: booking.totalAmount,
    };

    const { finalAmount, bookingId, dropoffLocation } = booking;

    const payload = {
      ...paymentDetails,
      userId: user?.userId,
      finalAmount,
      bookingId,
      dropoffLocation,
    };

    try {
      const bookingResponse = await api.put(
        `/bookings/${bookingId}/return`,
        payload
      );

      if (bookingResponse.status === 200) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/user/bookings");
        }, 1000);
      } else {
        setError("Payment failed.");
      }
    } catch (err) {
      setError("An error occurred during the payment process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Payment Details
        </Header>
        <Form
          size="large"
          onSubmit={handleSubmit}
          loading={loading}
          error={!!error}
          success={success}
        >
          <Segment stacked>
            <Form.Input
              fluid
              icon="credit card"
              iconPosition="left"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <Form.Input
              fluid
              icon="calendar"
              iconPosition="left"
              placeholder="Expiry Date (MM/YY)"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />

            <Button color="teal" fluid size="large" type="submit">
              Submit Payment ${booking.totalAmount}
            </Button>
          </Segment>
          {error && <Message error content={error} />}
          {success && (
            <Message success content="Payment successful! Car Returned." />
          )}
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default ReturnPaymentForm;
