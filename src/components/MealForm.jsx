import React, { useEffect, useState } from 'react';
import { TextField, Button,Modal,
  Box, } from '@mui/material';
import Autocomplete  from './Autocomplete/Autocomplete'

const MealForm = ({open,setOpen}) => {
  const [newMeal, setNewMeal] = useState({ name: '', date:'',hour:'',foods:['Carne','Pure'] });
  const [errorMessage, setErrorMessage] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const handleAddMeal = () => {
    if ( newMeal.name === '') {
      setErrorMessage(true);
      return;
  } else{
      fetch('http://localhost:3001/api/meals', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem('token')
          },
          body: JSON.stringify(newMeal)
      }).then(function(response) {
          if(response.status === 200){
              console.log("Se creo la comida")
              closeModal();
              
          }
          else{
              setErrorMessage(true);
              console.log("Hubo un error creando la comida")
          } 
      });
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
    <div>
    
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newMeal.name}
        onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
      />
      <TextField
        label="Date"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newMeal.date}
        onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
      />
      <TextField
        label="Hour"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newMeal.hour}
        onChange={(e) => setNewMeal({ ...newMeal, hour: e.target.value })}
      />
      <Autocomplete/>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddMeal}
        sx={{ mt: 3, mb: 2, backgroundColor: '#373D20', '&:hover': {backgroundColor: '#373D20'}, fontWeight: 'bold' }}
        fullWidth
      >
        Agregar
      </Button>
    </div>
    </Box>
    </Modal>
  );
};

export default MealForm;



