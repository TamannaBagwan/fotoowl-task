import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";
import { useChat } from "../context/ChatContext";

const Dashboard = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 600);
  const { selectedContact,setSelectedContact} = useChat();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 600);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      {isMobileView ? (
        selectedContact ? (
          <ChatWindow
            selectedContact={selectedContact}
            onBack={() => setSelectedContact(null)} 
          />
        ) : (
          <ContactList
            onSelectContact={(contact) => setSelectedContact(contact)}
          />
        )
      ) : (
        <>
          <ContactList
            onSelectContact={(contact) => setSelectedContact(contact)}
            selectedContact={selectedContact}
            sx={{ flex: 1, minWidth: 300 }}
          />
          <ChatWindow selectedContact={selectedContact} sx={{ flex: 2 }} />
        </>
      )}
    </Box>
  );
};

export default Dashboard;
