import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Modal,
  Box,
  IconButton,
  Grid,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const InfoModal = ({ open, setOpen, newFood, setNewFood }) => {
  const closeModal = () => {
    setOpen(false);
  };
  const handleCarbsInputChange = (e, index) => {
    const inputValue = Number(e.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
      setNewFood({ ...newFood, carbs: inputValue });
    } else {
      setNewFood({ ...newFood, carbs: 0 });
    }
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "2%",
        }}
      >
        <IconButton
          aria-label="Close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            top: "3%",
            right: "10px",
            zIndex: 2,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                inputProps: { min: 1 },
                sx: { textAlign: "center" }, // Center-align text
              }}
              label="Carbs"
              type="number"
              variant="outlined"
              fullWidth
              value={newFood.carbs}
              onChange={(e) => handleCarbsInputChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                inputProps: { min: 1 },
                sx: { textAlign: "center" }, // Center-align text
              }}
              label="Proteins"
              type="number"
              variant="outlined"
              fullWidth
              value={0}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputProps={{
                inputProps: { min: 1 },
                sx: { textAlign: "center" }, // Center-align text
              }}
              label="Fats"
              type="number"
              variant="outlined"
              fullWidth
              value={0}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: "#373D20",
            "&:hover": { backgroundColor: "#373D20" },
            fontWeight: "bold",
          }}
          fullWidth
        >
          Add +Info
        </Button>
      </Box>
    </Modal>
  );
};

export default InfoModal;
