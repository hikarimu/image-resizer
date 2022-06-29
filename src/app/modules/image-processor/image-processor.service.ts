import Bull from '../../wrappers/bull-wrapper';
import resizeProcessor from './image-processor.processor';
class ImageProcessorService {
  public queue = new Bull('image-resize');

  constructor() {
    this.processDataOnEvent();
  }

  processDataOnEvent() {
    this.queue.process('resize', resizeProcessor);
  }
}

export default ImageProcessorService;
