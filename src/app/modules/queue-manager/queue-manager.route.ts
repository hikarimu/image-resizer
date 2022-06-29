import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import Route from '../../interfaces/route.interface';
import QueueManagerController from './queue-manager.controller';

class QueueManagerRoute implements Route {
  public router = Router(); // eslint-disable-line new-cap
  private queueManagerController = new QueueManagerController();
  private storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + path.extname(file.originalname));
    },
  });
  private upload = multer({ storage: this.storage });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/resizeImageJob',
      this.upload.single('image'),
      this.queueManagerController.createJob
    );

    this.router.get(
      '/resizeImageJob/:jobId',
      this.queueManagerController.getJob
    );
  }
}

export default QueueManagerRoute;
