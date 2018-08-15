import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  project;

  constructor(private myHttp: Http) { }

  createNewProject(dataToSend){
    return this.myHttp.post(`${environment.apiBase}/api/projects`, dataToSend ,  { withCredentials: true })
    .toPromise()
    .then( res => console.log(res.json()) )
    .catch( err => console.log('Error while creating new entry: ', err) )
  }

  getProjects(){
    return this.myHttp.get(`${environment.apiBase}/api/projects`,  { withCredentials: true })
    .map((responseThingy)=> responseThingy.json())
  }

  getProject(id){
    return this.myHttp.get(`${environment.apiBase}/api/projects/` + id,  { withCredentials: true })
    .map((responseThingy)=> responseThingy.json())
  }

  editProject(dataToSend, id){
    return this.myHttp.post(`${environment.apiBase}/api/projects/` + id  + `/update`, dataToSend ,  { withCredentials: true })
    .toPromise()
    .then( res => console.log(res.json()) )
    .catch( err => console.log('Error while creating new entry: ', err) )
  }

  deleteProject(id){
    return this.myHttp.post(`${environment.apiBase}/api/projects/` + id  + `/delete`,  {}, { withCredentials: true })
    .toPromise()
    .then( res => console.log(res.json()) )
    .catch( err => console.log('Error while creating new entry: ', err) )
  }

  loadTasks(arr){
    this.project = arr;
  }

  getTasks(){
    return this.project;
  }

  getTaskList(id){
    return this.myHttp.get(`${environment.apiBase}/api/tasks/` + id,  { withCredentials: true })
    .map((responseThingy)=> responseThingy.json())
  }

  createNewTask(dataToSend, projectId){
    return this.myHttp.post(`${environment.apiBase}/api/projects/` + projectId + "/add-task", dataToSend ,  { withCredentials: true })
    .toPromise()
    .then( res => console.log(res.json()) )
    .catch( err => console.log('Error while creating new entry: ', err) )
  }

  editTask(dataToSend, projectId){
    return this.myHttp.post(`${environment.apiBase}/api/tasks/` + projectId + "/edit-task", dataToSend ,  { withCredentials: true })
    .toPromise()
    .then( res => console.log(res.json()) )
    .catch( err => console.log('Error while creating new entry: ', err) )
  }

  deleteTask(taskId, projectId){
    //console.log(taskId);
    return this.myHttp.post(`${environment.apiBase}/api/project/` + projectId + "/delete-task/" + taskId, {} ,  { withCredentials: true })
    .toPromise()
    .then( res => console.log(res.json()) )
    .catch( err => console.log('Error while creating new entry: ', err) )
  }

}
