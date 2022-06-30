import { Request, Response } from 'express';
import path from 'path';

import QueueManagerController from '../../../../src/app/modules/queue-manager/queue-manager.controller';
const queueManagerController = new QueueManagerController();

test('test empty req create job', async () => {
  const request = {};
  const response: any = {
    status: jest.fn(() => response),
    json: jest.fn(() => response),
  };
  await queueManagerController.createJob(
    request as Request,
    response as Response
  );
  expect(response.status).toHaveBeenCalledWith(400);
});

describe('create and retrieve job', () => {
  let jobId = '';
  test('create job', async () => {
    const exampleResponse = { jobId: expect.any(String) };
    const request = {
      file: {
        path: path.resolve(__dirname, '../../../../pub/test-image/test.jpg'),
      },
    };
    const response: any = {
      status: jest.fn(() => response),
      json: jest.fn(() => response),
    };
    await queueManagerController.createJob(
      request as Request,
      response as Response
    );
    const responseMessage = response.json.mock.calls[0][0];
    jobId = responseMessage.jobId;
    expect(responseMessage).toMatchObject(exampleResponse);
  });

  test('get job', async () => {
    const request: any = {
      params: {
        jobId: jobId,
      },
    };
    const response: any = {
      status: jest.fn(() => response),
      json: jest.fn(() => response),
    };
    await queueManagerController.getJob(
      request as Request<{ jobId: string }>,
      response as Response
    );
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
