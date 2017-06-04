import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiRoutesService } from '../api-routes.service';
import { SimpleInterviewQuestion, PDFblob, ScelperSymbol } from '../interfaces';

@Injectable()
export class SimpleInterviewAsyncs {

    constructor(
        private http: Http,
        private apiRoutesService: ApiRoutesService
    ) { }

    private attachBlobHeader() {
        return { responseType: ResponseContentType.Blob };
    }

    public getQuestions(): Observable<SimpleInterviewQuestion[] | Error> {
        return this.http.get(this.apiRoutesService.getPaths().simpleInterview.getQuestions())

                        .map((res: Response) => res.json() as SimpleInterviewQuestion[])
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

    public getRandomSymbols(): Observable<ScelperSymbol[] | Error> {
        return this.http.get(this.apiRoutesService.getPaths().simpleInterview.getRandomSymbols())

                        .map((res: Response) => res.json() as ScelperSymbol[])
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

    public postInterviewAnswers(answeredQuestions: SimpleInterviewQuestion[]): Observable<PDFblob | Error> {

        return this.http.post(
            this.apiRoutesService.getPaths().simpleInterview.postAnswers(), answeredQuestions, this.attachBlobHeader())

                        .map((res) => res.blob())
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

}
