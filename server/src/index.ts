import express from 'express';
import cors from 'cors';
import { skills, projects } from './data';

const app = express();
app.use(cors());

app.get('/api/skills', (req, res) => {
  res.json(skills);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
