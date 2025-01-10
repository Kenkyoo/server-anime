const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors')

require('dotenv').config();

app.use(cors())

const animeRoutes = require('./routes/anime');

app.use('/api/anime', animeRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Error interno del servidor.' });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})