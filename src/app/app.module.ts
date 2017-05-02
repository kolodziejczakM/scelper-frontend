import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PublicScenariosComponent } from './public-scenarios/public-scenarios.component';
import { InterviewComponent } from './interview/interview.component';
import { ScenarioActivationComponent } from './scenario-activation/scenario-activation.component';
import { PromptComponent } from './prompt/prompt.component';
import { AlertComponent } from './alert/alert.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'interview', component: InterviewComponent },
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
        AlertComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        BootstrapModalModule
    ],
    entryComponents: [
        AlertComponent,
        PromptComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
