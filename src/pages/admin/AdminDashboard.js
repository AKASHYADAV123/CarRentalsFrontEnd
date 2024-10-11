import React from "react";
import { Container, Header, Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "4rem" }}>
        Welcome to the Admin Dashboard  
      </Header>
      <Grid centered columns={3} stackable>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Link to="/admin/branches">
              <Icon name="building" size="huge" color="teal" />
              <Header as="h3">Manage Branches</Header>
            </Link>
            <p>View and manage branches, their details, and locations.</p>
          </Grid.Column>
          {/* <Grid.Column textAlign="center">
            <Link to="/admin/bookings">
              <Icon name="car" size="huge" color="orange" />
              <Header as="h3">Manage Bookings</Header>
            </Link>
            <p>Review and manage all bookings made through the platform.</p>
          </Grid.Column> */}
          <Grid.Column textAlign="center">
            <Link to="/admin/branch-managers">
              <Icon name="users" size="huge" color="blue" />
              <Header as="h3">Manage Branch Managers</Header>
            </Link>
            <p>Assign and manage branch managers for different branches.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
