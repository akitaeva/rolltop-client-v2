import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project = {
    title: "",
    description: "",
    closed: ""
  }

  listError: String = '';
  id: Number;

  constructor(private myTodoService: TodoService,
    private myRouter: Router,
    private myRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myRoute.params.subscribe(params => {
      this.myTodoService.getProject(params["id"])
      .toPromise()
      .then(oneProject => {
        this.project = oneProject;
        //console.log('is this the proj: ', oneProject)
      })
      .catch(err => err.json())
      //console.log("editProjId: " + this.id);
      //this.editProject(params["id"]);
    });
  }

  //getProject
  editProject(theProject){

   // console.log('is this id: ', id)
    //console.log('what is this: ', this.project)
    this.myTodoService.editProject(this.project , theProject._id)
    .then( editedProject => {
      //this.myRouter.navigate(['/todo/'+ this.id ]);
      location.reload();
      console.log("Project Saved");
    } )
    .catch( err => this.listError = 'Error while saving note in the component: ');
  }
}
