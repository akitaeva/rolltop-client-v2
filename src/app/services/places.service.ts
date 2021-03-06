import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class PlacesService {

  constructor(private myHttp: Http) { }

  getAllPlaces(){
    return this.myHttp.get(`${environment.apiBase}/api/places`, { withCredentials: true })
    .map(res => res.json())
  }

  getOnePlaceDetails(theId){
    return this.myHttp.get(`${environment.apiBase}/api/places/${theId}`, { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
    .catch( err => console.log('Error while getting the place details: ', err) )
  }

  createNewPlace(dataToSend){
    return this.myHttp.post(`${environment.apiBase}/api/places`, dataToSend, { withCredentials: true })
    .toPromise()
    .then( res => res.json() )
    .catch( err => console.log('Error while creating new place entry: ', err) )
  }

 updatePlace(id, updates){
    return this.myHttp.post(`${environment.apiBase}/api/places/${id}/update`, updates, { withCredentials: true })
    .map(res => res.json());
  }

  deletePlace(id){
    return this.myHttp.post(`${environment.apiBase}/api/places/${id}/delete`, {},
        { withCredentials: true })
        .toPromise()
  }

}
