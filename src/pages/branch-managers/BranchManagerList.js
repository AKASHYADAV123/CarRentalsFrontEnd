import React, { useState, useEffect } from "react";
import { Container, Header, Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const BranchManagerList = () => {
  const [branchManagers, setBranchManagers] = useState([]);

  // Fetch branch managers and branches data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchManagersResponse = await api.get("/branch-managers");
        const branchesResponse = await api.get("/branches");

        const branchManagersWithBranches = branchManagersResponse.data.map(
          (manager) => {
            const managerBranches = branchesResponse.data.filter(
              (branch) => branch.branchManagerId === manager.managerId
            );
            return {
              ...manager,
              branches: managerBranches,
            };
          }
        );

        setBranchManagers(branchManagersWithBranches);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to get branch names for a manager
  const getBranchNamesForManager = (manager) => {
    return manager.branches.map((branch) => branch.branchName).join(", ");
  };

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Header as="h2" textAlign="center">
        Branch Managers
      </Header>
      <Button
        as={Link}
        to="/admin/branch-managers/create"
        color="green"
        content="Create Branch Manager"
        icon="plus"
        labelPosition="left"
        style={{ marginBottom: "1rem" }}
      />
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Branches</Table.HeaderCell>{" "}
            {/* New column for branches */}
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {branchManagers.map((manager) => (
            <Table.Row key={manager.managerId}>
              <Table.Cell>{manager.managerId}</Table.Cell>
              <Table.Cell>{manager.name}</Table.Cell>
              <Table.Cell>{manager.email}</Table.Cell>
              <Table.Cell>{manager.phone}</Table.Cell>
              <Table.Cell>
                {getBranchNamesForManager(manager) || "N/A"}
              </Table.Cell>
              <Table.Cell>
                <Button
                  as={Link}
                  to={`/admin/branch-managers/edit/${manager.managerId}`}
                  color="blue"
                  icon="edit"
                  content="Edit"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default BranchManagerList;
