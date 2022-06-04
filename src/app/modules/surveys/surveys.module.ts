import { NgModule } from '@angular/core';

import { SurveysRoutingModule } from './surveys-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SurveyComponent } from './pages/survey/survey.component';
import { QuesitonComponent } from './pages/quesiton/quesiton.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { IncludesPipe } from './pipes/includes.pipe';
import { ReportComponent } from './pages/report/report.component';


@NgModule({
  declarations: [
    IndexComponent,
    SurveyComponent,
    QuesitonComponent,
    IncludesPipe,
    ReportComponent
  ],
  imports: [
    SurveysRoutingModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule
  ]
})
export class SurveysModule { }
