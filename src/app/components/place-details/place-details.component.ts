import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.css']
})
export class PlaceDetailsComponent implements OnInit {

  place: any = {
    name: '', category: '', notes: ''
  }
  updatedPlace: any = {
    name: '', category: '', notes: ''
  };

  currentUser: any = {};

  show: boolean = true;

  constructor( private myPlacesService: PlacesService,
               private myAuthService: AuthService,
               private myRouter: Router,
               private myRoute: ActivatedRoute) { }

  ngOnInit() {    
    this.myAuthService.checklogin()
    .toPromise()
    .then( res => {
      this.currentUser = res;
    })
    .catch(err => {
      this.myRouter.navigate(['/login']);
    })
    this.myRoute.params.subscribe(params => {
      this.showOnePlaceDetails(params["id"]);
    });
  }

  showOnePlaceDetails(id){
    this.myPlacesService.getOnePlaceDetails(id)
    .then( onePlace => {
      this.place = onePlace;
    })
    .catch( err => console.log('Error while getting details in the place component: ', err));
  }


  doPlaceUpdate(id, formData) {

    // console.log("=============== id: ", id);
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.name);
    this.place.name = formInfo.name.value;
    this.place.category = formInfo.category.value;
    this.place.notes = formInfo.notes.value;
    this.sendUpdatesToApi(id);
  }


  sendUpdatesToApi(id) {
    this.updatedPlace = {name: this.place.name, category: this.place.category, 
    notes: this.place.notes};
    console.log("updates:", this.updatedPlace)
    this.myPlacesService.updatePlace(id, this.updatedPlace)
      .toPromise()
      .then((thePlace)=>{
        this.editPlace();
        this.myRouter.navigate(['/places',id])
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Error while saving the place update: ", err);
      })
  }

  deleteThisPlace(){
    if (!confirm("Are you sure?")) {
      return;
    }
    this.myPlacesService
      .deletePlace(this.place._id)
      .then(() => {
        console.log("Success");
        this.myRouter.navigate(["/places"]);
      })
      .catch(err => {
        alert("Sorry! Something went wrong.");
        console.log("Error while deleteing the note: ", err);
      });
  }

  editPlace(){
    this.show = !this.show;
  }



}
