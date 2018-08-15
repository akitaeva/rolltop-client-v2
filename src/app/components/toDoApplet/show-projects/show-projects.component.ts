import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { TodoService } from '../../../services/todo.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-show-projects',
  templateUrl: './show-projects.component.html',
  styleUrls: ['./show-projects.component.css']
})
export class ShowProjectsComponent implements OnInit {

  projectList: Array<any>;
  show: boolean = false;
  theUser: any = {};

  listError: String = '';

  constructor(private myTodoService: TodoService,
    private myAuthService: AuthService,
    private myRouter: Router ) { }

  ngOnInit() {
    this.showProjects();
  }

  showProjects(){
    this.myTodoService.getProjects()
    .subscribe( allProjects => {
      this.projectList = allProjects;
    },
    () => this.listError = 'Sorry! No notes! Something went bad on the backend route!')
  }

  showForm() {
    this.show = !this.show;
  }
}


