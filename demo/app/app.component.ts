declare const java: any, org: any;

import { Component } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import * as fs from "tns-core-modules/file-system";
import * as imageSource from 'tns-core-modules/image-source';
import * as platform from 'tns-core-modules/platform';
import * as http from 'http';
var bghttp = require("nativescript-background-http");

const log = (msg, obj?) => {
  if (typeof msg !== 'string') {
    msg = JSON.stringify(msg, null, 2);
  }
  console.log('>>>>>>> ' + msg + (obj ? JSON.stringify(obj, null, 2) : ''));
};

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="My App"></ActionBar>
    <Label text="Run" (tap)="run()"></Label>
    <!-- Your UI components go here -->
  `
})
export class AppComponent {

  constructor() {
    Kinvey.init({
      appKey: 'kid_HkTD2CJc',
      appSecret: 'cd7f658ed0a548dd8dfadf5a1787568b'
    });
  }

  run() {
    let collection, id = 'testttt';
    const activeUser = Kinvey.User.getActiveUser();
    let prm: Promise<any> = Promise.resolve();
    if (!activeUser) {
      prm = Kinvey.User.login('admin', 'admin');
    }

    let fileContent, filePath;

    prm
      .then(res => {
        collection = Kinvey.DataStore.collection('Books', Kinvey.DataStoreType.Cache);
      })
      .then(() => {
        return Kinvey.Files.find();
      })
      .then((files) => {
        log('deleting');
        const prms = files.map(f => {
          return Kinvey.Files.removeById(f._id);
        });
        return Promise.all(prms);
      })
      // .then(() => {
      //   const savePath = fs.path.join(fs.knownFolders.temp().path, 'testfile.png');
      //   return http.getFile('https://www.queness.com/resources/images/png/apple_web.png', savePath);
      // })
      .then((wasSaved) => {
        log('was saved: ', wasSaved);
        // const file = fs.knownFolders.temp().getFile('testfile.png');
        // filePath = file.path;
        // const file = fs.File.fromPath('/data/data/test.test.test/files/app/images/bigimg.jpgz');
        // return file;
        const filePath = fs.path.join(fs.knownFolders.currentApp().path, './images/bigimg.jpg');
        console.log('exists: ' + fs.File.exists(filePath));
        const file = fs.File.fromPath(filePath);
        return file;
      })
      .then((file) => {
        log('uploading');
        // fileContent = file;

        // const metadata = {
        //   filename: 'testfile.png',
        //   mimeType: 'image/png',
        //   size: 23413956
        // };
        // return Kinvey.Files.upload('/data/data/test.test.test/files/app/images/bigimg.jpg', metadata);

        fileContent = file.readSync();
        console.log('size: ' + fileContent.length);

        const metadata = {
          filename: 'testfile.jpg',
          mimeType: 'image/jpg',
          size: fileContent.length
        };
        return Kinvey.Files.upload(file, metadata);
      })
      .then((resp: any) => {
        const md = resp.data;
        return md;
        // return new Promise((resolve, reject) => {
        //   http.request({
        //     url: md._uploadURL,
        //     method: 'PUT',
        //     headers: {
        //       'Content-Type': 'image/png',
        //       'Content-Range': `bytes */${fileContent.length}`
        //     }
        //   })
        //   .then(resp => {
        //     if (resp.statusCode === 308) {
        //       return resolve(md);
        //     } else {
        //       log('err resp: ' + resp.content.toString());
        //       return reject({ message: 'Unexpected status code' });
        //     }
        //   });
        // });
      })
      // .then((fileMd: any) => {
      //   var session = bghttp.session("image-upload");

      //   var request = {
      //     url: fileMd._uploadURL + 'aa',
      //     method: "PUT",
      //     headers: {
      //       'Content-Type': 'image/png',
      //       'Content-Range': `bytes 0-${fileContent.length - 1}/${fileContent.length}`
      //     },
      //     description: "{ 'uploading': 'testfilezzz.png' }"
      //   };

      //   var task = session.uploadFile(filePath, request);
      //   const logEvent = ev => {
      //     log(`${ev.eventName}: ${ev.currentBytes}/${ev.totalBytes}`);
      //   };

      //   task.on("progress", logEvent);
      //   task.on("error", logEvent);
      //   task.on("complete", logEvent);
      //   task.on("responded", logEvent);
      // })
      // .then(res => {
      //   log('got item: ', res);
      // })
      .catch(err => {
        log('defEH: ', err.message);
      });
  }
}
