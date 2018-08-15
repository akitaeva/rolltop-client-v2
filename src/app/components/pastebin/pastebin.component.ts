import { Component, OnInit } from '@angular/core';
//import {  } from '../../../services/todo.service';
import { PastebinService } from '../../services/pastebin.service';
import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-pastebin',
  templateUrl: './pastebin.component.html',
  styleUrls: ['./pastebin.component.css']
})

export class PastebinComponent implements OnInit {

  baseUrl = environment.apiBase;
  listError: String = '';
  fileList: Array<any>;

  constructor(private upload: PastebinService) { }

  ngOnInit() {}

  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      console.log("No file selected!");
      return

    }
    let file: File = files[0];

    this.upload.uploadFile(file)
      .subscribe(
        event => {
          console.log(event);
          if (event.type == HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log("Upload Error:", err);
        }, () => {
          console.log("Upload done");
          location.reload();
        }
      )
  } 

  getFileList(){
    console.log("Get File test");
    this.upload.getFileList()
    .subscribe( fileList => {
      console.log("File List: ", fileList);
      this.fileList = fileList;
    },
    () => this.listError = 'Sorry! No notes! Something went bad on the backend route!')
  }

  downloadFile(fileName){

  }
}

