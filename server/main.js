const express = require('express');
const axios = require('axios');
const url = require('url');
const validUrl = require('valid-url');
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = 3000;
const frontServer = "http://localhost:5173";

// Middleware para habilitar o CORS apenas para origens confiáveis
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", frontServer);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Limitar as solicitações por IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 500 // Limite de 100 solicitações por IP
});
app.use(limiter);

// Rota para manipular solicitações
app.get('/', async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url, true);
        const URL = parsedUrl.href.substring(8);

        console.debug(URL);
        // Validar a URL antes de fazer a solicitação
        if (!validUrl.isWebUri(URL)) {
            throw new Error('URL inválida');
        }

        const response = await axios.get(URL);
        res.setHeader('Content-Type', 'text/plain');
        
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching HTML content:', error);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            console.error('No response received');
            res.status(500).send('Internal Server Error');
        } else {
            console.error('Error setting up request:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
