import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Dropdown,
} from "semantic-ui-react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

const EditBranch = () => {
  const { branchId: id } = useParams(); // Get the branch ID from the URL params
  const [branchData, setBranchData] = useState({
    branchName: "",
    location: "",
    contactInfo: "",
    branchManagerId: null,
  });
  const [errors, setErrors] = useState({
    branchName: "",
    location: "",
    contactInfo: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [branchManagers, setBranchManagers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch branch details based on ID
    const fetchBranchDetails = async () => {
      try {
        const response = await api.get(`/branches/${id}`);
        const branch = response.data;
        setBranchData({
          branchName: branch.branchName,
          location: branch.location,
          contactInfo: branch.contactInfo,
          branchManagerId: branch.branchManagerId,
        });
      } catch (error) {
        console.error("Error fetching branch details:", error);
      }
    };

    // Fetch branch managers
    const fetchBranchManagers = async () => {
      try {
        const response = await api.get("/branch-managers");
        const branchesResponse = await api.get("/branches");

        // Get IDs of managers who are already assigned to branches
        const assignedManagerIds = branchesResponse.data.map(
          (branch) => branch.branchManagerId
        );

        // Filter out branch managers who are already assigned
        const availableBranchManagers = response.data.filter(
          (manager) => !assignedManagerIds.includes(manager.managerId)
        );

        setBranchManagers(availableBranchManagers);
      } catch (error) {
        console.error("Error fetching branch managers:", error);
      }
    };

    fetchBranchDetails();
    fetchBranchManagers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== "contactInfo") {
      setBranchData({ ...branchData, [name]: value });
      return;
    }

    // Format contact info
    let formattedValue = value.replace(/\D/g, ""); // Remove non-digit characters
    if (formattedValue.length > 10) {
      formattedValue = formattedValue.substring(0, 10); // Limit to 10 digits
    }
    if (formattedValue.length > 3 && formattedValue.length <= 6) {
      formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
        3
      )}`;
    } else if (formattedValue.length > 6) {
      formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
        3,
        6
      )}-${formattedValue.slice(6)}`;
    }

    setBranchData({ ...branchData, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Reset errors
    setErrors({ branchName: "", location: "", contactInfo: "" });

    // Validation
    let formIsValid = true;
    const updatedErrors = {};

    if (!branchData.branchName) {
      updatedErrors.branchName = "Branch name is required";
      formIsValid = false;
    }

    if (!branchData.location) {
      updatedErrors.location = "Location is required";
      formIsValid = false;
    }

    if (!branchData.contactInfo) {
      updatedErrors.contactInfo = "Contact info is required";
      formIsValid = false;
    }

    if (!branchData.branchManagerId) {
      updatedErrors.branchManagerId = "Branch manager is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      setLoading(false);
      return;
    }

    // Handle branch update logic here
    try {
      await api.put(`/branches/${id}`, branchData);
      setSuccess(true);
      navigate("/admin/branches");
    } catch (error) {
      console.error("Error updating branch:", error);
    }

    setLoading(false);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh", marginTop: 80 }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Edit Branch
        </Header>
        <Form size="large" loading={loading} onSubmit={handleSubmit}>
          <Form.Input
            fluid
            placeholder="Branch Name"
            name="branchName"
            value={branchData.branchName}
            onChange={handleChange}
            error={errors.branchName ? true : false}
          />
          {errors.branchName && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {errors.branchName}
            </div>
          )}

          <Form.Input
            fluid
            placeholder="Location"
            name="location"
            value={branchData.location}
            onChange={handleChange}
            error={errors.location ? true : false}
          />
          {errors.location && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {errors.location}
            </div>
          )}

          <Form.Input
            fluid
            placeholder="Contact Info"
            name="contactInfo"
            value={branchData.contactInfo}
            onChange={handleChange}
            error={errors.contactInfo ? true : false}
          />
          {errors.contactInfo && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {errors.contactInfo}
            </div>
          )}

          <Form.Field error={errors.branchManagerId ? true : false}>
            <Dropdown
              fluid
              selection
              search
              options={branchManagers.map((manager) => ({
                key: manager.id,
                text: manager.name,
                value: manager.managerId,
              }))}
              placeholder="Select Branch Manager"
              onChange={(e, { value }) =>
                setBranchData({ ...branchData, branchManagerId: value })
              }
              value={branchData.branchManagerId}
            />
            {errors.branchManagerId && (
              <div style={{ color: "red", marginTop: 4 }}>
                {errors.branchManagerId}
              </div>
            )}
          </Form.Field>

          <Button fluid color="green" size="large" type="submit">
            Save
          </Button>
        </Form>
        {success && (
          <Message positive>
            <Message.Header>Branch updated successfully!</Message.Header>
            <p>You can now view it in the branches list.</p>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EditBranch;
