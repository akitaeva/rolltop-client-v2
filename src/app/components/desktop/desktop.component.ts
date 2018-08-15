import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
import { PlacesService } from '../../services/places.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  allTheNotes: Array<Object> = [];
  allTheProjects: Array<Object> = [];
  allThePlaces: Array<Object> = [];
  listError: String = '';
  logoutError: String = '';
  theUser: any = {};

  constructor( private myAuthService: AuthService,
    private myRouter: Router,
    private myPlacesService: PlacesService,
    private myProjectService: TodoService,
    private myNotesService: NotesService) { }

  ngOnInit() {
    this.myAuthService.checklogin()
    .toPromise()
    .then( resFromDB => {
      console.log('user in notes: ', resFromDB)
      this.theUser = resFromDB;
    } )
    this.showNoteList();
    this.showPlaceList();
    this.showProjects();
  }

  showNoteList(){
    this.myNotesService.getAllNotes()
    .subscribe( allNotes => {
      this.allTheNotes = allNotes.reverse();
    },
    () => this.listError = 'Sorry! No notes! Something went bad on the backend route!')
  }

  showPlaceList(){

    this.myPlacesService.getAllPlaces()
    .subscribe( allPlaces => {
      this.allThePlaces = allPlaces;

    },
    () => this.listError = 'Sorry! No fav places! Something went bad on the backend route!')
  }

  showProjects(){
    this.myProjectService.getProjects()
    .subscribe( allProjects => {
      this.allTheProjects = allProjects;
    },
    () => this.listError = 'Sorry! No notes! Something went bad on the backend route!')
  }


}
