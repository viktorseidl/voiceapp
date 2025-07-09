//FILE IS USED TO LOAD TFLITE FILES IN APP
//const modelJson = require('./model.tflite'); Or load it dynamically from the file system using expo-file-system.
//Put your .tflite models inside your project’s assets/ folder, like:
//project-root/assets/models/my_model.tflite

//repo https://github.com/mrousavy/react-native-fast-tflite
/*
// Option A: Standalone Function
const model = await loadTensorflowModel(require('assets/my-model.tflite'))

// Option B: Hook in a Function Component
const plugin = useTensorflowModel(require('assets/my-model.tflite'))
//Call the Model:
const inputData = ...
const outputData = await model.run(inputData)
console.log(outputData)

//Models can be loaded either from the React Native bundle using a require(..) statement, or any kind of URI/URL (http://.. or file://..):
// Asset from React Native Bundle
loadTensorflowModel(require('assets/my-model.tflite'))
// File on the local filesystem
loadTensorflowModel({ url: 'file:///var/mobile/.../my-model.tflite' })
// Remote URL
loadTensorflowModel({
  url: 'https://tfhub.dev/google/lite-model/object_detection_v1.tflite',
})
//Then, you can just use it:
const model = await loadTensorflowModel(
  require('assets/my-model.tflite'),
  'android-gpu'
)
// or
const model = await loadTensorflowModel(
  require('assets/my-model.tflite'),
  'nnapi'
)
*/

const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("tflite");

module.exports = config;
