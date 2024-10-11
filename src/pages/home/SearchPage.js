import React, { useState, useEffect } from "react";
import { Container, Grid, Header, Form, Dropdown, Button, Card, Image, Message } from "semantic-ui-react";
import api from "../../api/api"; // Ensure you have an API instance setup
import { carBrands } from "../branch-managers/BranchManagerCreateCar";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [branches, setBranches] = useState([]);
  const [cars, setCars] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await api.get("/branches");
        setBranches(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCars = async () => {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
        setSearchResults(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBranches();
    fetchCars();
  }, []);

  const handleLocationChange = (_, { value }) => {
    setLocation(value);
    handleSearch(value, vehicleType);
  };

  const handleVehicleTypeChange = (_, { value }) => {
    setVehicleType(value);
    handleSearch(location, value);
  };

  const handleSearch = (searchLocation, searchVehicleType) => {
    let filteredCars = cars;
    if (searchLocation) {
      filteredCars = filteredCars.filter(
        (car) => car.branchLocation === searchLocation
      );
    }
    if (searchVehicleType) {
      filteredCars = filteredCars.filter(
        (car) => car.brand === searchVehicleType
      );
    }
    setSearchResults([...filteredCars]);
  };

  console.log(JSON.stringify(cars));




  return (

    <Container fluid style={{ padding: "2rem", marginTop: 20 }}>

      <Grid centered verticalAlign="middle">

        <Grid.Column mobile={16} tablet={8} computer={6}>

          <Header as="h2" textAlign="center" style={{ marginBottom: "1rem", color: "#2c3968" }} >
            Search Rental Vehicles
          </Header>

          <Form size="large" onSubmit={handleSearch}>
            <Form.Group widths="equal">

              <Form.Field>
                <Dropdown placeholder="Select location" fluid selection
                  options={branches.map((branch) => ({
                    key: branch.branchId,
                    text: `${branch.location}`,
                    value: branch.location,
                  }))}
                  onChange={handleLocationChange} value={location} />
              </Form.Field>

              <Form.Field>
                <Dropdown placeholder="Select vehicle type" fluid selection
                  options={[
                    { key: "all", text: "All Vehicle Types", value: "" },
                    ...carBrands,
                  ]}
                  onChange={handleVehicleTypeChange} value={vehicleType} />
              </Form.Field>

            </Form.Group>

            <Button fluid size="large" primary onClick={handleSearch} loading={loading} > Search </Button>

          </Form>



          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message> )
          }
        </Grid.Column>

      </Grid>





      {searchResults.length > 0 && (

        <Container style={{ marginTop: "2rem" }}>

          <Header as="h2" textAlign="center" style={{ marginBottom: "1rem" }}> Search Results </Header>

          <Card.Group itemsPerRow={4}>

            {searchResults
              .filter((car) => car.status === "Approved")
              .map((result, index) => (

                <Card key={index} style={{ borderRadius: 0, cursor: "pointer" }} >
                  <Image
                    src={
                      result.imageUrl &&
                      require(`../../images/cars/${result.imageUrl}`)
                        ? require(`../../images/cars/${result.imageUrl}`)
                        : require("../../images/cars/default_car.jpeg")
                    }
                  />

                  <Card.Content>
                    <Card.Header>{result.brand}</Card.Header>
                    <Card.Meta>Model: {result.model}</Card.Meta>
                    <Card.Meta>Rental Rate Per Day: ${result.rentalRate}</Card.Meta>
                    <Card.Description>{result.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button primary floated="right" onClick={() => navigate(`/cars/${result.carId}/details`)} >
                      Rent Now
                    </Button>
                  </Card.Content>

                </Card>

              ))}


          </Card.Group>
        </Container>
      )}
    </Container>
  );
};

export default SearchPage;
