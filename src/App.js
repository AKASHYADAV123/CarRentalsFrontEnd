import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./layout/Layout";
import AdminBranchCars from "./pages/admin/AdminBranchCars";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import BranchManagerCarList from "./pages/branch-managers/BranchManagerCarList";
import BranchManagerCreateCar from "./pages/branch-managers/BranchManagerCreateCar";
import BranchManagerDashboard from "./pages/branch-managers/BranchManagerDashboard";
import BranchManagerEditCar from "./pages/branch-managers/BranchManagerEditCar";
import BranchManagerList from "./pages/branch-managers/BranchManagerList";
import BranchManagerLogin from "./pages/branch-managers/BranchManagerLogin";
import CreateBranchManager from "./pages/branch-managers/CreateBranchManager";
import EditBranchManager from "./pages/branch-managers/EditBranchManager";
import BranchList from "./pages/branches/BranchList";
import CreateBranch from "./pages/branches/CreateBranch";
import EditBranch from "./pages/branches/EditBranch";
import CarOwnerLogin from "./pages/car-owners/CarOwnerLogin";
import CarOwnerRegister from "./pages/car-owners/CarOwnerRegister";
import OwnerCarList from "./pages/car-owners/OwnerCarList";
import OwnerCreateCar from "./pages/car-owners/OwnerCreateCar";
import OwnerEditCar from "./pages/car-owners/OwnerEditCar";
import Home from "./pages/home/Home";
import SearchPage from "./pages/home/SearchPage";
import Login from "./pages/login/Login";
import Logout from "./pages/login/Logout";
import PrivateRoute from "./pages/login/PrivateRoute";
import Register from "./pages/login/Register";
import CarDetails from "./pages/cars/CarDetails";
import PaymentForm from "./pages/cars/PaymentForm";
import UserBookingsList from "./pages/bookings/UserBookingsList";
import BookingDetails from "./pages/bookings/BookingDetails";
import ReturnPaymentForm from "./pages/bookings/ReturnPaymentForm";
import UserProfile from "./pages/user/UserProfile";
import BookingList from "./pages/bookings/UserBookingsList";
import BranchBookingList from "./pages/branch-managers/BranchBookingList";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/user/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/user/register" element={<Register />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/vehicle-search" element={<SearchPage />} />


            {/* <Route
              exact
              path="/"
              element={<PrivateRoute path="/" element={Boards} />}
            /> */}
            {/* Admin urls */}
            <Route exact path="/admin/login" element={<AdminLogin />} />
            
            <Route exact path="/admin/dashboard"
              element={ <PrivateRoute path="/admin/dashboard" element={AdminDashboard} /> }
            />
            <Route exact path="/admin/branches" 
              element={ <PrivateRoute path="/admin/branches" element={BranchList} /> }
            />
            <Route exact path="/admin/branches/create-branch"
              element={ <PrivateRoute path="/admin/branches/create-branch" element={CreateBranch} /> }
            />
            <Route exact path="/admin/branches/edit-branch/:branchId"
              element={ <PrivateRoute path="/admin/branches/edit-branch/:branchId" element={EditBranch} /> }
            />
            <Route exact path="/admin/branches/:branchId/cars"
              element={ <PrivateRoute path="/admin/branches/:branchId/cars" element={AdminBranchCars} /> }
            />
            <Route exact path="/admin/branch-managers"
              element={ <PrivateRoute path="/admin/branch-managers" element={BranchManagerList} /> }
            />
            <Route exact path="/admin/branch-managers/create"
              element={ <PrivateRoute path="/admin/branch-managers/create" element={CreateBranchManager} /> }
            />
            <Route exact path="/admin/branch-managers/edit/:branchManagerId"
              element={ <PrivateRoute path="/admin/branch-managers/edit/:branchManagerId" element={EditBranchManager} /> }
            />
            {/* Branch manager urls */}
            <Route exact path="/branch-manager/login" element={<BranchManagerLogin />} />
            <Route exact path="/branch-manager/dashboard"
              element={ <PrivateRoute path="/branch-manager/dashboard" element={BranchManagerDashboard} /> }
            />
            <Route exact path="/branch-manager/cars"
              element={ <PrivateRoute path="/branch-manager/cars" element={BranchManagerCarList} /> }
            />
            <Route exact path="/branch-manager/cars/create"
              element={ <PrivateRoute path="/branch-manager/cars/create" element={BranchManagerCreateCar} /> }
            />
            <Route exact path="/branch-manager/cars/edit/:carId"
              element={ <PrivateRoute path="/branch-manager/cars/edit/:carId" element={BranchManagerEditCar} /> }
            />
            <Route exact path="/branch-manager/bookings"
              element={ <PrivateRoute path="/branch-manager/bookings" element={BranchBookingList} /> }
            />
            <Route exact path="/branch-manager/bookings/:bookingId/view"
              element={ <PrivateRoute path="/branch-manager/bookings/:bookingId/view" element={BookingDetails} /> }
            />

            <Route exact path="/car-owner/login" element={<CarOwnerLogin />} />
            <Route exact path="/car-owner/register" element={<CarOwnerRegister />} />

            <Route exact path="/car-owner/cars" 
              element={ <PrivateRoute path="/car-owner/cars" element={OwnerCarList} /> }
            />

            <Route exact path="/car-owner/cars/create" 
              element={ <PrivateRoute path="/car-owner/cars/create" element={OwnerCreateCar} /> }
            />

            <Route exact path="/car-owner/cars/edit/:carId"
              element={ <PrivateRoute path="/car-owner/cars/edit/:carId" element={OwnerEditCar} /> }
            />

            <Route exact path="/cars/:carId/details" element={<CarDetails />} />
            <Route exact path="/cars/:carId/details/book/payment"
              element={ <PrivateRoute path="/cars/:carId/details/book/payment" element={PaymentForm} /> }
            />
            <Route exact path="/user/bookings"
              element={ <PrivateRoute path="/user/bookings" element={UserBookingsList} />  }
            />
            <Route exact path="/user/profile"
              element={ <PrivateRoute path="/user/profile" element={UserProfile} /> }
            />
            <Route exact path="/user/bookings/:bookingId/view"
              element={ <PrivateRoute path="/user/bookings/:bookingId/view" element={BookingDetails} /> }
            />
            <Route exact path="/user/bookings/:bookingId/return-payment"
              element={ <PrivateRoute path="/user/bookings/:bookingId/return-payment" element={ReturnPaymentForm} /> }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
