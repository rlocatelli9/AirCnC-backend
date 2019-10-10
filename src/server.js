const express = require('express'); //instala módulo express
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes'); //importa rotas

const app = express();
const server = http.Server(app);
const io = socketio(server); //envia ou recebe msg

//conexao com BD
mongoose.connect('mongodb+srv://omnistack:admin@r00t@omnistack-faku5.mongodb.net/semana09?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
  //socket.on (para ouvir msg)
  //socret.emit (para enviar msg)

  const { user_id } = socket.handshake.query;
  //id do usuário com o id de conexao dele
  connectedUsers[user_id] = socket.id;
});

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;

  return next();
})

/*Métodos: 
  GET    = Buscar info;
  POST   = Criar info;
  PUT    = Editar info;
  DELETE = Deletar info;

  request.query = Acessar Query Params (para filtros)
  request.params = Acessar Route Params (para edição e delete)
  request.body = Acessar corpo da requisição (para criação e edição)
  */

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(1234, () => {
  console.log('Server started')
});