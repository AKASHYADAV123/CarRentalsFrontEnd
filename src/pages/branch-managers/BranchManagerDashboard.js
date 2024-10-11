import React from "react";
import { Container, Header, Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const BranchManagerDashboard = () => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header
        as="h2"
        textAlign="center"
        style={{ marginBottom: "4rem", color: "#333" }}
      >
        Welcome to the Branch Manager Dashboard
      </Header>
      <Grid centered columns={3} stackable>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Link to="/branch-manager/cars">
              <Card fluid color="blue">
                <Card.Content>
                  <Card.Header>Manage Cars</Card.Header>
                  <Card.Description>
                    View and manage the inventory of cars available at your
                    branch.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Link to="/branch-manager/bookings">
              <Card fluid color="green">
                <Card.Content>
                  <Card.Header>Manage Bookings</Card.Header>
                  <Card.Description>
                    Review and manage bookings made for cars at your branch.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
          {/* <Grid.Column textAlign="center">
            <Link to="/manager/branches">
              <Card fluid color="purple">
                <Card.Content>
                  <Card.Header>Branch Information</Card.Header>
                  <Card.Description>
                    Access details about your branch, location, and contact
                    information.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default BranchManagerDashboard;
