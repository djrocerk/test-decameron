import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Container,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TableContainer,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast from "react-hot-toast";
import AccommodationForm from "./AccommodationForm";
import RoomTypeForm from "./RoomTypeForm";

const HotelList = ({ hotels, refreshHotels }) => {
  const [open, setOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [error, setError] = useState(null);
  const [newRoom, setNewRoom] = useState({
    cantidad: "",
    tipo: "",
    acomodacion: "",
  });

  const handleEdit = (hotelId) => {
    console.log("Editar hotel con id: ", hotelId);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/hoteles/${hotelToDelete}`);
      toast.success("Hotel eliminado exitosamente!");
      refreshHotels();
      setOpen(false);
      setHotelToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el hotel:", error);
    }
  };

  const handleOpenDialog = (hotelId) => {
    setHotelToDelete(hotelId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setHotelToDelete(null);
  };

  const handleViewDetails = (hotel) => {
    setHotelDetails(hotel);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewRoom({
      ...newRoom,
      [name]: value,
    });
  };

  const handleAddRoom = () => {
    if (!newRoom.cantidad || !newRoom.tipo || !newRoom.acomodacion) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    if (hotelDetails.numero_de_habitaciones < newRoom.cantidad) {
      toast.error(
        "La cantidad de habitaciones excede el número total permitido."
      );
      return;
    }

    setHotelDetails((prevDetails) => ({
      ...prevDetails,
      tipo_habitacions: [
        ...prevDetails.tipo_habitacions,
        {
          cantidad: parseInt(newRoom.cantidad),
          tipo: newRoom.tipo,
          acomodacion: newRoom.acomodacion,
        },
      ],
    }));
    setNewRoom({
      cantidad: "",
      tipo: "",
      acomodacion: "",
    });
    setError(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h3>Listado de Hoteles</h3>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Dirección</strong>
              </TableCell>
              <TableCell>
                <strong>Ciudad</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Habitaciones</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Tipo de Habitaciones</strong>
              </TableCell>

              <TableCell align="center">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    No hay datos disponibles
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              hotels.map((hotel) => (
                <TableRow key={hotel.id} hover>
                  <TableCell>{hotel.nombre}</TableCell>
                  <TableCell>{hotel.direccion}</TableCell>
                  <TableCell>{hotel.ciudad}</TableCell>
                  <TableCell align="center">
                    {hotel.numero_de_habitaciones}
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {hotel.tipo_habitacions &&
                      hotel.tipo_habitacions.length > 0
                        ? hotel.tipo_habitacions[0].tipo
                        : "Sin asignar"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(hotel.id)}
                      size="small"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDialog(hotel.id)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleViewDetails(hotel)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          ¿Estás seguro de que deseas eliminar este hotel?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de detalles */}
      <Dialog open={!!hotelDetails} onClose={() => setHotelDetails(null)}>
        <DialogTitle>Detalles del Hotel</DialogTitle>
        <DialogContent>
          {hotelDetails && (
            <>
              <Typography variant="h6">
                Nombre: {hotelDetails.nombre}
              </Typography>
              <Typography variant="body1">
                Dirección: {hotelDetails.direccion}
              </Typography>
              <Typography variant="body1">
                Ciudad: {hotelDetails.ciudad}
              </Typography>
              <Typography variant="body1">
                Número de Habitaciones: {hotelDetails.numero_de_habitaciones}
              </Typography>

              {/* Tabla de habitacionss */}
              <TableContainer sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Cantidad</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Tipo de Habitación</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Acomodación</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hotelDetails.tipo_habitacions &&
                      hotelDetails.tipo_habitacions.map((room, index) => (
                        <TableRow key={index}>
                          <TableCell>{room.cantidad}</TableCell>
                          <TableCell>{room.tipo}</TableCell>
                          <TableCell>{room.acomodacion}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" sx={{ mt: 2 }}>
                Agregar nueva habitación
              </Typography>
              <TextField
                label="Cantidad"
                name="cantidad"
                type="number"
                value={newRoom.cantidad}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <RoomTypeForm value={newRoom.tipo} onChange={handleChange} />
              <AccommodationForm
                value={newRoom.acomodacion}
                onChange={handleChange}
              />
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHotelDetails(null)} color="primary">
            Cerrar
          </Button>
          <Button onClick={handleAddRoom} color="primary">
            Agregar Habitación
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HotelList;
