const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const estaAutenticado = require('./middleware/autenticador.js');

//CONFIGURAÇÕES
    //Definindo pasta public
    app.use(express.static(path.join(__dirname, 'public')));

    //Body Parser
    app.use(bodyParser.urlencoded({ extended: false }));

    //Session
    app.use(session({
        secret: "trabalho",
        resave: "true",
        saveUninitialized: "true"
    }));

//Rotas
    //Página Home
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    });

    //Página de Login
    app.get('/login.html', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });

    //Chama todos os artigos
    app.get('/todos', (req, res) => {
        const itens = JSON.parse(fs.readFileSync(__dirname + '/data/articles.json'));
        return res.status(200).json(itens);
    });

    //Página do artigo escolhido
    app.get('/artigo/:id', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'artigo.html'));
    });

    //Validação do formulário de Login (incompleto)
    app.post('/logando', (req, res) => {
        const usuarios = JSON.parse(fs.readFileSync(__dirname + '/data/users.json'));
        userTarget = usuarios.filter((item) => item.author_email == req.body.email);

        if (userTarget[0].author_status) {
            req.session.user = userTarget;
            return res.redirect('/admin');
        }
        else {
            return res.redirect('/login.html');
        }
    });

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});