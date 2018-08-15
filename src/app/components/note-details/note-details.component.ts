import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  note: any = {
    title: '', content: ''
  }
  updatedNote: any = {
    title: '', content: ''
  };
  currentUser: any = {};

  show: boolean = true;

  constructor( private myNotesService: NotesService,
               private myAuthService: AuthService,
               private myRouter: Router,
               private myRoute: ActivatedRoute) { }

  ngOnInit() {    
    this.myAuthService.checklogin()
    .toPromise()
    .then( res => {
      this.currentUser = res;
    })
    .catch(err => {
      this.myRouter.navigate(['/login']);
    })
    this.myRoute.params.subscribe(params => {
      this.showOneNoteDetails(params["id"]);
    });
  }

  showOneNoteDetails(id){
    this.myNotesService.getOneNoteDetails(id)
    .then( oneNote => {
      this.note = oneNote;
    })
    .catch( err => console.log('Error while getting details in the note component: ', err));
  }

  doNoteUpdate(id, formData) {

    // console.log("=============== id: ", id);
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.title);
    this.note.title = formInfo.title.value;
    this.note.content = formInfo.content.value;
    this.sendUpdatesToApi(id);
  }

  sendUpdatesToApi(id) {
  
    this.updatedNote = {title: this.note.title, content: this.note.content};
    console.log("updates:", this.updatedNote)
    this.myNotesService.updateNote(id, this.updatedNote)
      .toPromise()
      .then(()=>{
        console.log("Note updated!");
        // location.reload();
        this.myRouter.navigate(['/notes'])
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Error while saving the note update: ", err);
      })
  }

  deleteThisNote(){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myNotesService
      .deleteNote(this.note._id)
      .then(() => {
        console.log("Success");
        this.myRouter.navigate(["/notes"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Error while deleteing the note: ", err);
      });
  }

  editNote(){
    this.show = !this.show;
  }


}
