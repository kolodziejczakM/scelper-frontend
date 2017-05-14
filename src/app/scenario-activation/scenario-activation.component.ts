import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'sce-scenario-activation',
    templateUrl: './scenario-activation.component.html'
})
export class ScenarioActivationComponent implements OnInit {

    paramName = 'deleteCode';
    deleteCode: string;
    url = `http://localhost:3000/activation/`;

    loading = true;

    loadingText = 'Twój kod jest przetwarzany. Prosimy o chwilę cierpliwości...';
    successText = 'Przekierowuję do aplikacji...';
    errorText = 'Wystąpił błąd w trakcie analizy kodu aktywacji. Spróbuj ponownie lub skontaktuj się z administracją.';

    visibleText = this.loadingText;

    constructor(
        private http: Http,
        private router: Router,
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
        this.loading = true;

        this.http.patch(url, this.deleteCode).map(res => res.json()).subscribe(response => {
            const that = this;
            this.visibleText = this.successText;

            setTimeout(function(){
                that.loading = false;
                that.router.navigate(['public-scenarios']);
            }, 1000);
        },
        (err: Response) => {
            console.warn('Failure:', err);
            this.loading = false;
            this.visibleText = this.errorText;
        });
    }

}
