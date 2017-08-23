import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiRoutesService } from '../api-routes.service';

import { PublicScenario, ResponseObject } from '../interfaces';

@Injectable()
export class PublicScenariosAsyncs {

    constructor(
        private http: Http,
        private apiRoutesService: ApiRoutesService
    ) { }

    public getPublicScenarios(): Observable<PublicScenario[] | Error> {
        return this.http.get(this.apiRoutesService.getPaths().publicScenarios.getAll())

                        .map((res: Response) => res.json() as PublicScenario[])
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

    public postPublicScenario(scenario: FormData): Observable<ResponseObject | Error> {
        return this.http.post(this.apiRoutesService.getPaths().publicScenarios.post(), scenario)

                        .map((res: Response) => res.json() as ResponseObject)
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

    public postPublicScenarioRequest(scenarioRequest: FormData): Observable<ResponseObject | Error> {
        return this.http.post(this.apiRoutesService.getPaths().publicScenarios.postRequests(), scenarioRequest)

                        .map((res: Response) => res.json() as ResponseObject)
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

    public patchPublicScenario(deleteCode: string): Observable<ResponseObject | Error> {
        return this.http.patch(this.apiRoutesService.getPaths().publicScenarios.patch(deleteCode), deleteCode)

                        .map((res: Response) => res.json() as ResponseObject)
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

    public deletePublicScenario(deleteCode: string): Observable<ResponseObject | Error> {
        return this.http.delete(this.apiRoutesService.getPaths().publicScenarios.delete(deleteCode))

                        .map((res: Response) => res.json() as ResponseObject)
                        .retry(1)
                        .catch((err) => Observable.throw(new Error(err)));
    }

}
