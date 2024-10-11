import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Table } from "semantic-ui-react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

const BranchManagerCarList = () => {
  const [cars, setCars] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get(
          "/cars/branch/" + user?.assignedBranchId
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2" textAlign="center" style={{ marginBottom: "2rem" }}>
        Available Cars
      </Header>
      <Button
        as={Link}
        to="/branch-manager/cars/create"
        color="green"
        content="Add Car"
        icon="plus"
        labelPosition="left"
        style={{ marginBottom: "1rem" }}
      />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Car ID</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Rental Rate</Table.HeaderCell>
            <Table.HeaderCell>Owner Monthly Rent</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Approved Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cars.map((car) => (
            <Table.Row key={car.carId}>
              <Table.Cell>{car.carId}</Table.Cell>
              <Table.Cell>{car.brand}</Table.Cell>
              <Table.Cell>{car.model}</Table.Cell>
              <Table.Cell>{car.year}</Table.Cell>
              <Table.Cell>{car.description}</Table.Cell>
              <Table.Cell>${car.rentalRate.toFixed(2)}/day</Table.Cell>
              <Table.Cell>${car.proposedOwnerRent.toFixed(2)}</Table.Cell>
              <Table.Cell>{car.status}</Table.Cell>
              <Table.Cell>{car.approvedDate}</Table.Cell>
              <Table.Cell>{car.endDate}</Table.Cell>
              <Table.Cell>
                {car.status !== "Rejected" && car.status !== "Returned" && (
                  <Button
                    as={Link}
                    to={`/branch-manager/cars/edit/${car.carId}`}
                    color="blue"
                    icon="edit"
                    content="Edit"
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default BranchManagerCarList;
