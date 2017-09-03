import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiRoutesService } from '../api-routes.service';

@Injectable()
export class CreativeRoomAsyncs {

    constructor(
        private http: Http,
        private apiRoutesService: ApiRoutesService
    ) { }

    public postTextToSpeech(textObject: any): Observable<any | Error> {
        return this.http.post(this.apiRoutesService.getPaths().creativeRoom.postTextToSpeech(), textObject)
                        .map(res => res.text())
                        .retry(1)
                        .catch(err => Observable.throw(new Error(err)));
    }
}
