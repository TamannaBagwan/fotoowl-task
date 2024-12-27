import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
  IconButton,
  Avatar,
  InputBase,
  Button,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  PersonAdd,
} from "@mui/icons-material";
import { useChat } from "../context/ChatContext";
const ContactList = () => {
  const {
    contacts,
    addContact,
    editContact,
    deleteContact,
    setSelectedContact,
  } = useChat();

  const [searchTerm, setSearchTerm] = useState("");
  const [newContactName, setNewContactName] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [editingContactId, setEditingContactId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedNumber, setEditedNumber] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveEdit = (id) => {
    if (editedName.trim() && editedNumber.trim()) {
      editContact(id, editedName.trim(), editedNumber.trim());
      setEditingContactId(null);
      setEditedName("");
      setEditedNumber("");
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "300px", md: "350px" },
        maxHeight: "100vh",
        overflowY: "auto",
        backgroundColor: "#f8f9fa",
        borderRight: 1,
        borderColor: "#ddd",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          padding: 2,
          borderBottom: 1,
          borderColor: "#ddd",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <IconButton size="small">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search or start a new chat"
          inputProps={{ "aria-label": "Search or start a new chat" }}
        />
      </Box>

      <List sx={{ flex: 1 }}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <React.Fragment key={contact.id}>
              <ListItem
                button
                onClick={() => setSelectedContact(contact)}
                sx={{
                  paddingY: 1,
                  cursor: "pointer",
                  paddingX: 2,
                  display: "flex",
                  alignItems: "center",
                  "&:hover": {
                    backgroundColor: "#e1e1e1",
                  },
                }}
              >
                <Avatar
                  sx={{
                    marginRight: 2,
                    backgroundColor: "#075e54",
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    fontSize: { xs: "14px", sm: "16px" },
                  }}
                >
                  {contact.name.charAt(0)}
                </Avatar>
                {editingContactId === contact.id ? (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        size="small"
        variant="standard"
        sx={{
          marginBottom: 1,
          "& .MuiInputBase-root": {
            padding: 0,
            border: "none",
            outline: "none",
          },
        }}
      />
      <TextField
        value={editedNumber}
        onChange={(e) => setEditedNumber(e.target.value)}
        size="small"
        variant="standard"
        sx={{
          "& .MuiInputBase-root": {
            padding: 0,
            border: "none",
            outline: "none",
          },
        }}
      />
    </Box>
  ) : (
    <ListItemText
      primary={contact.name}
      secondary={contact.phone}
      sx={{
        fontSize: { xs: "14px", sm: "16px" },
        color: "#333",
        fontWeight: "bold",
      }}
    />
  )}

  {editingContactId === contact.id ? (
    <IconButton
      size="small"
      onClick={() => handleSaveEdit(contact.id)}
    >
      <SaveIcon />
    </IconButton>
  ) : (
    <IconButton
      size="small"
      onClick={() => {
        setEditingContactId(contact.id);
        setEditedName(contact.name);
        setEditedNumber(contact.phone);
      }}
    >
      <EditIcon />
    </IconButton>
  )}

  <IconButton
    size="small"
    onClick={() => deleteContact(contact.id)}
  >
    <DeleteIcon />
  </IconButton>
              </ListItem>
              <Divider sx={{ marginX: 1 }} />
            </React.Fragment>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{
              padding: 2,
              textAlign: "center",
              color: "#aaa",
            }}
          >
            No contacts found
          </Typography>
        )}
      </List>

      <Box
        sx={{
          padding: 2,
          borderTop: 1,
          borderColor: "#ddd",
          backgroundColor: "#fff",
        }}
      >
        <InputBase
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)}
          placeholder="Enter contact name"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "#ddd",
            padding: 1,
          }}
        />
        <InputBase
          value={newContactNumber}
          onChange={(e) => setNewContactNumber(e.target.value)}
          placeholder="Enter contact number"
          fullWidth
          sx={{
            mb: 1,
            borderColor: "#ddd",
            padding: 1,
          }}
        />

        <Button
          onClick={() => {
            if (newContactName.trim() && newContactNumber.trim()) {
              addContact(newContactName, newContactNumber);
              setNewContactName("");
              setNewContactNumber(""); 
            }
          }}
          variant="contained"
          sx={{
            backgroundColor: "#075e54",
            color: "#fff",
            "&:hover": { backgroundColor: "#056c48" },
            textTransform: "none",
          }}
          startIcon={<PersonAdd />}
          fullWidth
          disabled={!newContactName.trim() || !newContactNumber.trim()} 
        >
          Add Contact
        </Button>
      </Box>
    </Box>
  );
};

export default ContactList;
