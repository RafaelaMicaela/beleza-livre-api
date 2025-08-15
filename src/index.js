const express = require('express');
const app = express();
require('dotenv').config();
const prisma = require('./config/db');

app.use(express.json());
app.use(require('cors')());
app.use(require('helmet')());
app.use(require('morgan')('dev'));

// Rotas (serão adicionadas posteriormente)
app.get('/', (req, res) => res.json({ message: 'API de E-commerce de Cosméticos Veganos' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));