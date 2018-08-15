import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { TodoService } from '../../../services/todo.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  projectList: Array<any>;

  newProject = {
    title: "",
    tasks: [] ,
    description: "",
    closed: false
  }

  theUser: any = {};

  saveError: string;

  constructor(private myTodoService: TodoService,
              private myAuthService: AuthService,
              private myRouter: Router ,
              private myRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myAuthService.checklogin()
    .toPromise()
    .then( resFromDB => {
      //console.log('user in notes: ', resFromDB)
      this.theUser = resFromDB;
    } )
  }

  saveNewProject(){
    this.myTodoService.createNewProject(this.newProject)
    .then( newProject => {
      //this.myRouter.navigate(['/notes']);
      location.reload();
      console.log("Project Saved");
    } )
    .catch( err => this.saveError = 'Error while saving note in the component: ');
  }
}
