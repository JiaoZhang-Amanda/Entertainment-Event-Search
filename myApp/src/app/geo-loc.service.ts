import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "access-control-allow-methods": "GET"})
};

@Injectable({
  providedIn: 'root'
})
export class GeoLocService {

  constructor(private http: HttpClient) {}

  getGeolocation() {
    //console.log('the response will be sent by the next function ...');
    const url = "http://ip-api.com/json";
    return this.http.get(url);
  }
}
