import React, { useState, useEffect } from "react";
import { Container, Header, Table, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

const AdminBranchCars = () => {
  const { branchId } = useParams();
  const [cars, setCars] = useState([]);
  const [branch, setBranch] = useState({});

  useEffect(() => {
    const fetchBranchDetails = async () => {
      try {
        const branchResponse = await api.get(`/branches/${branchId}`);
        setBranch(branchResponse.data);
      } catch (error) {
        console.error("Error fetching branch details:", error);
      }
    };

    const fetchCars = async () => {
      try {
        const carsResponse = await api.get(`/cars/branch/${branchId}`);
        setCars(carsResponse.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchBranchDetails();
    fetchCars();
  }, [branchId]);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2" textAlign="center">
        Branch Details
      </Header>
      <p>
        <strong>Location:</strong> {branch.location} |{"  "}
        <strong>Contact Info:</strong> {branch.contactInfo} |{"  "}
        <strong>Branch Manager:</strong> {branch.branchManagerName || "N/A"}
      </p>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Make</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Price Per Day</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cars.map((car) => (
            <Table.Row key={car.carId}>
              <Table.Cell>{car.carId}</Table.Cell>
              <Table.Cell>{car.brand}</Table.Cell>
              <Table.Cell>{car.model}</Table.Cell>
              <Table.Cell>{car.year}</Table.Cell>
              <Table.Cell>${car.rentalRate}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default AdminBranchCars;
