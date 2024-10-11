import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";

const layoutStyle = {
  display: "flex",
  flexDirection: "column", // Stack items vertically
  minHeight: "100vh", // Make sure the layout covers the full height of the viewport
};

const contentStyle = {
  flex: 1,
  marginTop: "20px", // Adjust the top margin based on your header's height,
  //marginLeft: 150,
};

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // Get the current location
  console.log(location);

  return (
    <div style={layoutStyle}>
      <Header />
      <div style={isAuthenticated() ? contentStyle : {}}>{children}</div>
    </div>
  );
};

export default Layout;
