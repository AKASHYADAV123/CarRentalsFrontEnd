import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Table, Message } from "semantic-ui-react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

const BranchBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/bookings/branch/" + user?.assignedBranchId);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again later.");
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await api.put(`/bookings/${bookingId}/cancel`, {});
      setBookings(
        bookings.filter((booking) => booking.bookingId !== bookingId)
      );
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("Error canceling booking. Please try again later.");
    }
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "2rem" }}>
        Booking List
      </Header>

      {error && <Message negative>{error}</Message>}

      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Booking ID</Table.HeaderCell>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Car Name</Table.HeaderCell>
            <Table.HeaderCell>Pickup Date</Table.HeaderCell>
            <Table.HeaderCell>Dropoff Date</Table.HeaderCell>
            <Table.HeaderCell>Total Amount</Table.HeaderCell>
            <Table.HeaderCell>Booking Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookings.map((booking) => (
            <Table.Row key={booking.bookingId}>
              <Table.Cell>{booking.bookingId}</Table.Cell>
              <Table.Cell>{`${booking.userName}`}</Table.Cell>
              <Table.Cell>{booking.carName}</Table.Cell>
              <Table.Cell>{booking.pickupDate}</Table.Cell>
              <Table.Cell>{booking.dropoffDate}</Table.Cell>
              <Table.Cell>${booking.totalAmount.toFixed(2)}</Table.Cell>
              <Table.Cell>{booking.bookingStatus}</Table.Cell>
              <Table.Cell>
                {/* {booking.bookingStatus === "Confirmed" && (
                  <Button
                    color="red"
                    onClick={() => handleCancelBooking(booking.bookingId)}
                  >
                    Cancel
                  </Button>
                )} */}
                <Button
                  as={Link}
                  to={`/branch-manager/bookings/${booking.bookingId}/view`}
                  color="blue"
                  content="View"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default BranchBookingList;
