import Bull from '../../wrappers/bull-wrapper';
import { Job } from 'bull';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

import ImageProcessorService from '../image-processor/image-processor.service';

class QueueManagerService {
  queue = new Bull('image-resize');
  imageProcessorService = new ImageProcessorService();

  constructor() {
    this.queue.on('error', (err: Error) => {
      throw err;
    });
  }

  createJob(sourceImagePath: string) {
    const jobId = uuidv4();
    this.queue.add(
      'resize',
      {
        sourceImagePath: sourceImagePath,
      },
      {
        jobId: jobId,
      }
    );

    return { jobId: jobId };
  }

  async getJob(jobId: string) {
    const job = await this.queue.getJob(jobId);
    return job;
  }

  async cleanJob(job: Job) {
    await job.remove();
    fs.unlinkSync(job.data.sourceImagePath);
    fs.unlinkSync(job.returnvalue.resizedImagePath);
  }
}

export default QueueManagerService;
