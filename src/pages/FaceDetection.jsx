const image = await faceapi.bufferToImage(myBuffer);
const detection = await faceapi
  .detectSingleFace(image)
  .withFaceLandmarks()
  .withFaceDescriptor();

if (!detection) {
  // face not detected
  return;
}

const descriptors = [detection.descriptor];
const labeledDescriptors = [
  new faceapi.LabeledFaceDescriptors("me", descriptors),
];

const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);

const results = faces.map((fd) => faceMatcher.findBestMatch(fd.descriptor));

console.log(results);
