import { Job, DoneCallback } from 'bull';

function processResizeImageJob(job: Job, done: DoneCallback) {
  // implement image resizing
  // simulate delay for now
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), 10000);
  }).then(() => {
    // console.log(job);
    console.log('job processed');
    done(null, { message: 'ok' });
  });
}

export default processResizeImageJob;
