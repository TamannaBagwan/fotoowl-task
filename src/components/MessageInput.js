

import React, { useState } from "react";
import { TextField, IconButton, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../context/ChatContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { sendMessage } = useChat();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      await sendMessage(message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        placeholder="Type a message"
        sx={{
          borderRadius: "20px",
          backgroundColor: "#f1f1f1",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { border: "none" },
          },
          "& .MuiInputBase-input": {
            fontSize: "1rem",
            pt: 1,
            pb: 1,
          },
        }}
        inputProps={{
          "aria-label": "Type your message",
        }}
      />

      <IconButton
        color="success"
        onClick={handleSendMessage}
        disabled={isSending}
        sx={{
          padding: "10px",
          "&:hover": {
            backgroundColor: "#c1e7b3",
          },
        }}
        title="Send Message"
      >
        <SendIcon
          sx={{
            fontSize: "30px",
          }}
        />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
