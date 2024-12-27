
import React from "react";
import { Box, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const Message = ({ text, isSent, contactName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "10px",
         minWidth:"100px"
      }}
    >
      <Box
        sx={{
          backgroundColor: isSent ? "#dcf8c6" : "#fff",
          padding: "10px",
          borderRadius: "15px",
          boxShadow: 1,
         
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {isSent ? "You" : contactName }
        </Typography>
        <Typography
          sx={{
            marginBottom: "4px",
            wordBreak: "break-word",
          }}
        >
          {text}
        </Typography>

        {isSent && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "4px",
            }}
          >
            <DoneIcon
              sx={{
                fontSize: "22px",
                color: "#888",
                marginLeft: "4px", 
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Message;
