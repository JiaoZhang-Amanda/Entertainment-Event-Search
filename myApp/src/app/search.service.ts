import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { FormContent, EventInfo } from './form-content';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class SearchService {
 
  private domain = 'http://jiaozhangHW8.us-east-2.elasticbeanstalk.com/api';
  //get the JSON
  private messageJson = new Subject<EventInfo[]>();
  JsonObserve = this.messageJson.asObservable();
  setJson(message: EventInfo[]) {
    this.messageJson.next(message);
  }
  private _isClear = new Subject();
  isClear = this._isClear.asObservable();

  private _wrong = new Subject();
  Wrong = this._wrong.asObservable();
  setWrong(message: boolean) {
    this._wrong.next(message);
  }

  private _empty = new Subject();
  Empty = this._empty.asObservable();
  setEmpty(message: boolean) {
    this._empty.next(message);
  }

  constructor(private http: HttpClient) { }
  
  AutoComplete(keyword) {
    var auto_url = this.domain + '/auto';
    return this.http.get<any>(auto_url, {params:{keyword: keyword}});
  }
  getLatLng(Loc) {
    var getLoc_url = this.domain + '/location';
    return this.http.get<any>(getLoc_url, {params:{location: Loc}});
  }

  
  getResult(info) {
    let keyword = info.keyword;
    let category = info.category;
    let segmentId = '';
    if(category == 'Music') {segmentId = 'KZFzniwnSyZfZ7v7nJ'}
    else if(category == 'Sports') {segmentId = 'KZFzniwnSyZfZ7v7nE'}
    else if(category == 'Arts & Theatre') {segmentId = 'KZFzniwnSyZfZ7v7na'}
    else if(category == 'Film') {segmentId = 'KZFzniwnSyZfZ7v7nn'}
    else if(category == 'Miscellaneous') {segmentId = 'KZFzniwnSyZfZ7v7n1'}
    let unit = info.disUnite;
    if(unit == "Miles"){unit = "miles";}
    else{unit = "km";}
    let lat = info.lat;
    let lng = info.lng;
    let radius = info.distance;
    //getgeoHash to get geoPoint

    //use keyword, segmentId, radius=10, unit=miles, geoPoint=9q5cs to get url
    var url = this.domain + '/events';
    //console.log(url);
    return this.http.get<any>(url, {params:{keyword: keyword, segmentId: segmentId, radius: radius, unit: unit, lat: lat, lng: lng}});
  }
  getMusic(attName) {
    var url = this.domain + '/music';
    //console.log(url);
    return this.http.get<any>(url, {params: {attName: attName}});
  }
  getPhoto(name) {
    var url = this.domain + '/photo';
    return this.http.get<any>(url, {params: {searchKey: name}})
  }
  getUpcoming(id) {
    console.log("4"+id);
    var song_url = this.domain + '/upComing';
    return this.http.get<any>(song_url, {params: {ID: id}});
  }
  getUpcomingResult(venue) {
    var getIDurl = this.domain + '/getID';
    let id = "";
    let vanueChange = decodeURI(venue).replace(new RegExp(' ','g'),'+')
    console.log("1:" + vanueChange);
    return this.http.get<any>(getIDurl, {params: {venue: vanueChange}});
  }
  clear() {
    this._isClear.next(true);
    this.messageJson.next(undefined);
  }
  
}
