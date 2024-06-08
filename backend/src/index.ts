import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.port || 3001;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
