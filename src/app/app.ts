import express, { Express } from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';

import QueueManagerRoute from './modules/queue-manager/queue-manager.route';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(logger('dev'));

app.use('/', new QueueManagerRoute().router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
