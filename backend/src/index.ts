import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';
import { requestLogger } from './middlewares/requestLogger';
import aeronaveRoutes from './routes/aeronave.routes';
import etapaRoutes from './routes/etapa.routes';
import funcionarioRoutes from './routes/funcionario.routes';
import pecaRoutes from './routes/peca.routes';
import testeRoutes from './routes/teste.routes';
import usuarioRoutes from './routes/usuario.routes';
import producaoRoutes from './routes/producao.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/aeronaves', aeronaveRoutes);
app.use('/api/etapas', etapaRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/pecas', pecaRoutes);
app.use('/api/testes', testeRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/producoes', producaoRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Servidor funcionando' });
});

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Conexao com banco de dados estabelecida');
  } catch (error) {
    console.error('Erro ao conectar com banco de dados:', error);
    process.exit(1);
  }
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
