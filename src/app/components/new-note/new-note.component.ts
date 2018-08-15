import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit {

  noteData = {
    title: '',
    content: ''
  }

  saveError: string;

  constructor(private myNotesService: NotesService,
              private myRouter: Router ) { }

  ngOnInit() {
  }

  saveNewNote(){
    this.myNotesService.createNewNote(this.noteData)
    .then( (newNote) => {
      // console.log('what in the note: ', newNote)
      this.noteData = {
        title: '',
        content: ''
      }
      this.saveError = '';
      this.myRouter.navigate(['/notes']);
      location.reload();

    } )
    .catch( err => this.saveError = 'Error while saving note in the component: ');
  }

}
