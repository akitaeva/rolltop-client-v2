import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class NotesService {

  constructor(private myHttp: Http) { }

  getAllNotes(){
    return this.myHttp.get(`${environment.apiBase}/api/notes`, { withCredentials: true })
    .map(res => res.json())
  }

  getOneNoteDetails(theId){
    return this.myHttp.get(`${environment.apiBase}/api/notes/${theId}`, { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
    .catch( err => console.log('Error while getting the note details: ', err) )
  }

  createNewNote(dataToSend){
    return this.myHttp.post(`${environment.apiBase}/api/notes`,  dataToSend, { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
    .catch( err => console.log('Error while creating new note: ', err) )
  }

  updateNote(id, updates){
    return this.myHttp.post(`${environment.apiBase}/api/notes/${id}/update`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deleteNote(id){
    return this.myHttp.post(`${environment.apiBase}/api/notes/${id}/delete`, {},
        { withCredentials: true })
        .toPromise()
  }

}
