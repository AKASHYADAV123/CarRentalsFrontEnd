import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import api from "../../api/api";
import moment from "moment";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await api.get(`/bookings/${bookingId}`);
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await api.get(`/branches`);
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBookingDetails();
    fetchBranches();
  }, [bookingId]);

  const handleCancelBooking = async () => {
    try {
      await api.put(`/bookings/${bookingId}/cancel`, booking);
      setAlertMessage({
        type: "success",
        message: "Booking cancelled successfully.",
      });
      setTimeout(() => {
        navigate("/user/bookings");
      }, 1500);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setAlertMessage({ type: "error", message: "Failed to cancel booking." });
    }
  };

  const calculateRemainingAmount = () => {
    const dropoffDate = moment(booking.dropoffDate);
    const currentDate = moment();

    if (currentDate <= dropoffDate) {
      return 0;
    }

    const diffDays = currentDate.diff(dropoffDate, "days");
    const dailyRate = booking.carRentPerDay;

    return diffDays * dailyRate;
  };

  const handleReturnBooking = async () => {
    if (!selectedBranch) return;
    const remainingAmount = calculateRemainingAmount();

    if (remainingAmount > 0) {
      setRemainingAmount(remainingAmount);
    } else {
      try {
        const remainingAmount = calculateRemainingAmount();

        await api.put(`/bookings/${bookingId}/return`, {
          bookingId,
          dropoffLocation: selectedBranch,
          finalAmount: remainingAmount,
          finalAmountStatus: "Paid",
        });
        setAlertMessage({
          type: "success",
          message: "Car returned successfully.",
        });

        setTimeout(() => {
          navigate("/user/bookings");
        }, 1500);
      } catch (error) {
        console.error("Error returning booking:", error);
        setAlertMessage({ type: "error", message: "Failed to return car." });
      }
    }
  };

  const confirmReturnBooking = async () => {
    if (!selectedBranch) return;

    navigate(`/user/bookings/${bookingId}/return-payment`, {
      state: {
        booking: {
          bookingId,
          dropoffLocation: selectedBranch,
          finalAmount: remainingAmount,
        },
      },
    });
  };

  const pickupDate = moment(booking.pickupDate);
  const currentDate = moment();

  const differenceInMilliseconds = pickupDate.diff(currentDate);
  const differenceInDays = moment.duration(differenceInMilliseconds).asDays();

  const isCancelable = booking && differenceInDays > 1;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const isBookingActive = booking.bookingStatus === "Confirmed";

  return (
    <Container style={{ marginTop: "2rem", width: "40%", padding: 40 }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "2rem" }}>
        Booking Details
      </Header>
      {alertMessage && (
        <Message success className={`alert ${alertMessage.type}`}>
          {alertMessage.message}
        </Message>
      )}
      <Segment textAlign="center">
        <p>
          <strong>Booking ID:</strong> {booking.bookingId}
        </p>
        <p>
          <strong>Car Name:</strong> {booking.carName}
        </p>
        <p>
          <strong>Pickup Location:</strong> {booking.pickupLocationName}
        </p>
        <p>
          <strong>Dropoff Location:</strong>{" "}
          {booking.dropoffLocationName || "N/A"}
        </p>
        <p>
          <strong>Pickup Date:</strong> {booking.pickupDate}
        </p>
        <p>
          <strong>Dropoff Date:</strong> {booking.dropoffDate}
        </p>
        <p>
          <strong>Total Amount:</strong> ${booking.totalAmount?.toFixed(2)}
        </p>
        <p>
          <strong>Booking Status:</strong> {booking.bookingStatus}
        </p>
        <p>
          <strong>Initial Amount:</strong> ${booking.initialAmount?.toFixed(2)}
        </p>
        <p>
          <strong>Initial Amount Status:</strong> {booking.initialAmountStatus}
        </p>
        {booking.finalAmount > 0 && (
          <>
            <p>
              <strong>Final Amount:</strong> ${booking.finalAmount?.toFixed(2)}
            </p>
            <p>
              <strong>Final Amount Status:</strong> {booking.finalAmountStatus}
            </p>
          </>
        )}
        {remainingAmount > 0 && (
          <>
            <p>
              <strong>Remaining Amount:</strong> ${remainingAmount?.toFixed(2)}
            </p>
          </>
        )}
        {isCancelable && isBookingActive && (
          <Button color="red" onClick={handleCancelBooking}>
            Cancel Booking
          </Button>
        )}

        {isBookingActive && (
          <>
            <Header as="h4" style={{ marginTop: "2rem" }}>
              Return Options
            </Header>
            <Dropdown
              placeholder="Select Return Branch"
              fluid
              selection
              value={selectedBranch}
              style={{
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 20,
              }}
              options={branches.map((branch) => ({
                key: branch.branchId,
                text: `${branch.branchName} - ${branch.location}`,
                value: branch.branchId,
              }))}
              onChange={(_, { value }) => {
                setSelectedBranch(value);
              }}
            />{" "}
            <Button
              color="blue"
              onClick={handleReturnBooking}
              disabled={!selectedBranch}
            >
              Return Car
            </Button>
            <br />
            <br />
            {remainingAmount > 0 && (
              <>
                <Button
                  color="blue"
                  onClick={confirmReturnBooking}
                  disabled={!selectedBranch}
                >
                  Proceed to Pay ${remainingAmount}
                </Button>
              </>
            )}
          </>
        )}
      </Segment>
    </Container>
  );
};

export default BookingDetails;
