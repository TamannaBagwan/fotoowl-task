
import React, { createContext, useContext, useState, useEffect } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, phone) => {
    const newContact = { id: Date.now(), name, phone }; 
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };
  

  const editContact = (id, newName, newPhone) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, name: newName, phone: newPhone } : contact
      )
    );
  };
  // Delete a contact
  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
    if (selectedContact?.id === id) {
      setSelectedContact(null); 
    }
  };

  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    if (selectedContact) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { contactId: selectedContact.id, text: message, isSender: true },
      ]);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        selectedContact,
        setSelectedContact,
        contacts,
        addContact,
        editContact,
        deleteContact,
        messages,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
