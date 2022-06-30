# Image Resizer
## Introduction
A simple project to resize image with long running process architecture.

Simplified flow:
1. User post a job with a file image 
2. Service queue the job 
3. Image processor handle the image resize process 
4. User get the finished job or repeatedly poll the job to check if it finished.

The implementation is really simple. Queue is implemented using Bull and redis. Images that are posted is saved into a folder in the application volume as well as the resized images. After the finished job is retrieved by user, both images and the job is cleaned up.

## Usage
You can run these commands directly from the root directory (where the package.json is ) for ease of use. 

### Spunning up docker compose

```
docker compose up 
```

### Testing the image resize itself: 
1. Create job using the following curl command or do a POST request to ```http://localhost:3000/resizeImageJob``` with ```multipart/form``` type with ```image``` as the key and the image file as the value.
```
curl -F image=@./pub/test-image/test.jpg http://localhost:3000/resizeImageJob
```
Expected response:
```
{ "jobId" : "<uuid>"}
```

2. Copy jobId (<uuid>) from the response.

3. Get job using the copied jobId (<uuid>).
```
curl http://localhost:3000/resizeImageJob/<uuid>
```

If the job is finished, expected response is the 100px x 100px image in the corresponding image mime type, in binary, with status code 200.

If the job is not finished, expected response is the following with status code 200:
```
{ "message" : "job not done" }
```

If the job is not found, expected response is the following with status code 404:
```
{ "message" : "job not found }
```

Every job that has been finished and retrieved using the get request would be closed and unavailable for any other get request.

## Used Libraries
1. Bull
Bull is the underlying queue library used for the job queue. It uses redis to queue. It also allows seperate services to talk to each other.
2. Sharp
A well known library for image manipulation. 

3. Multer 
Middleware used for image upload. A very known solution to handling file upload in express.

## Missing Features
1. Validation
Most validation are missing from the project. Image format not been safely validated. The easiest solution would be to limit request to ```/resizeImageJob``` to specific image format supported by the sharp library. The safe solution would be using ```file-type``` library to determine the actual format of the file from the buffer magic number. 
2. Tests
Various tests inluding unit tests are missing from the project. The only included test is a integration test for creating a job and getting the job.

## Future Improvement Ideas
1. Using NFS
Image is currently saved directly in the application volume currently. It would be a great idea to store images to a seperate NFS. This NFS could be a docker volume, a seperate containerized service, or using cloud services like Google Cloud Storage or AWS Buckets. 
2. Seperating image processor to another service (virtually creating microservices)
Currently in this implementation, the image processor is spun to a split thread/process for every job but is still in the same service. By seperating the image processor to a seperate service, we can scale them independently.
