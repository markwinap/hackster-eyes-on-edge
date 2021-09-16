import cryptoRandomString from 'crypto-random-string';
import { writeFile } from 'fs/promises';
import dotenv from 'dotenv';
import mqtt from 'mqtt';
import Image from 'ascii-art-image';
import AWS from 'aws-sdk';
import twilio from 'twilio';
// import base64 from './demo_base64.js';
// import demoData from './demo_data.js';

dotenv.config();
const s3 = new AWS.S3();

const client = mqtt.connect(process.env.MQTT_HOST);
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// Fix float decimals to 2
const getScore = (number) => {
  return (number * 100).toFixed(2)
}
// Display image in console
const displayImg = (path, size = 150) => {
  const image = new Image({
    filepath: path,
    alphabet: 'variant4',
    width: size,
    height: size,
  });
  return new Promise((resolve, reject) => {
    image.write((err, rendered) => {
      if (err) {
        reject(err);
      } else {
        resolve(rendered);
      }
    });
  });
};
// Create Buffer using an array of bytes
const createBuffer = (data) => new Promise((resolve) => {
  const buffer = Buffer.from(data, 'base64');
  resolve(buffer);
});
// List AWS S3 buckets in account
const listS3Buckets = () => new Promise((resolve, reject) => {
  s3.listBuckets((err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
// Upload image to S3 bucket
const uploadImage = (params) => new Promise((resolve, reject) => {
  s3.putObject(params, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
// main functiont to process mqtt message, upload image and send it over whatsapp
const processData = async (message) => {
  try {
    const { score, data } = message;
    console.log('1 - Converte Base64 to buffer');
    const buffData = await createBuffer(data);
    console.log(`Bytes ${buffData.length}`);

    console.log('2 - Write buffer to file');
    await writeFile('images/temp.jpg', buffData);

    console.log('3 - Render Image in console');
    const ascii = await displayImg('images/temp.jpg', 100);
    console.log(ascii);

    console.log('4 - Upload to AWS S3');
    const fileName = cryptoRandomString({ length: 10 });
    const params = {
      ACL: 'public-read',
      Body: buffData,
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${fileName}.jpg`,
    };
    const uploadResult = await uploadImage(params);
    console.log(uploadResult);

    console.log('5 - Send Twilio Multimedia Message');
    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.us-east-2.amazonaws.com/${fileName}.jpg`;

    const messageResponse = await twilioClient.messages
      .create({
         body: `Score ${getScore(score)}$`,
         mediaUrl: [fileUrl],
         from: process.env.TWILIO_FROM,
         to: process.env.TWILIO_TO
       })
      .then(res => res.sid);
    console.log(messageResponse);
    console.log('DONE');
    
  } catch (err) {
    console.log(err);
  }
};
client.on('connect', () => {
  console.log('MQQT Connected')
  client.subscribe('openmv/dog', (err) => {
    if (err) {
      console.log(err)
    }
    else{
      console.log('subscribed')
    }
  })
})
client.on('message', (topic, message) => {
  try{
    const json = message.toString();
    const obj = JSON.parse(json)
    processData(obj, topic);
  }
  catch(err){
    console.log(err)
  }
})
client.on('disconnect', () => {
  console.log('MQQT disconnected')
})
client.on('error', (err) => {
  console.log('MQQT connection error', err)
})
client.on('close', () => {
  console.log('MQQT connection closed')
})