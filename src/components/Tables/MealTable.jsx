import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from "@mui/icons-material/Edit";
import MealForm from "../MealForm"; // Importa el componente MealForm

function Row(props) {
  const { row, onEditClick } = props; // Agrega la prop onEditClick
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.calories}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.hour}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="edit row"
            size="small"
            onClick={() => onEditClick(row)} // Llama a la función onEditClick con la fila
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Calories</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.foods.map((foodRow) => (
                    <TableRow key={foodRow.name}>
                      <TableCell component="th" scope="row" align="center">
                        {foodRow.name}
                      </TableCell>
                      <TableCell align="center">{foodRow.calories}</TableCell>
                      <TableCell align="center">{foodRow.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rowsPerPage = 5; // Number of rows per page

export default function MealTable() {
  const [page, setPage] = useState(0);
  const [meals, setMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Agrega estado para controlar la apertura del modal
  const [editMeal, setEditMeal] = useState(null); // Agrega estado para datos de comida en modo edición

  const getMeals = async () => {
    const response = await fetch('http://localhost:3001/api/meals/user/' + localStorage.getItem('userId'), {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    });
    const data = await response.json();
    setMeals(data.data);
  }

  useEffect(() => {
    getMeals();
  }, [meals]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleEditClick = (meal) => {
    setEditMeal(meal); // Establece los datos de comida para editar
    setIsModalOpen(true); // Abre el modal de edición
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold' }} align='center'>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Total Calories</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Date&nbsp;</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Hours&nbsp;</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ textAlign: 'center' }}>
          {(meals.length > 0) ? (
            meals.slice(startIndex, endIndex).map((row) => (
              <Row
                key={row.name}
                row={row}
                sx={{ textAlign: 'center' }}
                onEditClick={handleEditClick} // Pasa la función de manejo de edición como prop
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No meals to show
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div>
        <IconButton onClick={(e) => handleChangePage(e, page - 1)} disabled={page === 0}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={(e) => handleChangePage(e, page + 1)} disabled={endIndex >= meals.length}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      {/* Modal de edición */}
      <MealForm
        open={isModalOpen}
        setOpen={setIsModalOpen}
        initialData={editMeal} // Pasa los datos de comida en modo edición al formulario
      />
    </TableContainer>
  );
}
