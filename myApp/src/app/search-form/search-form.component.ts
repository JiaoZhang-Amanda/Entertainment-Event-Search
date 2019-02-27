import { Component, OnInit } from '@angular/core';
import { FormContent, EventInfo } from '../form-content';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { GeoLocService } from '../geo-loc.service';
import { SearchService } from '../search.service';
import { forbiddenNameValidator } from '../none-space.directive';
import { parseHostBindings } from '@angular/compiler';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  isGetGeojson: boolean = false;

  //profileForm : FormGroup;
  formContent: FormContent = {
    keyword: '',
    category: 'ALL',
    distance:  10,
    disUnite: 'Miles',
    isUserInput: false,
    location: '',
    lat: undefined,
    lng: undefined
  };
  profileForm = new FormGroup({
    'keyword': new FormControl(this.formContent.keyword, [Validators.required, forbiddenNameValidator()]),
    'category': new FormControl(this.formContent.category),
    'distance': new FormControl(),
    'disUnite': new FormControl(this.formContent.disUnite),
    'location': new FormControl({value: this.formContent.location, disabled: true}, [Validators.required, forbiddenNameValidator()])
  });

  categorys = ['ALL', 'Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];
  Units = ['Miles', 'Kilometers'];
  options: string[] = [];
  keywordOptions: Observable<string[]>;

  constructor(private geolocService: GeoLocService, private searchService: SearchService) {  
  }

  ngOnInit() {
    this.getGeoLoc();
    this.keyword.valueChanges.subscribe (val => {
      this.searchService.AutoComplete(val).subscribe(data => {
        this.options = [];
        if(data['success']!=null && data['success'] != true){
          this.searchService.setWrong(true);
        }
        if(data['_embedded'] != null && data['_embedded']['attractions']!=null){
          var auto_array = data['_embedded']['attractions'];
          for(var i = 0; i < auto_array.length; i++){
            this.options.push(auto_array[i]['name']);
          }
          this.keywordOptions = this.keyword.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
          );
        }
      });
    });
    
  }
  get keyword() {  return this.profileForm.get('keyword'); }
  get category() { return this.profileForm.get('category'); }
  get distance() { return this.profileForm.get('distance'); }
  get disUnite() { return this.profileForm.get('disUnite'); }
  disableInput() {
    this.formContent.isUserInput = false;
    //this.profileForm.controls['location'].reset();
    this.profileForm.patchValue({
      location: '',
    });
    //this.profileForm.setValue(value: { [key: string]: any; });
    //this.profileForm.controls['location'].disable();
  }
  enableInput() {
    this.formContent.isUserInput = true;
    this.profileForm.controls['location'].enable();
  }
  get location() { return this.profileForm.get('location'); }

  private _filter(value: string): string[] {
   
    const filterValue = value.toLowerCase();
    console.log(this.keywordOptions);
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  clear() {
    this.formContent.isUserInput = false;
    this.searchService.clear();
    this.options = [];
    this.keywordOptions = null;
    this.formContent= {
      keyword: '',
      category: 'ALL',
      distance:  10,
      disUnite: 'Miles',
      isUserInput: false,
      location: '',
      lat: undefined,
      lng: undefined
    };
    //this.profileForm.reset();
    //this.profileForm.controls['keyword']= new FormControl(this.formContent.keyword, [Validators.required, forbiddenNameValidator()]);
  }
   

  getGeoLoc() {
    this.geolocService.getGeolocation().subscribe(data => {
      this.formContent.lat = data['lat'];
      this.formContent.lng = data['lon'];
      this.isGetGeojson = true;
    });
  }

  onSubmit() {
  
    //get the form content, refresh the "formContent"
    this.formContent.keyword = this.profileForm.get('keyword').value;
    this.formContent.category = this.profileForm.get('category').value;
    this.formContent.distance = this.profileForm.get('distance').value || 10;
    this.formContent.disUnite = this.profileForm.get('disUnite').value;
    var reservationArr : EventInfo[] = [];
    if(this.formContent.isUserInput){
      this.formContent.location = this.profileForm.get('location').value;
      this.searchService.getLatLng(this.formContent.location).subscribe(data => {
        //console.log("data: "+data);
        if(data['success'] != null && data['success'] != true){
          this.searchService.setWrong(true);
        }else{
          this.formContent.lat = data['results']['0']['geometry']['location']['lat'];
          this.formContent.lng = data['results']['0']['geometry']['location']['lng'];
          //console.log(lat + "jjjj");
          this.searchService.getResult(this.formContent).subscribe(data => {
            console.log(data);
            if(data['success']!=null && data['success'] != true){
              this.searchService.setWrong(true);
            }else if(data["_embedded"] == null || data["_embedded"]["events"] == null){
              console.log(".....");
              this.searchService.setEmpty(true);
            }
            else{
              console.log(data);
            let events = data["_embedded"]["events"];
            for(var i = 0; i < events["length"]; i++){
              let event: EventInfo={"Favorite": false};
              if(events[i]['dates']['start']['localDate']!=null){
                event.LocalDate = events[i]['dates']['start']['localDate'];
              }
              if(events[i]['dates']['start']['localTime']!=null){
                event.LocalTime = events[i]['dates']['start']['localTime'];
              }
              if( events[i]['name'] != null) {
                event.Event = events[i]['name'];
                if(events[i]['name'].length > 35){
                  let cut = events[i]['name'].substring(0, 35);
                  for(var j = 35; j >= 0; j--){
                    console.log(cut.charAt(j));
                    if(/\s/.test(cut.charAt(j))){
                      event.showEvent = cut + "...";
                      break;
                    }
                    cut = cut.substring(0, j);
                  }
                }else{
                  event.showEvent = event.Event;
                }
              }
              if(events[i]['classifications'] != null){
                if(events[i]['classifications']['0']['genre']['name']!= null){
                  event.Genre = events[i]['classifications']['0']['genre']['name'];
                }
                if(events[i]['classifications']['0']['segment']['name']!=null){
                  event.Segment = events[i]['classifications']['0']['segment']['name'];
                }
              }
              if(events[i]['_embedded']['venues']!=null){
                event.Venue = events[i]['_embedded']['venues']['0']['name'];
              }
              if(events[i]['_embedded']!=null){
                event.AT = events[i]['_embedded']['attractions'];
              }
              if(events[i]['priceRanges']!=null){
                event.minPrice = events[i]['priceRanges']['0']['min'];
                event.maxPrice = events[i]['priceRanges'][0]['max'];
              }
              if(events[i]['dates']['status']!=null){
                event.ticketStatus = events[i]['dates']['status']['code'];
              }
              if(events[i]['url']!=null){
                event.buyAt = events[i]['url'];
              }
              if(events[i]['seatmap']!=null){
                event.seat = events[i]['seatmap']['staticUrl'];
              }
              if(events[i]['_embedded']['venues']['0']!=null){
                let venue = events[i]['_embedded']['venues']['0'];
                if(venue['address']['line1']!=null) event.Vaddress = venue['address']['line1'];
                if(venue['city']!=null) event.Vcity = venue['city']['name'];
                if(venue['state']!=null) event.Vstate = venue['state']['name'];
                if(venue['boxOfficeInfo']!=null){
                  if(venue['boxOfficeInfo']['phoneNumberDetail']!=null) event.Vphone = venue['boxOfficeInfo']['phoneNumberDetail'];
                  if(venue['boxOfficeInfo']['openHours']!=null) event.Vhour = venue['boxOfficeInfo']['openHours'];
                }
                if(venue['generalInfo']!=null){
                  if(venue['generalInfo']['generalRule']!=null) event.Vgeneral = venue['generalInfo']['generalRule'];
                  if(venue['generalInfo']['childRule']!=null) event.Vchild = venue['generalInfo']['childRule'];
                }
              }
              console.log(event.Vphone);
              reservationArr.push(event);
      
            }
            console.log(reservationArr);
            this.searchService.setEmpty(false);
            this.searchService.setJson(reservationArr);  
          }
            
          });

        }

      })
    }else{
      this.searchService.getResult(this.formContent).subscribe(data => {
        console.log(data);
        if(data['success']!=null && data['success'] != true){
          this.searchService.setWrong(true);
        }else if(data["_embedded"] == null || data["_embedded"]["events"] == null){
          this.searchService.setEmpty(true);
          console.log(".....");
        }
        else{
          console.log(data);
        let events = data["_embedded"]["events"];
        for(var i = 0; i < events["length"]; i++){
          let event: EventInfo={"Favorite": false};
          if(events[i]['dates']['start']['localDate']!=null){
            event.LocalDate = events[i]['dates']['start']['localDate'];
          }
          if(events[i]['dates']['start']['localTime']!=null){
            event.LocalTime = events[i]['dates']['start']['localTime'];
          }
          if( events[i]['name'] != null) {
            event.Event = events[i]['name'];
            if(events[i]['name'].length > 35){
              let cut = events[i]['name'].substring(0, 35);
              for(var j = 35; j >= 0; j--){
                console.log(cut.charAt(j));
                if(/\s/.test(cut.charAt(j))){
                  event.showEvent = cut + "...";
                  break;
                }
                cut = cut.substring(0, j);
              }
            }else{
              event.showEvent = event.Event;
            }
          }
          if(events[i]['classifications'] != null){
            if(events[i]['classifications']['0']['genre']['name']!= null){
              event.Genre = events[i]['classifications']['0']['genre']['name'];
            }
            if(events[i]['classifications']['0']['segment']['name']!=null){
              event.Segment = events[i]['classifications']['0']['segment']['name'];
            }
          }
          if(events[i]['_embedded']['venues']!=null){
            event.Venue = events[i]['_embedded']['venues']['0']['name'];
          }
          if(events[i]['_embedded']!=null){
            event.AT = events[i]['_embedded']['attractions'];
          }
          if(events[i]['priceRanges']!=null){
            event.minPrice = events[i]['priceRanges']['0']['min'];
            event.maxPrice = events[i]['priceRanges'][0]['max'];
          }
          if(events[i]['dates']['status']!=null){
            event.ticketStatus = events[i]['dates']['status']['code'];
          }
          if(events[i]['url']!=null){
            event.buyAt = events[i]['url'];
          }
          if(events[i]['seatmap']!=null){
            event.seat = events[i]['seatmap']['staticUrl'];
          }
          if(events[i]['_embedded']['venues']['0']!=null){
            let venue = events[i]['_embedded']['venues']['0'];
            if(venue['address']['line1']!=null) event.Vaddress = venue['address']['line1'];
            if(venue['city']!=null) event.Vcity = venue['city']['name'];
            if(venue['state']!=null) event.Vstate = venue['state']['name'];
            if(venue['boxOfficeInfo']!=null){
              if(venue['boxOfficeInfo']['phoneNumberDetail']!=null) event.Vphone = venue['boxOfficeInfo']['phoneNumberDetail'];
              if(venue['boxOfficeInfo']['openHours']!=null) event.Vhour = venue['boxOfficeInfo']['openHours'];
            }
            if(venue['generalInfo']!=null){
              if(venue['generalInfo']['generalRule']!=null) event.Vgeneral = venue['generalInfo']['generalRule'];
              if(venue['generalInfo']['childRule']!=null) event.Vchild = venue['generalInfo']['childRule'];
            }
          }
          console.log(event.Vphone);
          reservationArr.push(event);
  
        }
        console.log(reservationArr);
        this.searchService.setEmpty(false);
        this.searchService.setJson(reservationArr);  
      }
        
      });
    }
  


    //let rxjsDate
    //this.searchService.AutoComplete("cat").subscribe(
      //datas => rxjsDate = datas);
    //console.log("from server:"+ rxjsDate);
  }
      

}