import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { TodoService } from '../../../services/todo.service';


@Component({
  selector: 'app-show-project-info',
  templateUrl: './show-project-info.component.html',
  styleUrls: ['./show-project-info.component.css']
})
export class ShowProjectInfoComponent implements OnInit {
  // title: "",
  // description: "",
  // closed: ""
  project :any =  {};

  listError: String = '';
  id:Number = 0;
  show: boolean = false;
  showDelete: boolean = false;

  constructor(private myTodoService: TodoService,
    private myRouter: Router,
    private myRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myRoute.params.subscribe(params => {
      this.id = params["id"];
      //console.log("ID" , this.id);
      this.showProjectInfo(this.id);
    });
  }

  showProjectInfo(id){
    //console.log("showProjectInfo");
    this.myTodoService.getProject(id)
    .subscribe( myProject => {
      //console.log("show Project",myProject);
      this.project = myProject;
      this.loadTasksToService();
    },
    () => this.listError = 'Sorry! No notes! Something went bad on the backend route!')
  }

  deleteProject(id){
    this.myTodoService.deleteProject(id)
    .then( deletedProject => {
      this.myRouter.navigate(['/todo/']);
      //location.reload();
    } )
    .catch( err => this.listError = 'Error while saving note in the component: ');
  }

  loadTasksToService(){
    this.myTodoService.loadTasks(this.project);
  }

  showForm() {
    if(this.showDelete)
      this.showDelete=!this.showDelete;

    this.show=!this.show;
  }

  toggleDelete() {
    if(this.show)
      this.show=!this.show;
    this.showDelete=!this.showDelete;
  }
}
