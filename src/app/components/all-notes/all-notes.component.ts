import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent implements OnInit {

  allTheNotes: Array<Object> = [];
  listError: String = '';
  logoutError: String = '';
  theUser: any = {};
  show: boolean = false;


  constructor( private myNotesService: NotesService,
               private myAuthService: AuthService,
               private myRouter: Router) { }

  ngOnInit() {
    this.myAuthService.checklogin()
    .toPromise()
    .then( resFromDB => {
      console.log('user in notes: ', resFromDB)
      this.theUser = resFromDB;
    } )
    this.showNoteList();
  }


  showNoteList(){
    this.myNotesService.getAllNotes()
    .subscribe( allNotes => {
      console.log("whaaaaaaaaat ", allNotes)

      this.allTheNotes = allNotes.reverse();
      console.log("after ", this.allTheNotes)
      // this.allTheNotes = this.allTheNotes.reverse();
      // console.log("thaaaaaaaaat:", this.allTheNotes)
    },
    () => this.listError = 'Sorry! No notes! Something went bad on the backend route!')
  }


  logMeOut() {
    this.myAuthService
      .logout()
      .then(() => {
        this.myRouter.navigate(["/"]);
      })
      .catch(() => {
        this.logoutError = "Log out went bad.";
      });
  } // close logMeOut()

  showForm() {
    this.show=!this.show;
  }

}
