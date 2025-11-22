import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import * as jsonServer from 'json-server';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

app.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'API Adrenalina Racing está funcionando!' });
});

app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username e password são obrigatórios' });
  }

  const db = router.db;
  const users = db.get('users').value();
  const user = users.find((u: any) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  res.json({
    success: true,
    message: 'Login realizado com sucesso',
    user: { id: user.id, username: user.username }
  });
});

app.use('/api', middlewares);
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📦 JSON Server disponível em http://localhost:${PORT}/api`);
});

