import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

import { AppStoreService } from './app-store.service';
import { ApiRoutesService } from './api-routes.service';
import { ModalsService } from './modals/modals.service';
import { PublicScenariosService } from './public-scenarios/public-scenarios.service';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PublicScenariosComponent } from './public-scenarios/public-scenarios.component';
import { InterviewComponent } from './interview/interview.component';
import { ScenarioActivationComponent } from './scenario-activation/scenario-activation.component';
import { PromptComponent } from './modals/prompt/prompt.component';
import { AlertComponent } from './modals/alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { GenericErrorComponent } from './generic-error/generic-error.component';
import { SimpleInterviewComponent } from './simple-interview/simple-interview.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'interview', component: InterviewComponent },
    { path: 'interview/simple', component: SimpleInterviewComponent },
    { path: 'public-scenarios', component: PublicScenariosComponent },
    { path: 'activation/:deleteCode', component: ScenarioActivationComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        PublicScenariosComponent,
        InterviewComponent,
        ScenarioActivationComponent,
        PromptComponent,
        AlertComponent,
        LoaderComponent,
        HeaderComponent,
        GenericErrorComponent,
        SimpleInterviewComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        BootstrapModalModule,
        Angular2FontAwesomeModule
    ],
    entryComponents: [
        AlertComponent,
        PromptComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        AppStoreService,
        ApiRoutesService,
        ModalsService,
        PublicScenariosService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
