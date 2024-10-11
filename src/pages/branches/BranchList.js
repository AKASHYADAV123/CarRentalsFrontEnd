import React, { useState, useEffect } from "react";
import { Container, Header, Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [branchManagers, setBranchManagers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchesResponse = await api.get("/branches");
        const branchManagersResponse = await api.get("/branch-managers");

        const branchManagerMap = {};
        branchManagersResponse.data.forEach((manager) => {
          branchManagerMap[manager.managerId] = manager.name;
        });

        setBranchManagers(branchManagerMap);
        setBranches(branchesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2" textAlign="center">
        Branches
      </Header>
      <Button
        as={Link}
        to="/admin/branches/create-branch"
        color="green"
        content="Create Branch"
        icon="plus"
        labelPosition="left"
        style={{ marginBottom: "1rem" }}
      />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Contact Info</Table.HeaderCell>
            <Table.HeaderCell>Branch Manager</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {branches.map((branch) => (
            <Table.Row key={branch.branchId}>
              <Table.Cell>{branch.branchId}</Table.Cell>
              <Table.Cell>{branch.branchName}</Table.Cell>
              <Table.Cell>{branch.location}</Table.Cell>
              <Table.Cell>{branch.contactInfo}</Table.Cell>
              <Table.Cell>
                {branch.branchManagerId ? (
                  <span>{branchManagers[branch.branchManagerId] || "N/A"}</span>
                ) : (
                  "N/A"
                )}
              </Table.Cell>
              <Table.Cell>
                <Button
                  as={Link}
                  to={`/admin/branches/edit-branch/${branch.branchId}`}
                  color="blue"
                  icon="edit"
                  content="Edit"
                />
                <Button
                  as={Link}
                  to={`/admin/branches/${branch.branchId}/cars`}
                  color="teal"
                  icon="car"
                  content="View Cars"
                  style={{ marginLeft: "0.5rem" }}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default BranchList;
