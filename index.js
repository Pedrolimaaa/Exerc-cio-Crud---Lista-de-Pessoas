const express = require('express');
const app = express();
app.use(express.json());

let pessoas = [
    {
        id: 1,
        nome: "Pedro",
        idade: 20,
        email: "pedroo@email.com",
        telefone: "619777777"
        
    }


    
];

// Rota para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

// Rota para recuperar todas as pessoas
app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

// Rota para recuperar uma pessoa por ID
app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) return res.status(404).send('Pessoa não encontrada.');
    res.json(pessoa);
});

// Rota para adicionar uma nova pessoa
app.post('/pessoas', (req, res) => {
    const pessoa = req.body;
    pessoa.id = pessoas.length + 1;
    pessoas.push(pessoa);
    res.status(201).json(pessoa);
});

// Rota para atualizar uma pessoa por ID
app.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoaIndex = pessoas.findIndex(p => p.id === id);
    if (pessoaIndex === -1) return res.status(404).send('Pessoa não encontrada.');
    const pessoaAtualizada = { ...pessoas[pessoaIndex], ...req.body };
    pessoas[pessoaIndex] = pessoaAtualizada;
    res.json(pessoaAtualizada);
});

// Rota para remover uma pessoa por ID
app.delete('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pessoas = pessoas.filter(p => p.id !== id);
    res.send('Pessoa removida com sucesso.');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota para adicionar várias pessoas de uma vez
app.post('/pessoas/adicionar-varias', (req, res) => {
    const novasPessoas = req.body;

    novasPessoas.forEach(pessoa => {
        pessoa.id = pessoas.length + 1;
        pessoas.push(pessoa);
    });

    res.status(201).json(novasPessoas);
});
