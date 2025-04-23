import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const HotelForm = ({ refreshHotels }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    nit: "",
    numero_de_habitaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/hoteles", formData);
      setFormData({
        nombre: "",
        direccion: "",
        ciudad: "",
        nit: "",
        numero_de_habitaciones: "",
      });
      refreshHotels();
      toast.success("Hotel creado exitosamente!");
    } catch (error) {
      toast.error("Error al crear el hotel:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h3>Crear Hotel</h3>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del Hotel"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Dirección"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="NIT"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Número de Habitaciones"
              name="numero_de_habitaciones"
              value={formData.numero_de_habitaciones}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Crear Hotel
        </Button>
      </form>
    </Box>
  );
};

export default HotelForm;
