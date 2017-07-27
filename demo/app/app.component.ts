declare const java: any, org: any;

import { Component } from "@angular/core";
import { Kinvey } from 'kinvey-nativescript-sdk';
import * as fs from "tns-core-modules/file-system";
import * as imageSource from 'tns-core-modules/image-source';
import * as platform from 'tns-core-modules/platform';
import * as http from 'http';

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
    <StackLayout>
      <ActivityIndicator [busy]="true" horizontalAlignment="center" verticalAlignment="center"></ActivityIndicator>
      <Label text="Run" (tap)="run()"></Label>
    </StackLayout>
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
    const activeUser = Kinvey.User.getActiveUser();
    let prm: Promise<any> = Promise.resolve();
    if (!activeUser) {
      prm = Kinvey.User.login('admin', 'admin');
    }

    prm
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
      .then(() => {
        const filePath = fs.path.join(fs.knownFolders.currentApp().path, './images/bigimg.jpg');
        log('exists: ' + fs.File.exists(filePath));
        const file = fs.File.fromPath(filePath);
        return file;
      })
      .then((file) => {
        log('uploading');
        const fileContent = file.readSync();

        const metadata = {
          filename: 'testfile.jpg',
          mimeType: 'image/jpg',
          size: fileContent.length
        };
        return Kinvey.Files.upload(file, metadata);
      })
      .then((resp: any) => {
        log('uploaded');
      })
      .catch(err => {
        log('defEH: ', err.message);
      });
  }
}
