import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'app-scenario-activation',
    templateUrl: './scenario-activation.component.html'
})
export class ScenarioActivationComponent implements OnInit {

    paramName = 'deleteCode';
    deleteCode: string;
    url = `http://localhost:3000/activation/`;

    constructor(
        private http: Http,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.setDeleteCode();
        this.patchScenario();
    }

    setDeleteCode() {
        this.deleteCode = this.activatedRoute.snapshot.params[this.paramName];
    }

    patchScenario() {
        const url = this.url + this.deleteCode;

        this.http.patch(url, this.deleteCode).map(res => res.json()).subscribe(response => {
            console.log('Success:', response);
        },
        (err: Response) => {
            console.log('Failure:', err);
        });
    }

}
