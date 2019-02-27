import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ListAnimation, slideInOutAnimation } from '../animation';
import { FormControl} from '@angular/forms';
import { FormContent, EventInfo } from '../form-content';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css'],
  animations: [ListAnimation,slideInOutAnimation],
})
export class ResultTableComponent implements OnInit {

  isInit: boolean = true;
  isShow: boolean = false;   //result event tab
  isDetailShow: boolean = false;  //after click one event
  isshowMore: boolean = false;   //upcoming event
  isClickEvent: boolean = false;  //click Event or not
  isShowFav: boolean = false;  //show Favorite tab
  isFavClick: boolean = false;  //click Favorite
  placesWrongMessage: boolean = false;
  placesNoRecordMessage: boolean = false;  //no record
  showBar: boolean = false;
  eventNoRecord: boolean = false;
  resultNoRecord: boolean = false;
  resultState = "void";
  upcomingNoResult = false;
  
  resultInfo: EventInfo[] = [];  //events list
  Titles = ["*", "Date", "Event", "Category", "VenueInfo", "Favorite"]; 
    
  constructor(private searchService: SearchService) {
    this.searchService.isClear.subscribe((res) => {
      this.isShow = false;
      this.clear();
    });
    this.searchService.Wrong.subscribe((res) => {
      if(!res){
        this.placesWrongMessage = true;
      }
    });
    this.searchService.Empty.subscribe((res) => {
      if(res){
        this.resultNoRecord = true;
        this.isShow = false;
        this.isDetailShow = false;
      }else{
        this.isShow = true;
        
      }
      console.log(",..." + this.resultInfo);
      
    });
    this.searchService.JsonObserve.subscribe((res) => {
      this.showBar = false;
      this.resultInfo = <any>res;
      this.resultInfo = this.resultInfo.sort((a,b)=>a.LocalDate.localeCompare(b.LocalDate));
      this.resultState = "visible";
    });
    

  }

  // sortResult(obj1, obj2) {
  //   console.log("..........");
  //   var value1 = obj1.LocalDate;
  //   var value2 = obj2.LocalDate;
  //   if (value1.toLowerCase() < value2.toLowerCase()) {
  //     return -1;
  //    }
  //    if (value1.toLowerCase() > value2.toLowerCase()) {
  //     return 1;
  //    }
  //    return 0;
  // }
  clear(){
    this.isShow= false;
    this.isDetailShow= false;
    this.isshowMore= false; 
    this.isClickEvent = false;
    this.isShowFav= false;
    this.isFavClick= false;
    this.placesNoRecordMessage = false;
    this.resultInfo = [];
    this.resultState = "void";
    this.Marray = [];
    this.Marray = [];
    this.Uarray = [];
    this.UoriginArray= [];
    this.Upart= [];
    this.sortCategoryKind = "Default";
    this.sortName = "";
    this.sortascend.reset();
    this.sortcategory.reset();  
    this.placesWrongMessage = false;
    this.placesNoRecordMessage= false;  //no record
    this.showBar = false;
    this. eventNoRecord= false;
    this.resultNoRecord = false;
    this.resultState = "void";
    this.upcomingNoResult = false;
  }
  ShowResults(){
    this.isInit = false;
    this.isShow = true;
    this.isShowFav = false;
    this.isFavClick = false;
    this.isDetailShow = false;
    this.resultState = 'visible';
  }
  ShowFavorite(){
    this.isInit = false;
    this.isShow = false;
    this.isShowFav = true;
    this.isClickEvent = false;
    this.isFavClick = true;
    this.isDetailShow = false;
    this.resultState = 'void';
    this.Farray = JSON.parse(localStorage.getItem('favorite'));
  }

  ngOnInit() {
    // this.isShow = false;
    // this.isDetailShow= false;
    // this.isshowMore= false; 
    // this.isClickEvent= false;
    // this.isShowFav= false;
    // this.isFavClick= false;
  }
  title: string= "";
  showIndex: number;
  showAT: string = "";
  showEvent: string;
  showVenue: string="";
  showTime: string;
  showCategory: string;
  minPrice: number;
  maxPrice: number;
  //showPrice: string;
  showTicket: string;
  showBuy: string;
  showMap: string;
  
  //venue date
  venueName: string= "";
  venueNameDecode: string= "";
  venueAdd: string = "";
  venueCity: string = "";
  venuePhone: string = "";
  venueHour: string = "";
  venueGRule: string = "";
  venueCRule: string = "";
  venueLat: number;
  venueLng: number;

  //music related data
  Marray: object[] = [];
  
  //upcoming data
  Uarray: object[] = [];
  UoriginArray: object[] = [];
  Upart: object[] = [];
  //favorite list
  Farray: EventInfo[] = [];

  //photos
  Parray = [];
 

  addFavorite(index) {
    
    //add
    //console.log(",,,,,");
    let addFavEvent = this.resultInfo[index];
    //console.log("!!:" + addFavEvent);
    addFavEvent.Favorite = true;
    this.resultInfo[index].Favorite = true;
    this.full_star = true;
    if(localStorage.getItem('favorite') == null){
      this.Farray.push(addFavEvent);
      localStorage.setItem('favorite', JSON.stringify(this.Farray));
    }else{
      this.Farray = JSON.parse(localStorage.getItem('favorite'));
      this.Farray.push(addFavEvent);
      localStorage.setItem('favorite', JSON.stringify(this.Farray));
    }
    
    //console.log(this.Farray);
    //console.log("Favorite" + this.resultInfo[index].Favorite);
  }
  RemoveFavorite(index) {
    //console.log("FAV:" + this.isFavClick);
    if(this.isFavClick){
      this.Farray = JSON.parse(localStorage.getItem('favorite'));
      let removeFavEvent = this.Farray[index];  // Item to remove
      //
      for(var i = 0; i < this.resultInfo.length; i++){
        //console.log("string: " +removeFavEvent.toString());
        if(JSON.stringify(this.resultInfo[i]) == JSON.stringify(removeFavEvent)){
          this.resultInfo[i].Favorite = false;
        }
      }
      removeFavEvent.Favorite = false;
      this.Farray = this.Farray.filter(obj => obj !== removeFavEvent);
      localStorage.setItem('favorite', JSON.stringify(this.Farray));

    }else{
      let removeFavEvent = this.resultInfo[index];  // Item to remove
      this.resultInfo[index].Favorite = false;
      this.full_star = false;
      this.Farray = JSON.parse(localStorage.getItem('favorite'));
      this.Farray = this.Farray.filter(obj => obj !== removeFavEvent);
      removeFavEvent.Favorite = false;
      localStorage.setItem('favorite', JSON.stringify(this.Farray));
    }
  }

  full_star: boolean= false;

  showEventDetail(index){
    this.isInit = false;
    this.resultState = 'void';
    this.showIndex = index;
    this.isShow = false;
    this.isShowFav = false;
    this.isDetailShow = true;
    this.showAT = "";
    
    if(this.isFavClick){
      this.getFetail(this.Farray, index);
    }else{
      this.getFetail(this.resultInfo, index);
    }
    
  }

  getFetail(resultInfo, index){
    this.title = resultInfo[index].Event;
    this.Parray = [];
    this.Marray = [];
    this.full_star = resultInfo[index].Favorite;
    //console.log("star:" + this.full_star);
    //event tab
    let tmp = resultInfo[index].AT;
    for(var i = 0; i < (<any>tmp).length; i++){
      this.showAT = this.showAT + tmp[i]['name'] +" | ";
    }
    this.showAT = this.showAT.substring(0, this.showAT .length-2);
    
    this.showEvent = resultInfo[index].Event;
    this.showVenue = resultInfo[index].Venue;
    this.showTime = resultInfo[index].LocalDate + " " + resultInfo[index].LocalTime;
    this.showCategory = resultInfo[index].Segment + " | " + resultInfo[index].Genre ;
    this.minPrice = resultInfo[index].minPrice;
    this.maxPrice = resultInfo[index].maxPrice;
    //console.log(resultInfo[index].minPrice);
    this.showTicket = resultInfo[index].ticketStatus;
    this.showBuy = resultInfo[index].buyAt;
    this.showMap = resultInfo[index].seat;
    this.eventNoRecord = this.showAT === undefined && this.showEvent === undefined && this.showTime === undefined && this.showCategory === undefined && this.minPrice === undefined && this.maxPrice === undefined&& this.showTicket === undefined && this.showBuy === undefined
    && this.showMap === undefined;
    

    //related to the A&T tab
    //music related Table
    
    for(var i = 0; i < (<any>tmp).length; i++){
      let attName = tmp[i]['name'];
      //this.showBar = true;
      this.searchService.getPhoto(attName).subscribe(data => {
        //this.showBar = false;
        //console.log("Parray0: " + data['items']['0']['link']);

        //no photos
        if(data['items'] == null){
          if(resultInfo[index].Segment == "Music"){
            //this.showBar = true;
            this.searchService.getMusic(attName).subscribe(data => {
              console.log(data);
              //this.showBar = false;
              if(data['artists'] == null || data['artists']['items'] == null){}else{
                let music = data['artists']['items'];
                for(var j = 0; j < music.length; j++){
                  //check
                  //console.log("......" +music[j]['name']);
                  if(music[j]['name']!= null && attName == music[j]['name']){
                    
                    let tmpmusic = {Mname: "", Mfoller: "", Mpop: 0, Mcheck: ""};
                    if(music[j]['name']!=null){
                      tmpmusic.Mname = music[j]['name'];
                    }
                    if(music[j]['followers']!=null&&music[j]['followers']['total'] != null){
                      tmpmusic.Mfoller = music[j]['followers']['total'];
                    }
                    tmpmusic.Mfoller = tmpmusic.Mfoller.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    if(music[j]['popularity']!=null){
                      tmpmusic.Mpop = music[j]['popularity'];
                    }
                    
                    if(music[j]['external_urls']!=null && music[j]['external_urls']['spotify']!=null){
                      tmpmusic.Mcheck = music[j]['external_urls']['spotify'];
                    }
                    //console.log("music: " + tmpmusic.Mcheck);
                    this.Marray.push(tmpmusic);
                  }
                }

              }

            })
          }
        }else{
          let photo_array = data['items'];
          let tmpParra= {Pname: "", Plink: []};
          tmpParra.Pname = attName;
          for(var j = 0; j < photo_array.length; j++){
            if(j < 3){}
            tmpParra.Plink.push(photo_array[j]['link']);
            //console.log(tmpParra);
          }
          this.Parray.push(tmpParra);
            //console.log("part of Array: "+tmpParra);
          if(resultInfo[index].Segment == "Music"){
            //this.showBar = true;
            this.searchService.getMusic(attName).subscribe(data => {
              //console.log("mmmmmmmmm");
              if(data['artists'] == null || data['artists']['items'] == null){}else{
                console.log(data);
                //this.showBar = false;
                let music = data['artists']['items'];
                for(var j = 0; j < music.length; j++){
                  //check
                  //console.log("......" +music[j]['name']);
                  if(music[j]['name']!= null && attName == music[j]['name']){
                    
                    let tmpmusic = {Mname: "", Mfoller: "", Mpop: 0, Mcheck: ""};
                    if(music[j]['name']!=null){
                      tmpmusic.Mname = music[j]['name'];
                    }
                    if(music[j]['followers']!=null&&music[j]['followers']['total'] != null){
                      tmpmusic.Mfoller = music[j]['followers']['total'];
                    }
                    tmpmusic.Mfoller = tmpmusic.Mfoller.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    if(music[j]['popularity']!=null){
                      tmpmusic.Mpop = music[j]['popularity'];
                    }
                    
                    if(music[j]['external_urls']!=null && music[j]['external_urls']['spotify']!=null){
                      tmpmusic.Mcheck = music[j]['external_urls']['spotify'];
                    }
                    //console.log("music: " + tmpmusic.Mcheck);
                    this.Marray.push(tmpmusic);
                  }
                }

              }

            })
          }

        }

      });
      
    }
    //console.log("music Array: "+this.Marray);
    //console.log("Photo Array: " + this.Parray);
    
    //related to the venue tab
    this.venueName = resultInfo[index].Venue;
    this.venueNameDecode = this.venueName.replace(/' '/g,'+');
    this.venueAdd = resultInfo[index].Vaddress;
    this.showBar = true;
    this.searchService.getLatLng(this.venueAdd).subscribe(data => {
      this.showBar = false;
      this.venueLat = data['results']['0']['geometry']['location']['lat'];
      this.venueLng = data['results']['0']['geometry']['location']['lng'];
      //console.log(lat + "jjjj");
    })
    this.venueCity = resultInfo[index].Vcity + ", " + resultInfo[index].Vstate;
    this.venuePhone = resultInfo[index].Vphone;
    this.venueHour = resultInfo[index].Vhour;
    this.venueGRule = resultInfo[index].Vgeneral;
    this.venueCRule = resultInfo[index].Vchild; 
    
    //related to the upcoming tab
    this.showBar = true;
    //get the id first
    let id;
    this.searchService.getUpcomingResult(this.showVenue).subscribe(data => {
      if(data['resultsPage']['results']!=null && data['resultsPage']['results']['venue']!=null){
        
      id = data['resultsPage']['results']['venue']['0']['id'];
      //console.log("3"+id);
    
    this.searchService.getUpcoming(id).subscribe(data => {
      this.showBar = false;
      //console.log(data);
      //console.log("upcoming: "+data['resultsPage']['results']['0']['displayName']);
      if(data['resultsPage']!=null && data['resultsPage']['results']!=null && data["resultsPage"]["results"]["event"]!=null){
        
        let upComingEvent = data["resultsPage"]["results"]["event"];
      
        //console.log("type: "+typeof(upComingEvent));
        //console.log(" "+upComingEvent[0]['displayName']);
        for(var i = 0; i < upComingEvent.length; i++){
          let tmpevent = {Name: "", artist: "", date: "", time: "", type: "", uri: ""};
          if(upComingEvent[i]['displayName'] != null){
            tmpevent.Name = upComingEvent[i]['displayName'];
          }
          if(upComingEvent[i]['uri'] != null){
            tmpevent.uri = upComingEvent[i]['uri'];
          }
          if(upComingEvent[i]['performance']!=null &&upComingEvent[i]['performance']['0']!=null&& upComingEvent[i]['performance']['0']['displayName']!=null){
            tmpevent.artist = upComingEvent[i]['performance']['0']['displayName'];
          }
          if(upComingEvent[i]['start'] != null){
            if(upComingEvent[i]['start']['date'] != null){
              tmpevent.date = upComingEvent[i]['start']['date'];
            }else{
              tmpevent.time = upComingEvent[i]['start']['time'];
            }
          }
          if(upComingEvent[i]['type']!=null){
            tmpevent.type = upComingEvent[i]['type'];
          }
          if(i < 5) {
            this.Upart.push(tmpevent);
          }
          this.UoriginArray.push(tmpevent);
        }
        this.upcomingNoResult = this.Uarray.length==0;
      }
      
    })
      }
      
    });
    this.Uarray = this.Upart;
    //console.log(this.Uarray.length);
    
    //this.Uarray = [];
  }
  
  showMore() {
    this.isshowMore = true;
    this.Uarray = [];
    this.UoriginArray.map((obj) => {
      this.Uarray.push(obj);
    })
    //console.log(this.Uarray);
  }
  showLess() {
    this.isshowMore = false;
    this.Uarray = this.Upart;

  }
  goBackResult() {
    this.isClickEvent = true;
    this.isShow = true;
    this.isDetailShow = false;
  }
  goBackFav() {
    this.isClickEvent = true;
    this.isShowFav = true;
    this.isDetailShow = false;
  }

  goDetail() {
    this.showEventDetail(this.showIndex);
    this.isShow = false;
    this.isDetailShow = true;
  }

  //sort related
  sortCategoryKind = "Default";
  sortName = "";
  //sortKind = "Asceding";
  //isDefault: boolean = true;
  //FormControl({value: 'Asceding', disabled: true})
  sortcategory = new FormControl('Default');
  sortascend = new FormControl({value: 'Asceding', disabled: true});
  sortCategory() {
    let code = this.sortcategory.value;
    //console.log(code);
    if(code == "Default") {
      this.sortascend.disable();
      //this.isDefault = true;
      this.Uarray = [];
      this.sortCategoryKind = "Default";
      if(this.isshowMore){
        for(let i = 0; i < this.UoriginArray.length; i++) {
          this.Uarray.push(this.UoriginArray[i]);
        }
      }else{
        for(let i = 0; i < this.Upart.length; i++) {
          this.Uarray.push(this.Upart[i]);
        }
      }
    }
    else if(code == "Event") {
      this.sortascend.enable();
      //this.isDefault = false;
      //this.sortCategoryKind = "Event Name";
      this.sortName = 'Name';
      this.sorting();
    }
    else if(code == "Time") {
      //this.isDefault = false;
      //this.sortCategoryKind = "Time";
      this.sortName = 'time';
      this.sorting();
    }
    else if(code == "Artist") {
      //this.isDefault = false;
      //this.sortCategoryKind = "Artist";
      this.sortName = 'artist';
      this.sorting();
      
    }
    else if(code == "Type") {
      //this.isDefault = false;
      //this.sortCategoryKind = "Type";
      this.sortName = 'type';
      this.sorting();
    }
  }
  
  //isSort: boolean= false;
  sorting(){
    let code = this.sortascend.value;
    if(code == "Asceding"){
      //this.sortKind = 'Asceding';
      //console.log("ON");
      //console.log(this.sortName);
      //console.log(this.Uarray);
      var obj = this.Uarray.sort(this.highestRating(this.sortName));
      //console.log(obj);
    }
    else if(code == "Descending") { 
      //this.sortKind = 'Descending';
      //console.log(this.sortName);
      this.Uarray = this.Uarray.sort(this.lowestRating(this.sortName));
    }
  }
  highestRating(property){
    return function(obj1,obj2){
      var value1 = obj1.property;
      var value2 = obj2.property;
      return value2 - value1;
    }
  }
  lowestRating(property){
    return function(obj1,obj2){
      var value1 = obj1.property;
      var value2 = obj2.property;
      return value1 - value2; 
    }
  }


}
