import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  zoom: number = 15;
  public latitude: number;
  public longitude: number;
  currentUser: any = {};
  place: any;
  
  // start marker setup
  // Values
    markerLocation: string;
    markerLat: string;
    markerLng: string;
    markerDraggable: string;

//Markers
markers: marker[] = []

  constructor( private myAuthService: AuthService,
               private myRouter: Router,
               private myRoute: ActivatedRoute,
               private myPlacesService: PlacesService) { }

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
      this.latitude = Number(this.place.latitude);
      this.longitude = Number(this.place.longitude);
      console.log('place is: ', this.place)
      let newMarker = {
        location: this.place.address,
        latitude: Number(this.place.latitude),
        longitude: Number(this.place.longitude),
        draggable: false
      }
    this.markers.push(newMarker);
    console.log('and the markers array is: ', this.markers)
    })
    .catch( err => console.log('Error while getting details in the place component: ', err));
  }

  clickedMarker(marker: marker, index: number){
    console.log('marker is: ', marker)
    console.log('Clicked Marker: '+ marker.location + ' at index ' + index);
  }

}

// Marker Type
interface marker{
  location?: string;
  latitude: number;
  longitude: number;
  draggable: boolean;
}
