const request = require('supertest');
const express = require('express');
const animeRoutes = require('../routes/anime');

const app = express();
app.use('/api/anime', animeRoutes);

describe('Pruebas para las rutas de anime', () => {
    test('Debería devolver animes populares en /api/anime/trending', async () => {
      const response = await request(app).get('/api/anime/trending');
      
      // Verifica que el status sea 200
      expect(response.status).toBe(200);
      
      // Verifica que el cuerpo tenga la estructura esperada
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('Debería devolver resultados de busqueda en /api/anime/search', async () => {
        const response = await request(app).get('/api/anime/search?query=one piece');
        
        // Verifica que el status sea 200
        expect(response.status).toBe(200);
        
        // Verifica que el cuerpo tenga la estructura esperada
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0);
    });

    test('Debería devolver el anime clickeado en /api/anime/:id', async () => {
        const response = await request(app).get('/api/anime/1');
        
        // Verifica que el status sea 200
        expect(response.status).toBe(200);
        
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id', '1');
      });
});