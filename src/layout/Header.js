import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import { useAuth } from "../contexts/AuthContext";
import { primaryObj } from "../util/colors";

const CustomMenuItem = ({ children, to }) => (
  <Link to={to} style={{ color: "inherit", textDecoration: "none" }}>
    <div
      style={{
        padding: 10,
        fontSize: 16,
      }}
    >
      {children}
    </div>
  </Link>
);

const Header = () => {
  const { isAuthenticated, isAdmin, isUser, isBranchManager, isCarOwner } =
    useAuth();
  const navigate = useNavigate();
  const dashBoardUrl = isAdmin()
    ? "/admin/dashboard"
    : isBranchManager()
    ? "/branch-manager/dashboard"
    : isCarOwner()
    ? "/car-owner/cars"
    : "/user/bookings";

  return (
    <Segment inverted secondary>
      <Menu fixed="top" inverted style={{ ...primaryObj }}>
        <div
          onClick={() => navigate("/")}
          header
          style={{
            padding: 3,
            marginRight: "auto",
            marginLeft: 30,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: 65,
          }}
        >
          <div
            style={{
              padding: 20,
              cursor: "pointer",
            }}
          >
            <b style={{ fontSize: 25 }}>
              <strong>Road Trip Rentals</strong>
            </b>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 150,
            fontSize: 14,
          }}
        >
          {!isAdmin() && (
            <CustomMenuItem to="/vehicle-search">Search Cars</CustomMenuItem>
          )}

          {isUser() && (
            <CustomMenuItem to="/user/profile">Profile</CustomMenuItem>
          )}
          {isAuthenticated() ? (
            <>
              <CustomMenuItem to={dashBoardUrl}>Dashboard</CustomMenuItem>
              <CustomMenuItem to="/logout">Logout</CustomMenuItem>
            </>
          ) : (
            <>
              <CustomMenuItem to="/register">Register</CustomMenuItem>
              <CustomMenuItem to="/login">Login</CustomMenuItem>
            </>
          )}
        </div>
      </Menu>
    </Segment>
  );
};

export default Header;
