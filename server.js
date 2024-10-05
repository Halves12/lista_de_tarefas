const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
 
// Middleware para permitir que o servidor entenda JSON
app.use(express.json());

// Array para armazenar a lista de tarefas
let listaDeTarefas = [];

// Rota GET - Retorna todos os registros da lista de tarefas
app.get('/lista', (req, res) => {
  res.json(listaDeTarefas);
});

// Rota POST - Adiciona registro na lista de tarefas
app.post('/lista', (req, res) => {
  const { titulo, descricao, status, dataCriacao } = req.body;

  // Verificar se os parâmetros estão presentes
  if (!titulo || !descricao || !status || !dataCriacao) {
    return res.status(400).json({ message: 'titulo, descricao, status e data de criação são obrigatórios!' });
  }

  // Criar novo objeto de tarefa
  const novaTarefa = {
    id: listaDeTarefas.length + 1, // gerar ID automaticamente
    titulo,
    descricao,
    status,
    dataCriacao,
  };

  // Adicionar a nova tarefa à lista
  listaDeTarefas.push(novaTarefa);

  // Retornar resposta com a nova tarefa criada
  res.status(201).json({ message: 'Tarefa criada com sucesso!', tarefa: novaTarefa });
});

// Rota PUT - Atualiza um registro da lista por ID
app.put('/lista/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, dataCriacao } = req.body;

  // Verificar se os parâmetros estão presentes
  if (!titulo || !descricao || !status || !dataCriacao) {
    return res.status(400).json({ message: 'titulo, descricao, status e data de criação são obrigatórios!' });
  }

  // Encontrar a tarefa pelo ID
  const tarefaIndex = listaDeTarefas.findIndex(tarefa => tarefa.id === parseInt(id));

  // Verificar se a tarefa foi encontrada
  if (tarefaIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada!' });
  }

  // Atualizar a tarefa
  listaDeTarefas[tarefaIndex] = {
    id: listaDeTarefas[tarefaIndex].id, // Manter o mesmo ID
    titulo,
    descricao,
    status,
    dataCriacao,
  };

  // Retornar resposta com a tarefa atualizada
  res.status(200).json({ message: 'Tarefa atualizada com sucesso!', tarefa: listaDeTarefas[tarefaIndex] });
});



// Rota DELETE - Remove um registro de IMC por ID
app.delete('/lista/:id', (req, res) => {
  const { id } = req.params;

  const index = listaDeTarefas.findIndex(registro => registro.id == id);

  if (index !== -1) {
      const registroDeletado = listaDeTarefas.splice(index, 1);
      res.json({ message: 'Registro de lista deletado com sucesso!', registro: registroDeletado });
  } else {
      res.status(404).json({ message: 'Registro de lista não encontrado' });
  }
});


// Rota principal - Página inicial
app.get('/', (req, res) => {
  res.send('API está funcionando! Bora Codar!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
