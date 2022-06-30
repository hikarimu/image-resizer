import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';

import QueueManagerRoute from './modules/queue-manager/queue-manager.route';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(logger('dev'));

app.use('/', new QueueManagerRoute().router);

// to catch all unexpected error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(500).json({
      message: 'Something went wrong!',
    });
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
