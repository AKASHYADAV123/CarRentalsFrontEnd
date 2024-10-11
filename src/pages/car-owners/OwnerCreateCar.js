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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const carBrands = [
  { key: "toyota", text: "Toyota", value: "Toyota" },
  { key: "honda", text: "Honda", value: "Honda" },
  { key: "ford", text: "Ford", value: "Ford" },
  { key: "chevrolet", text: "Chevrolet", value: "Chevrolet" },
  { key: "bmw", text: "BMW", value: "BMW" },
];

const OwnerCreateCar = () => {
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: "",
    description: "",
    proposedOwnerRent: "",
    branchId: "",
    image: null,
  });
  const [errors, setErrors] = useState({
    brand: "",
    model: "",
    year: "",
    description: "",
    proposedOwnerRent: "",
    branchId: "",
    image: "",
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/branches");
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e, { name, value } = {}) => {
    if (!name || !value) {
      name = e?.target?.name;
      value = e?.target?.value;
    }
    setCarData({ ...carData, [name]: value });
  };

  const handleImageChange = (e) => {
    setCarData({ ...carData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    // Reset errors
    setErrors({
      brand: "",
      model: "",
      year: "",
      description: "",
      proposedOwnerRent: "",
      branchId: "",
      image: "",
    });

    // Validation
    let formIsValid = true;
    const updatedErrors = {};

    if (!carData.brand) {
      updatedErrors.brand = "Brand is required";
      formIsValid = false;
    }

    if (!carData.model) {
      updatedErrors.model = "Model is required";
      formIsValid = false;
    }

    if (!carData.year) {
      updatedErrors.year = "Year is required";
      formIsValid = false;
    }

    if (!carData.description) {
      updatedErrors.description = "Description is required";
      formIsValid = false;
    }

    if (!carData.proposedOwnerRent) {
      updatedErrors.proposedOwnerRent = "Proposed Owner Rent is required";
      formIsValid = false;
    }

    if (!carData.image) {
      updatedErrors.image = "Image is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      setLoading(false);
      return;
    }

    // Handle car creation logic here
    try {
      const formData = new FormData();

      formData.append("image", carData.image);
      formData.append(
        "carDto",
        JSON.stringify({
          ...carData,
          image: null,
          status: "Pending",
          ownerId: user?.userId,
        })
      );

      await api.post("/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/car-owner/cars");
      }, 1000);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh", marginTop: 80 }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Create New Car
        </Header>
        {success && (
          <Message positive>
            <Message.Header>Car created successfully!</Message.Header>
            <p>You can now view it in the cars list.</p>
          </Message>
        )}
        <Form size="large" loading={loading} onSubmit={handleSubmit}>
          <Form.Field>
            <Dropdown
              placeholder="Select Brand"
              fluid
              selection
              options={carBrands}
              name="brand"
              value={carData.brand}
              onChange={handleChange}
              error={errors.brand ? true : false}
            />
            {errors.brand && (
              <div style={{ color: "red", marginBottom: 8 }}>
                {errors.brand}
              </div>
            )}
          </Form.Field>

          <Form.Input
            fluid
            placeholder="Model"
            name="model"
            value={carData.model}
            onChange={handleChange}
            error={errors.model ? true : false}
          />
          {errors.model && (
            <div style={{ color: "red", marginBottom: 8 }}>{errors.model}</div>
          )}

          <Form.Input
            fluid
            type="number"
            placeholder="Year"
            name="year"
            value={carData.year}
            onChange={handleChange}
            error={errors.year ? true : false}
          />
          {errors.year && (
            <div style={{ color: "red", marginBottom: 8 }}>{errors.year}</div>
          )}

          <Form.TextArea
            placeholder="Description"
            name="description"
            value={carData.description}
            onChange={handleChange}
            error={errors.description ? true : false}
          />
          {errors.description && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {errors.description}
            </div>
          )}

          <Form.Input
            fluid
            placeholder="Proposed Owner Rent"
            name="proposedOwnerRent"
            type="number"
            value={carData.proposedOwnerRent}
            onChange={handleChange}
            error={errors.proposedOwnerRent ? true : false}
          />
          {errors.proposedOwnerRent && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {errors.proposedOwnerRent}
            </div>
          )}

          <Form.Field error={errors.branchId ? true : false}>
            <label>Select Branch</label>
            <select
              name="branchId"
              value={carData.branchId}
              onChange={handleChange}
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.branchId} value={branch.branchId}>
                  {branch.branchName} - {branch.location}
                </option>
              ))}
            </select>
            {errors.branchId && (
              <div style={{ color: "red", marginTop: 4 }}>
                {errors.branchId}
              </div>
            )}
          </Form.Field>

          <Form.Field error={errors.image ? true : false}>
            <input type="file" onChange={handleImageChange} />
            {errors.image && (
              <div style={{ color: "red", marginTop: 4 }}>{errors.image}</div>
            )}
          </Form.Field>

          <Button fluid color="green" size="large" type="submit">
            Create Car
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default OwnerCreateCar;
