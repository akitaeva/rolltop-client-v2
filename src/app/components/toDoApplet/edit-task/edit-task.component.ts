import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  @Input() taskObj: any;

  task = {
    action:"Name" ,
    dueTime: "Due Date",
    orderNumber: "Priority",
    completed: false
  }

  id: Number;
  listError: String = '';

  constructor(private myTodoService: TodoService,
    private myRouter: Router,
    private myRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myRoute.params.subscribe(params => {
      this.id = params["id"];
    });
  }

  editTask(id){
    console.log(id);
    this.myTodoService.editTask(this.task, id)
    .then( editedTask => {
      //this.myRouter.navigate(['/todo/'+ this.id ]);
      location.reload();
      //console.log(this.task);
    } )
    .catch( err => this.listError = 'Error while saving note in the component: ');
  }

  completeTask(id){
    this.task = this.taskObj;
    this.task.completed = true;
    //console.log(this.taskObj);
    this.myTodoService.editTask(this.task, id)
    .then( editedTask => {
      //this.myRouter.navigate(['/todo/'+ this.id ]);
      location.reload();
      //console.log(this.task);
    } )
    .catch( err => this.listError = 'Error while saving note in the component: ');
  }

}
