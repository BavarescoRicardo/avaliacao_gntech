const express = require('express');
const { sequelize } = require('./config/database');
const githubRoutes = require('./routes/github.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json'); // Verifique o caminho!
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Para lidar com requisições JSON

// Rotas do GitHub
app.use('/api/github', githubRoutes);

// Rotas do Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota padrão para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('Servidor rodando!');
});

// Sincronize o banco de dados e inicie o servidor
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });