import Bull, { QueueOptions } from 'bull';

class BullWrapper extends Bull {
  constructor(queueName: string) {
    const queueOptions: QueueOptions = {
      redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
      },
    };

    super(queueName, queueOptions);
  }
}

export default BullWrapper;
