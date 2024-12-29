import React from "react";
import { Box, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const Message = ({ text, isSent, contactName }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
        <Typography variant="body2" sx={{ fontWeight: "bold", fontSize:{xs:'15px',sm:'18px',md:"15px"}
 }}>
          {isSent ? "You" : contactName }
        </Typography>
        <Typography
          sx={{
            marginBottom: "4px",
            wordBreak: "break-word",
            fontSize:{xs:'15px',sm:'22px',md:"15px"}
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
                fontSize:'20px',
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
