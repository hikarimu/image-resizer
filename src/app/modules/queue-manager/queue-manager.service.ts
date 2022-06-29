import Bull from './bull-wrapper';
import { v4 as uuidv4 } from 'uuid';

import ImageProcessorService from '../image-processor/image-processor.service';

class QueueManagerService {
  queue = new Bull('image-resize');
  imageProcessorService = new ImageProcessorService();

  constructor() {
    this.queue.on('error', (err: Error) => {
      throw err;
    });
  }

  createJob(imageName: string, imagePath: string) {
    const jobId = uuidv4();
    this.queue.add(
      'resize',
      {
        imagePath: imagePath,
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
    // implement getJob
  }
}

export default QueueManagerService;
