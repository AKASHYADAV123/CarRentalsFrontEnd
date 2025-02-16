import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import api from "../../api/api";
import { useAuth } from "../../contexts/AuthContext";

const BranchManagerEditCar = () => {
  const { carId: id } = useParams();
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: "",
    description: "",
    rentalRate: "",
    branchId: "",
    image: null,
    status: "",
  });
  const [errors, setErrors] = useState({
    brand: "",
    model: "",
    year: "",
    description: "",
    rentalRate: "",
    branchId: "",
    image: "",
    status: "",
  });
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`);
        const car = response.data;
        setCarData({
          ...car,
          brand: car.brand,
          model: car.model,
          year: car.year,
          description: car.description,
          rentalRate: car.rentalRate,
          branchId: car.branchId || user?.assignedBranchId || "",
          image: null, // Reset the image field
          status: car.status || "", // Assuming the status field exists in the car data
        });
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await api.get("/branches");
        setBranches(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchCar();
    fetchBranches();
  }, [id, user?.assignedBranchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      rentalRate: "",
      branchId: "",
      image: "",
      status: "",
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

    if (!carData.rentalRate) {
      updatedErrors.rentalRate = "Rental Rate is required";
      formIsValid = false;
    }

    if (!carData.branchId) {
      updatedErrors.branchId = "Branch is required";
      formIsValid = false;
    }

    if (!carData.status) {
      updatedErrors.status = "Status is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(updatedErrors);
      setLoading(false);
      return;
    }

    // Handle car update logic here
    try {
      const formData = new FormData();

      if (carData.image) {
        formData.append("image", carData.image);
      }

      formData.append(
        "carDto",
        JSON.stringify({
          ...carData,
          image: null,
        })
      );

      await api.put(`/cars/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/branch-manager/cars");
      }, 1000);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  console.log(Boolean(carData?.ownerId), carData);

  return (
    <Grid textAlign="center" style={{ height: "100vh", marginTop: 80 }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Edit Car
        </Header>
        <Form size="large" loading={loading} onSubmit={handleSubmit}>
          <Form.Input
            fluid
            placeholder="Brand"
            name="brand"
            value={carData.brand}
            onChange={handleChange}
            error={errors.brand ? true : false}
          />
          {errors.brand && (
            <div style={{ color: "red", marginBottom: 8 }}>{errors.brand}</div>
          )}

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
            placeholder="Year"
            name="year"
            type="number"
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
            placeholder="Rental Rate"
            name="rentalRate"
            value={carData.rentalRate}
            onChange={handleChange}
            error={errors.rentalRate ? true : false}
          />
          {errors.rentalRate && (
            <div style={{ color: "red", marginBottom: 8 }}>
              {errors.rentalRate}
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

          <Form.Field error={errors.status ? true : false}>
            <label>Select Status</label>
            <select
              name="status"
              value={carData.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>

              {Boolean(carData?.ownerId) && (
                <>
                  <option value="Rejected">Rejected</option>
                  <option value="Returned">Returned</option>
                </>
              )}
            </select>
            {errors.status && (
              <div style={{ color: "red", marginTop: 4 }}>{errors.status}</div>
            )}
          </Form.Field>

          <Form.Field error={errors.image ? true : false}>
            <input type="file" onChange={handleImageChange} />
            {errors.image && (
              <div style={{ color: "red", marginTop: 4 }}>{errors.image}</div>
            )}
          </Form.Field>

          <Button fluid color="green" size="large" type="submit">
            Update Car
          </Button>
        </Form>
        {success && (
          <Message positive>
            <Message.Header>Car updated successfully!</Message.Header>
            <p>You can now view it in the cars list.</p>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default BranchManagerEditCar;
