import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  Call as CallIcon,
  Videocam as VideocamIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { useChat } from "../context/ChatContext";
import HomeBG from "../assets/images/wtsp-home.png";
import MessageInput from "./MessageInput";
import Message from "./Message";

const ChatWindow = () => {
  const { selectedContact, setSelectedContact, contacts, messages } = useChat();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    setSelectedContact(null); 
  };

  
  useEffect(() => {
    const chatWindow = document.getElementById("chat-window");
    const lastMessage = chatWindow?.lastElementChild;
    lastMessage?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  useEffect(() => {
    if (selectedContact && !contacts.find((contact) => contact.id === selectedContact.id)) {
      setSelectedContact(null);
    }
  }, [contacts, selectedContact, setSelectedContact]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e5ddd5",
      }}
    >
      {selectedContact ? (
        <>
          <Box
            sx={{
              backgroundColor: "#075e54",
              color: "white",
              padding: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <IconButton color="inherit" onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Avatar
              sx={{
                marginRight: 2,
                backgroundColor: "#fff",
                color: "#075e54",
                fontWeight: "bold",
              }}
            >
              {selectedContact.name.charAt(0)}
            </Avatar>

            <Typography variant="h6" sx={{ flex: 1 }}>
              {selectedContact.name}
            </Typography>

            <IconButton color="inherit">
              <CallIcon />
            </IconButton>

            <IconButton color="inherit">
              <VideocamIcon />
            </IconButton>

            <IconButton color="inherit" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "8px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: "1rem", color: "#075e54" }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: "1rem", color: "#075e54" }}
              >
                Settings
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ fontSize: "1rem", color: "#075e54" }}
              >
                Log out
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "scroll",
              padding: 2,
              borderBottom: 1,
              borderColor: "#ddd",
              backgroundColor: "#f7f7eb",
              borderRadius: "0 0 8px 8px",
              maxHeight: "calc(100vh - 150px)",
            }}
            id="chat-window"
          >
            <List>
              {messages
                .filter((msg) => msg.contactId === selectedContact.id)
                .map((msg, index) => (
                  <ListItem key={index} disableGutters sx={{  justifyContent: msg.isSender ? "flex-end" : "flex-start",}}>
                    <Message
                      text={msg.text}
                      isSent={msg.isSender}
                      contactName={selectedContact.name}
                    />
                  </ListItem>
                ))}
            </List>
           
          </Box>

          <MessageInput />
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 2,
          }}
        >
          <img
            src={HomeBG}
            alt="homebg"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              color: "#333",
              fontWeight: "bold",
              margin: 2,
            }}
          >
            Select a contact to start chatting
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
