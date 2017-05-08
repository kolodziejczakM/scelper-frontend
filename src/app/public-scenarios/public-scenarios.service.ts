import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ApiRoutesService } from '../api-routes.service';

@Injectable()
export class PublicScenariosService {

    constructor(
        private http: Http,
        private apiRoutesService: ApiRoutesService
    ) { }

    public getPublicScenarios() {
        return this.http.get(this.apiRoutesService.getPaths().publicScenarios.getAll())
                 .map(res => res.json()); // .catch((err) => Observable.throw(err));
                  // `ERROR <GET> catched: ${err}`);
    }

    public postPublicScenario(scenario) {
        return this.http.post(this.apiRoutesService.getPaths().publicScenarios.post(), scenario)
                 .map(res => res.json()).catch((err) => `ERROR <POST> catched: ${err}`);
    }

    public deletePublicScenario(deleteCode: string) {
        return this.http.delete(this.apiRoutesService.getPaths().publicScenarios.delete(deleteCode))
                 .map(res => res.json()).catch((err) => `ERROR <DELETE> catched: ${err}`);
    }

}
