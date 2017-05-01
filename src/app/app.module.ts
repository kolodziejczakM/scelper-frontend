import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PublicScenariosComponent } from './public-scenarios/public-scenarios.component';
import { InterviewComponent } from './interview/interview.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'interview', component: InterviewComponent },
    { path: 'public-scenarios', component: PublicScenariosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PublicScenariosComponent,
    InterviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
