import {Injectable, Inject} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ApiService {

videoArray:Array<any> = [];

constructor(private _http:Http) {

}

private extractData(res) {
let body = res.json();
return body || null;
}

private handleError(error:any) {
let errMsg = (error.message) ? error.message :
  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
console.error(errMsg);
return Observable.throw(errMsg);
}


private fetchToken(token = '') {

return new Observable(observer => {

  let apiUrl = 'https://www.googleapis.com/youtube/v3/';
  let part = 'playlistItems?part=snippet';
  let playlistId = '&playlistId=PLGLfVvz_LVvTn3cK5e6LjhgGiSeVlIRwt';
  let maxResults = '&maxResults=10';
  let nextPageToken = '&pageToken=' + token;
  let apiKey = '&key=AIzaSyCT8AzodXG5LlYRh_r4WxW2CpP_UrZNh4o';

  console.log(apiUrl + part + playlistId + maxResults + nextPageToken + apiKey);

  this._http.get(apiUrl + part + playlistId + maxResults + nextPageToken + apiKey)
    .map(this.extractData).subscribe(
    data => {
      this.videoArray.push(data.items);
      console.log(data.nextPageToken);
      if(data.nextPageToken !== undefined){
        this.fetchToken(data.nextPageToken).subscribe();
        observer.next(this.videoArray);
      } else {

      }
    });
})
}

public searchYouTube() {

this.fetchToken().subscribe(
  data => {
    console.log(data)
  }
)}}