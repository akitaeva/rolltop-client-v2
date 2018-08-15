import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Router } from '../../../../node_modules/@angular/router';

import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {  } from '@types/googlemaps';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {
  
  placeData = {
    name: '',
    category: '',
    latitude: '',
    longitude: '',
    address: '',
    notes: ''
  }

  saveError: string;

  public searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private myPlacesService: PlacesService,
              private myRouter: Router,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone ) { }

ngOnInit() {
  //create search FormControl
  this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let gPlace: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.placeData.address = gPlace.formatted_address
        console.log('what is this.placeData.address : ', this.placeData.address )

        //verify result
        if (gPlace.geometry === undefined || gPlace.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.placeData.latitude = gPlace.geometry.location.lat().toString();
        this.placeData.longitude = gPlace.geometry.location.lng().toString();
        // this.zoom = 12;
      });
    });
  });
}

  saveNewPlace(){
    console.log('getting: ', this.placeData)
    this.myPlacesService.createNewPlace(this.placeData)
    .then( (newPlace) => {
      console.log('what in the place: ', newPlace)
      this.placeData = {
        name: '',
        category: '',
        latitude: '',
        longitude: '',
        address: '',
        notes: ''
      }
      this.saveError = '';
      this.myRouter.navigate(['/places']);

    } )
    .catch( err => this.saveError = 'Error while saving note in the component: ');
  }


}
