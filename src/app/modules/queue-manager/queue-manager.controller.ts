import { Request, Response } from 'express';

import QueueManagerService from './queue-manager.service';

class QueueManagerController {
  private queueManagerService: QueueManagerService = new QueueManagerService();

  createJob = (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'no image sent',
      });
    }

    const job = this.queueManagerService.createJob(
      req.file.filename,
      req.file.path
    );

    return res.status(202).json(job);
  };

  getJob = async (req: Request<{ jobId: string }>, res: Response) => {
    console.log(req.params.jobId);
    const job = await this.queueManagerService.getJob(req.params.jobId);
    if (job == null) {
      return res.status(404).json({
        message: 'job not found',
      });
    }
    if (job.returnvalue == null) {
      return res.status(200).json({
        message: 'job not done',
      });
    }

    return res.status(200).sendFile(job.returnvalue.resizedImagePath, () => {
      this.queueManagerService.cleanJob(job);
    });
  };
}

export default QueueManagerController;
