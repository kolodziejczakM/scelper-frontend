import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';

import { AppStoreService } from './app-store/app-store.service';
import { AppStoreActions } from './app-store/app-store.actions';
import { AppStoreWatchers } from './app-store/app-store.watchers';

import { WindowService } from './shared/window.service';
import { AnalyticsService } from './shared/analytics.service';
import { ApiRoutesService } from './api-routes.service';
import { ModalsService } from './modals/modals.service';
import { PublicScenariosAsyncs } from './public-scenarios/public-scenarios.asyncs';
import { SimpleInterviewAsyncs } from './simple-interview/simple-interview.asyncs';

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
import { FilterInputSelectComponent } from './filter-input-select/filter-input-select.component';
import { NewScenarioFormComponent } from './public-scenarios/new-scenario-form/new-scenario-form.component';
import { InterviewerComponent } from './interviewer/interviewer.component';
import { SymbolsComponent } from './symbols/symbols.component';
import { FooterComponent } from './footer/footer.component';
import { InterviewerTutorialComponent } from './interviewer-tutorial/interviewer-tutorial.component';
import { PublicScenariosTableComponent } from './public-scenarios/public-scenarios-table/public-scenarios-table.component';
import { FeedbackTabComponent } from './feedback-tab/feedback-tab.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorAvatarComponent } from './authors/author-avatar/author-avatar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'authors', component: AuthorsComponent },
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
        PublicScenariosTableComponent,
        NewScenarioFormComponent,
        FilterInputSelectComponent,
        InterviewComponent,
        SimpleInterviewComponent,
        InterviewerComponent,
        SymbolsComponent,
        InterviewerTutorialComponent,
        ScenarioActivationComponent,
        PromptComponent,
        AlertComponent,
        LoaderComponent,
        HeaderComponent,
        FooterComponent,
        GenericErrorComponent,
        FeedbackTabComponent,
        AuthorsComponent,
        AuthorAvatarComponent,
        BreadcrumbsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
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
        WindowService,
        AnalyticsService,
        AppStoreService,
        AppStoreActions,
        AppStoreWatchers,
        ApiRoutesService,
        ModalsService,
        PublicScenariosAsyncs,
        SimpleInterviewAsyncs
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
