import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const adminUrls = [
  "/admin/dashboard",
  "/admin/branches",
  "/admin/branches/create-branch",
  "/admin/branches/edit-branch/:branchId",
  "/admin/branch-managers",
  "/admin/branch-managers/create",
  "/admin/branch-managers/edit/:branchManagerId",
  "/admin/branches/:branchId/cars",
];

const branchManagerUrls = [
  "/branch-manager/dashboard",
  "/branch-manager/cars",
  "/branch-manager/cars/create",
  "/branch-manager/cars/edit/:carId",
  "/branch-manager/bookings",
  "/branch-manager/bookings/:bookingId/view",
];

const carOwnerUrls = [
  "/car-owner/dashboard",
  "/car-owner/cars",
  "/car-owner/cars/add",
  "/car-owner/cars/edit/:carId",
  "/car-owner/cars/create",
];

const userUrls = [
  "/user/dashboard",
  "/cars/:carId/details/book/payment",
  "/user/bookings",
  "/user/bookings/:bookingId/return-payment",
  "/user/bookings/:bookingId/view",
  "/user/profile",
];

function PrivateRoute({ path, element: Component }) {
  const { isAuthenticated, isAdmin, isBranchManager, isUser, isCarOwner } =
    useAuth();

  let hasAccess = false;
  if (adminUrls.includes(path)) {
    hasAccess = isAuthenticated() && isAdmin();
  } else if (branchManagerUrls.includes(path)) {
    hasAccess = isAuthenticated() && isBranchManager();
  } else if (carOwnerUrls.includes(path)) {
    hasAccess = isAuthenticated() && isCarOwner();
  } else if (userUrls.includes(path)) {
    hasAccess = isAuthenticated() && isUser();
  }
  return <>{hasAccess ? <Component /> : <Navigate to="/access-denied" />}</>;
}

export default PrivateRoute;
