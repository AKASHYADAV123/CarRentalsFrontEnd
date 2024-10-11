import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Rating,
  Comment,
  Segment,
} from "semantic-ui-react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";

const CarDetails = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isUser, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hasCommented, setHasCommented] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchCarDetails();
    fetchComments();
    // eslint-disable-next-line
  }, []);

  const fetchCarDetails = async () => {
    try {
      const response = await api.get(`/cars/${carId}`);
      setCar(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/reviews/cars/${carId}`);
      setComments(response.data);

      if (response.data.length > 0) {
        const totalRating = response.data.reduce(
          (sum, comment) => sum + comment.rating,
          0
        );
        debugger;
        setAverageRating(totalRating / response.data.length);
      }

      if (user) {
        const userComment = response.data.find(
          (comment) => comment.userId === user.userId
        );
        if (userComment) {
          setHasCommented(true);
          setUserComment(userComment.comment);
          setUserRating(userComment.rating);
        }
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const checkAvailability = async () => {
    setLoading(true);
    setAvailability(null);
    setError(null);

    const fromDateMoment = moment(fromDate);
    const toDateMoment = moment(toDate);

    if (!fromDate || !toDate) {
      setLoading(false);
      return;
    }

    if (fromDateMoment.isAfter(toDateMoment)) {
      setError("From date must be before to date");
      setTimeout(() => setError(null), 1000);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/bookings/${carId}/availability`, {
        carId,
        pickupDate: fromDate,
        dropoffDate: toDate,
      });
      const availabilityStatus = response.data?.carAvailabilityStatus;
      setAvailability(availabilityStatus);
    } catch (error) {
      setError("Error checking availability");
      setTimeout(() => setAvailability(null), 1000);
    }

    setLoading(false);
  };

  const makeBooking = () => {
    if (availability === "available" && isUser()) {
      const fromDateMoment = moment(fromDate);
      const toDateMoment = moment(toDate);
      const numberOfDays = toDateMoment.diff(fromDateMoment, "days") + 1;
      const totalAmount = numberOfDays * car.rentalRate;

      navigate(`/cars/${carId}/details/book/payment`, {
        state: {
          booking: {
            car,
            carId,
            fromDate,
            toDate,
            rentalRate: car.rentalRate,
            numberOfDays,
            totalAmount,
          },
        },
      });
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await api.post(`/reviews`, {
        userId: user.userId,
        comment: userComment,
        rating: userRating,
        carId,
      });
      fetchComments();
      setHasCommented(true);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", marginTop: 10, padding: 30 }}
    >
      <Grid.Row>
        <Grid.Column width={8}>
          {car.imageUrl && (
            <Image
              src={
                car.imageUrl && require(`../../images/cars/${car.imageUrl}`)
                  ? require(`../../images/cars/${car.imageUrl}`)
                  : require("../../images/cars/default_car.jpeg")
              }
              fluid
            />
          )}
        </Grid.Column>
        <Grid.Column width={8} textAlign="left">
          <Header as="h2" textAlign="center"> Car Details </Header>
          <p> <strong>Brand:</strong> {car.brand} </p>
          <p> <strong>Model:</strong> {car.model} </p>
          <p> <strong>Year:</strong> {car.year} </p>
          <p> <strong>Description:</strong> {car.description} </p>
          <p> <strong>Rental Rate:</strong> ${car.rentalRate} per day </p>
          <Form loading={loading}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="From Date"
                type="date"
                value={fromDate}
                min={currentDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <Form.Input
                fluid
                label="To Date"
                type="date"
                value={toDate}
                min={currentDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </Form.Group>

            <Button color="blue" onClick={checkAvailability}> Check Availability </Button>

            { Boolean(availability) && (
              <>
                { availability === "available" ? (
                  <>
                    <Message positive>
                      <Message.Header>Car is available!</Message.Header>
                      {!isUser() && (
                        <Message.Content>
                          Please Login as User to make booking
                        </Message.Content>
                      )}
                    </Message>
                    <br />
                    {isUser() && (
                      <Button color="green" onClick={makeBooking}>
                        Make Booking
                      </Button>
                    )}
                  </>
                ) : (
                  <Message negative>
                    <Message.Header>Car is not available</Message.Header>
                  </Message>
                )}
              </>
            )}

            {error && (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{error}</p>
              </Message>
            )}
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h3" textAlign="center">
            Overall Rating
          </Header>
          <Rating
            icon="star"
            rating={averageRating}
            maxRating={5}
            disabled
            size="massive"
          />
          <Header as="h3" textAlign="center"> Comments </Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign="left">
          {isUser() && !hasCommented && (
            <Segment>
              <Header as="h3">Rate the Car</Header>
              <Form reply>
                <Form.TextArea
                  placeholder="Write your comment"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                />
                <Form.Field>
                  <label>Rating:</label>
                  <Rating
                    icon="star"
                    rating={userRating}
                    maxRating={5}
                    onRate={(e, { rating }) => setUserRating(rating)}
                  />
                </Form.Field>
                <Button
                  content="Add Comment"
                  labelPosition="left"
                  icon="edit"
                  primary
                  onClick={handleCommentSubmit}
                />
              </Form>
            </Segment>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          {comments.length > 0 ? (
            <Comment.Group>
              {comments.map((comment, index) => (
                <Comment key={index}>
                  <Comment.Content>
                    <Comment.Author as="a">{comment.username}</Comment.Author>
                    <Comment.Metadata>
                      <div>{moment(comment.reviewDate).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
            </Comment.Group>
          ) : (
            <Message>
              <Message.Content>No comments yet.</Message.Content>
            </Message>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CarDetails;
