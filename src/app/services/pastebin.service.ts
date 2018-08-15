/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PastebinService {

  constructor() { }
}*/

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import {RequestOptions, ResponseContentType, RequestMethod} from '@angular/http';
import { environment } from '../../environments/environment';
import {Observable} from "rxjs";
import { Http } from "@angular/http";

@Injectable()
export class PastebinService {

  constructor(private http: HttpClient,
              private myHttp: Http) { }

  // file from event.target.files[0]
  uploadFile(file: File)/*: Observable<HttpEvent<any>>*/ {

    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();
    const options = {
      params: params,
      reportProgress: true,
      withCredentials: true 
    };

    const req = new HttpRequest('POST', `${environment.apiBase}/api/upload`, formData, options);
    return this.http.request(req);
  }

  getFileList(){
    return this.myHttp.get(`${environment.apiBase}/api/printFolder`,  { withCredentials: true })
    .map((responseThingy)=> responseThingy.json())
  }

  downloadFile(){

  }
}