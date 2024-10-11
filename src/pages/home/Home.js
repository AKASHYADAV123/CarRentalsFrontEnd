import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Grid, Header, Icon } from "semantic-ui-react";
import colors, { primaryObj } from "../../util/colors";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {

  const { isAuthenticated } = useAuth();

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "2rem",  }} >

      <Container textAlign="center">

        <Header as="h1" style={{ marginTop: 20, marginBottom: "2rem", color: "#212529" }} >
          Welcome to Road Trip Rentals
        </Header>

        <p style={{ marginBottom: "2rem", color: "#6c757d", fontSize: "1.2rem" }} >
          Road Trip Rentals is your one-stop destination for hassle-free car
          rentals and leasing services. Whether you're planning a weekend
          getaway or a long-term trip, we've got you covered.
        </p>
        
        <Button as={Link} to="/vehicle-search" color="teal" size="huge" style={primaryObj} >
          Get Started
        </Button>

        <Header as="h2" style={{ marginTop: "4rem", color: "#212529" }}>
          Why Choose Road Trip Rentals?
        </Header>

        <Grid columns={3} stackable doubling style={{ marginTop: "2rem" }}>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="car" size="big" style={{ marginBottom: "1rem", color: colors.primary }} />
                <Card.Header>Wide Range of Vehicles</Card.Header>
                <Card.Description>
                  Choose from a diverse selection of vehicles, including sedans,
                  SUVs, trucks, and more. We have options to suit every need and
                  budget.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="calendar alternate" size="big" style={{ marginBottom: "1rem", color: colors.primary }} />
                <Card.Header>Flexible Booking</Card.Header>
                <Card.Description>
                  Enjoy the flexibility to book cars for both short-term and
                  long-term rentals. Whether it's a day trip or a month-long
                  adventure, we've got the perfect rental plan for you.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Icon name="check circle outline" size="big" style={{ marginBottom: "1rem", color: colors.primary }} />
                <Card.Header>Easy Reservation Process</Card.Header>
                <Card.Description>
                  Our user-friendly platform makes it simple to reserve your
                  vehicle online. With just a few clicks, you can secure your
                  rental and start planning your road trip.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>


        </Grid>

        {/* Login links */}
        {!isAuthenticated() && (
          <>
            {" "}
            <Header as="h3" style={{ marginTop: "4rem", color: "#212529" }}>
              Login as:
            </Header>

            <Button.Group>
              <Button as={Link} to="/admin/login" color="teal" style={primaryObj} > Admin </Button>
                <Button.Or />
              <Button as={Link} to="/branch-manager/login" color="teal" style={primaryObj} > Branch Manager </Button>
                <Button.Or />
              <Button as={Link} to="/car-owner/login" color="teal" style={primaryObj} > Car Owner </Button>
                <Button.Or />
              <Button as={Link} to="/user/login" color="teal" style={primaryObj} > User </Button>
            </Button.Group>
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
