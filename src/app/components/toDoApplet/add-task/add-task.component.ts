import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { TodoService } from '../../../services/todo.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  newTask = {
    action: "",
    dueTime: "",
    orderNumber: ""
  }

  project;
  saveError: string;

  constructor(private myTodoService: TodoService,
    private myAuthService: AuthService,
    private myRouter: Router ){ }

  ngOnInit() {
    this.getTaskArray();
  }

  saveNewTask(){
    this.myTodoService.createNewTask(this.newTask, this.project._id)
    .then( newTask => {
      console.log(this.project.id);
      //this.myRouter.navigate(['/notes']);
      location.reload();
    } )
    .catch( err => this.saveError = 'Error while saving note in the component: ');
  }

  getTaskArray(){
    this.project = this.myTodoService.getTasks();
    //console.log("add task component",this.project);
  }

}
