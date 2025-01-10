const express = require('express');
const axios = require('axios');

const router = express.Router();
const base_api = 'https://kitsu.io/api/edge/';

// Ruta para animes populares
router.get('/trending', (req, res) => {
  axios.get(`${base_api}trending/anime`)
    .then(response => res.send(response.data))
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Error obteniendo animes populares.' });
    });
});

router.get('/anime', (req, res) => {
  axios.get(`${base_api}anime`)
  .then(function (response) {
    res.send(response.data);
    console.log(response.data);
  })
  .catch(function (error) {
    // manejar error
    console.log(error);
  })
})

// Ruta para buscar animes por texto
router.get('/search', (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).send({ error: 'El parámetro "query" es requerido.' });
  }
  axios.get(`${base_api}anime?filter[text]=${query}`)
    .then(response => res.send(response.data))
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Error en la búsqueda de animes.' });
    });
});

// Ruta para obtener detalles de un anime por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  axios.get(`${base_api}anime/${id}`)
    .then(response => res.send(response.data))
    .catch(error => {
      console.error(error);
      res.status(500).send({ error: 'Error obteniendo detalles del anime.' });
    });
});

module.exports = router; // Exportar el Router
