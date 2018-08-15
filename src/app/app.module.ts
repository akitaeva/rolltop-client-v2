import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '../../node_modules/@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http'

// components:
import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { AllNotesComponent } from './components/all-notes/all-notes.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { NoteDetailsComponent } from './components/note-details/note-details.component';
import { QuoteComponent } from './components/quote/quote.component';
import { FavplacesComponent } from './components/favplaces/favplaces.component';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewPlaceComponent } from './components/new-place/new-place.component';

//map
import { GmapComponent } from './components/gmap/gmap.component';
import { AgmCoreModule } from '@agm/core'

//(JM Added components)

import { NewProjectComponent } from './components/toDoApplet/new-project/new-project.component';
import { ShowProjectsComponent } from './components/toDoApplet/show-projects/show-projects.component';
import { ShowProjectInfoComponent } from './components/toDoApplet/show-project-info/show-project-info.component';
import { EditProjectComponent } from './components/toDoApplet/edit-project/edit-project.component';
import { ShowTasksComponent } from './components/toDoApplet/show-tasks/show-tasks.component';
import { AddTaskComponent } from './components/toDoApplet/add-task/add-task.component';
import { EditTaskComponent } from './components/toDoApplet/edit-task/edit-task.component';
import { PastebinComponent } from './components/pastebin/pastebin.component';

// routes:
import {Routes, RouterModule} from '@angular/router';

//services:
import { AuthService } from './services/auth.service';
import { NotesService } from './services/notes.service';
import { QuoteService } from './services/quote.service';
import { PlacesService } from './services/places.service';
import { PastebinService } from './services/pastebin.service';
import { TodoService } from './services/todo.service';


//image upload
import { FileUploadModule } from "ng2-file-upload";

const routes: Routes = [
    {
      path:'',
      component:TitleComponent
    },  
    {
      path:'signup',
      component:SignupComponent
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'desktop',
      component:DesktopComponent
    },
    {
      path:'notes',
      component: AllNotesComponent
    },
    {
      path:'notes/new',
      component: NewNoteComponent
    },
    {
      path:'notes/:id',
      component: NoteDetailsComponent
    },

    {
      path:'places',
      component: FavplacesComponent
    },
    {
      path:'places/new',
      component: NewPlaceComponent
    },
    {
      path:'places/:id',
      component: PlaceDetailsComponent
    }, 
    {
      path:'todo',
      component: ShowProjectsComponent
    },
    {
      path: 'todo/:id',
      component: ShowProjectInfoComponent
    },
    {
      path: 'pastebin',
      component: PastebinComponent
    }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AllNotesComponent,
    NewNoteComponent,
    NoteDetailsComponent,
    TitleComponent,
    DesktopComponent,
    QuoteComponent,
    FavplacesComponent,
    NewPlaceComponent,
    PlaceDetailsComponent,
    NavbarComponent,
    NewProjectComponent,
    //End ToDo component 
    QuoteComponent,
    ShowProjectsComponent,
    ShowProjectInfoComponent,
    EditProjectComponent,
    ShowTasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    PastebinComponent,
    NewProjectComponent,
    GmapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    RouterModule.forRoot(routes), //connecting routes with the app  
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDHDUcBBjQiiOh-PXS_SbPX5tqCOFkIENs',
      libraries: ["places"]
    }),
    ReactiveFormsModule

  ],

  providers: [AuthService,
              NotesService, 
              QuoteService, 
              TodoService, 
              PlacesService,
              PastebinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
