const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

//list all projects
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//list one specific project
server.get('/projects/:id', (req, res) => {
  const { id } = req.params;

  return res.json(projects[id]);
});

//create a new project
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

//edit one project
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
});

//delete one project
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);

  return res.send();

});

//criar nova tarefa no projeto
server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(tasks);

  return res.json(project);
});



server.listen(3000);