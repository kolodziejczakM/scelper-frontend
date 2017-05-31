import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiRoutesService } from '../api-routes.service';
import { SimpleInterviewQuestion, ResponseObject } from '../interfaces';

@Injectable()
export class SimpleInterviewAsyncs {

    constructor(
        private http: Http,
        private apiRoutesService: ApiRoutesService
    ) { }

    public getQuestions(): Observable<SimpleInterviewQuestion[] | Error> {
        return this.http.get(this.apiRoutesService.getPaths().simpleInterview.getQuestions())

                        .map((res: Response) => res.json() as SimpleInterviewQuestion[])
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

    public postInterviewAnswers(answeredQuestions: SimpleInterviewQuestion[]): Observable<ResponseObject | Error> {
        return this.http.post(this.apiRoutesService.getPaths().simpleInterview.postAnswers(), answeredQuestions)

                        .map((res: Response) => res.json() as ResponseObject)
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

}
