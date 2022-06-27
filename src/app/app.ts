import express, { Express } from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.use(logger('dev'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
