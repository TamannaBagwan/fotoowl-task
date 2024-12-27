
import React from "react";
import { Box } from "@mui/material";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList"; 

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <ContactList sx={{ flex: 1, minWidth: 300 }} />
      <ChatWindow sx={{ flex: 2 }} />
    </Box>
  );
};

export default Dashboard;





