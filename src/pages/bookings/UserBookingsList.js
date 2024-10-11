import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Header, Message } from "semantic-ui-react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

const UserBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/bookings/user/" + user?.userId);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "2rem" }}>
        My Bookings
      </Header>

      {bookings.length === 0 && (
        <Message info>
          <Message.Header>No bookings found</Message.Header>
          <p>You haven't made any bookings yet.</p>
        </Message>
      )}

      {bookings.length > 0 && (
        <Card.Group>
          {bookings.map((booking) => (
            <Card key={booking.bookingId}>
              <Card.Content>
                <Card.Header>Booking ID: {booking.bookingId}</Card.Header>
                <Card.Meta>Car Name: {booking.carName}</Card.Meta>
                <Card.Meta>
                  Pickup Location: {booking.pickupLocationName}
                </Card.Meta>

                <Card.Meta>Pickup Date: {booking.pickupDate}</Card.Meta>

                <Card.Meta>
                  Total Amount: ${booking.totalAmount.toFixed(2)}
                </Card.Meta>
                <Card.Meta>Booking Status: {booking.bookingStatus}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    as={Link}
                    to={`/user/bookings/${booking.bookingId}/view`}
                    color="blue"
                  >
                    View
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      )}
    </Container>
  );
};

export default UserBookingList;
