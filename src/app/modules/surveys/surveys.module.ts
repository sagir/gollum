import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SurveyComponent } from './pages/survey/survey.component';
import { QuesitonComponent } from './pages/quesiton/quesiton.component';


@NgModule({
  declarations: [
    IndexComponent,
    SurveyComponent,
    QuesitonComponent
  ],
  imports: [
    SurveysRoutingModule,
    SharedModule
  ]
})
export class SurveysModule { }
